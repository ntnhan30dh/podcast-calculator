import React, { Fragment, useState } from "react";
import Calculator from './components/calculator';
import Login from './components/login';
import Logout from './components/logout';
import Auth from './constants/auth';
import 'semantic-ui-css/semantic.min.css'
import './App.scss';


const auth = new Auth();
const App =() =>{
  let [isAuthenticated, setstate] = useState(auth.isAuthenticated());

  const setLoginState = () => {
    setstate(auth.isAuthenticated());
  };
 
  return (
    <Fragment className="App">
    {!isAuthenticated && <Login setLoginState={setLoginState} />}
    {isAuthenticated && (
      <div>
      <header className="App-header">
      </header>
      <Logout setLoginState={setLoginState}/>
      <h1>Podcast  calculator</h1>
      <Calculator/>
      </div>
      )}
    </Fragment>
  );
}

export default App;
