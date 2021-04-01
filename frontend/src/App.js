import React from 'react';
import auth from './auth';
import RoutePage from './component/route';
import { useHistory } from "react-router";
import { BrowserRouter as Router,Route,Link ,Switch} from "react-router-dom";
import LoginPage from './component/loginPage';
import OtpVerify from './component/otpVerify'
import Home from './component/home';


function App() {
	let history=useHistory()
	return (
		<div className="App">
		<Router>
		  <Switch>	   
			<Route exact path='/' component={LoginPage}/>
			{/* <Route exact path='/otpVerify' component={OtpVerify}/> */}
			<Route exact path='/Home' component={Home}/>
		  </Switch>
		</Router>
		</div>
	  );
}

export default App;
