import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { addExcelAsync } from "../../redux/companyReducer";
import './landingPage.css'

//This is the home page.
function LandingPage(){
    const [file,setFile]=useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    //seting file in state.
    function handleFileChange(event){
        setFile(event.target.files[0])
    }

    function handleSubmit(event){
        event.preventDefault();

        if (!token) {
            navigate("/sign-in");
            return;
          }
        const formData=new FormData();
        formData.append('file',file);
        //dispatchig to call API to add excel sheet
        dispatch(addExcelAsync(formData));
    }
    return(
        <div className="companyconnect-container">
            <h1>Welcome to CompanyConnect</h1>
            <p>Connecting People, Empowering Futures.</p>
            <Link to='Search' style={{ color: 'inherit', textDecoration: 'none' }}>
                <button className="btn">Search</button>
            </Link>
            
            <h2>Upload Company Data</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                    type='file'
                    encType="multipart/form-data"
                    className="form-control"
                    onChange={handleFileChange}
                    />
                </div>
                <button type="submit" id="upload-btn" className="btn btn-primary">Upload</button>
            </form>
            
        </div>
        
    )
}
export default LandingPage;