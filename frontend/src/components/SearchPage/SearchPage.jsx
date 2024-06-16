import { useSelector ,useDispatch} from "react-redux";
import { companySelector } from "../../redux/companyReducer";
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInitialStateAsync,searchCompaniesAsync } from "../../redux/companyReducer";
import './searchPage.css'

//Component for Search page.
function SearchPage(){

    const [query,setQuery]=useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    //Getting searched companines from the store.
    const companies=useSelector(companySelector);

    //console.log(companies);
    useEffect(() => {
        //if token is empty redirect back to sign-in page.
        if (!token) {
            navigate('/sign-in');
        } else {

            //dispatching to get list of companies.
            dispatch(getInitialStateAsync());
        }
    }, [dispatch, navigate, token]);

    function handleSearch(e){
        setQuery(e.target.value)

        //dispatching to get list of companies while searching.
        dispatch(searchCompaniesAsync(query));
    };

    return (
        <div className="search-container">
            <h2>Search Page</h2>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search by company name or country"
            />
            <ul className="company-list">
                {companies.map((value, index) => (
                    <li key={index} className="company-item">
                        <Link to={`Details/${value._id}`} className="company-link">
                            <div>
                                <span className="company-name">{value.name}</span>
                            </div>
                            <div>
                                <span className="company-country">{value.country}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>        </div>
    );
}
export default SearchPage;