import React from 'react';
//import auth from './auth';
//import RoutePage from './component/route';
//import { useHistory } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import loginPage from './component/loginPage';
//import OtpVerify from './component/otpVerify'
import technologyList from './component/technologyList';
import home from "./component/home";
import signUp from "./component/signUp";


function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={loginPage} />
				<Route path="/technologylist" exact component={technologyList} />
				<Route path="/home" exact component={home} />
				<Route path="/signup" exact component={signUp} />
			</Switch>
		</Router>
	);
}

export default App;
