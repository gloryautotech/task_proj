import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import loginPage from './component/loginPage';
import technologyList from './component/technologyList';
import home from "./component/home";
import signUp from "./component/signUp";
import technologyLevel from "./component/technologyLevel";
import taskList from "./component/taskList";
import givenTask from "./component/assignTask";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={loginPage} />
				<Route path="/signup" exact component={signUp} />
				<Route path="/home" exact component={home} />
				<Route path="/technologylist" exact component={technologyList} />
				<Route path="/technologylevel" exact component={technologyLevel} />
				<Route path="/tasklist" exact component={taskList} />
				<Route path="/giventask" exact component={givenTask} />
			</Switch>
		</Router>
	);
}

export default App;
