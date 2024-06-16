import './App.css';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import SearchPage from './components/SearchPage/SearchPage';
import CompanyDetails from './components/CompanyDetails/CompanyDetails';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import {store}  from "./redux/store";

function App() {

  return (
    //Using react-router-dom for routing.
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/'
            element={
              <Fragment>
                <Navbar />
                <LandingPage />
              </Fragment>
            }>
          </Route>
          <Route path='Search'
            element={
              <Fragment>
                <Navbar/>
                <SearchPage />
              </Fragment>
            }>
          </Route>
          <Route path='/Search/Details/:id'
            element={
              <Fragment>
                <Navbar />
                <CompanyDetails />
              </Fragment>
            }>
          </Route>
          <Route path='/sign-up'
            element={
              <Fragment>
                <Navbar />
                <SignUp />
              </Fragment>
            }>
          </Route>
          <Route path='/sign-in'
            element={
              <Fragment>
                <Navbar />
                <SignIn />
              </Fragment>
            }>
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
     </div>
  );
}

export default App;
