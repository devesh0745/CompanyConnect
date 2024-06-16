import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";

import axios from 'axios';

const initialState={
    companyList:[],
    companyDetails:[]
};
//CAT to get list of companines
export const getInitialStateAsync=createAsyncThunk(
    'company/getInitialState',
    (arg,thunkAPI)=>{
        axios.get("http://localhost:8000/api/company/getAllCompanies")
        .then((res)=>{
            thunkAPI.dispatch(companyAction.setInitialState(res.data))
        })
    }
)
//CAT to add Excel file
export const addExcelAsync=createAsyncThunk(
    'company/addExcel',
    async (payload)=>{
        try{
            const token=localStorage.getItem('token')
           // console.log('PAYLOAD:',payload);
            const response=await fetch('http://localhost:8000/api/company/upload-excel',{
                method:'post',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  },
                body:payload
            });
            return response.json;
        }catch(error){
            console.log('Error in Adding Excel');
        }
    }
)
//CAT to get company details.
export const getCompanyDetails=createAsyncThunk(
    'company/getDetails',
    async (payload)=>{
        try{
            const token=localStorage.getItem('token')
            
            //console.log('details*******************:',token);
            const response=await fetch(`http://localhost:8000/api/company/getDetails/${payload}`,{
                method:'get',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
            })
            return response.json();
        }catch(error){
            console.log('Error in getting company details',error);
        }
    }
)
//CAT for contact us.
export const contactUsAsync=createAsyncThunk(
    'company/contactUs',
    async (payload)=>{
        try{
            const response=await fetch('http://localhost:8000/api/company/contactUs',{
                method:'post',
                headers:{
                    "Content-Type":'application/json'
                },
                body:JSON.stringify(payload)
            })
            return response.json();
        }catch(error){
            console.log('Error in contacting:',error);
        }
    }
)
//CAT to search companies.
export const searchCompaniesAsync=createAsyncThunk(
    'company/searchCompanies',
    async (payload)=>{
        try{
           const token=localStorage.getItem('token')
           //console.log("token",token)
            const response=await fetch(`http://localhost:8000/api/company/searchCompanies/${payload}`,{
                method:'get',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
            })
         
      
            return response.json();
        }catch(error){
            console.log('Error in searching companies',error);
        }   
    }
)
//company slice for company reducer.
const companySlice=createSlice({
    name:'company',
    initialState:initialState,
    reducers:{
        setInitialState:(state,action)=>{
            state.companyList=[...action.payload.message]
        }
    },
    //extra reducer to handle response from API.
    extraReducers:(builder)=>{
        builder.addCase(addExcelAsync.fulfilled,(state,action)=>{
            state.companyList=[...state.companyList,action.payload];
        })
       .addCase(getCompanyDetails.fulfilled,(state,action)=>{
            state.companyDetails=[action.payload.message]
       })
        .addCase(searchCompaniesAsync.fulfilled,(state,action)=>{
            console.log("payload:",action.payload.message)
            state.companyList=[...action.payload.message]
        })
    }
})
export const companyReducer=companySlice.reducer;
export const companyAction=companySlice.actions;
export const companySelector=(state)=>state.companyReducer.companyList;
export const companyDetailsSelector=(state)=>state.companyReducer.companyDetails;

