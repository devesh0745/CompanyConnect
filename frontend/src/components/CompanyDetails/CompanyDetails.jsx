import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector} from "react-redux";
import { useEffect } from "react";
import { getCompanyDetails, companyDetailsSelector,contactUsAsync } from "../../redux/companyReducer";
//import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './companyDetails.css'

//Component to get company details
function CompanyDetails(){
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const dispatch=useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    //Getting company details from the store.
    const companyDetails=useSelector(companyDetailsSelector);
    const {id}=useParams();
    
    useEffect(() => {

        //If token is empty return sign-in page.
        if (!token) {
          navigate('/sign-in');
        } else {

           //dispatch to call API to get company details.
          dispatch(getCompanyDetails(id));
        }
      }, [dispatch, navigate, id, token]);

    function handleInquirySubmit(event){
        event.preventDefault();
        dispatch(contactUsAsync({email,message}))  
    }

    return(
    <div className="company-page-container">
        <div className="company-details-container">
        <h3>Company Details</h3>
        {companyDetails.map((value, index) => (
            <div key={index} className="company-details">
                <div>
                    <span className="detail-label">Name:</span>
                    <span>{value.name}</span>
                </div>
                <div>
                    <span className="detail-label">Country:</span>
                    <span>{value.country}</span>
                </div>
                <div>
                    <span className="detail-label">Website:</span>
                    <span><a id="company-website" href={value.website}>{value.website}</a></span>
                </div>
                <div>
                    <span className="detail-label">Description:</span>
                    <span>{value.description}</span>
                </div>
                <div>
                    <span className="detail-label">Industry:</span>
                    <span>{value.industry}</span>
                </div>
            </div>
        ))}
    </div>
    <div className="contact-us-container">
        <h3>Contact Us</h3>
        <form id="contact-form" onSubmit={handleInquirySubmit}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Message:</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
            <button id="send-inquiry" type="submit">Send Inquiry</button>
        </form>
    </div>
</div>
       
    )
};
export default CompanyDetails;