import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import loginPage from './loginPage';
import { Layout } from 'antd';
import technologyList from './technologyList';
import home from "./home";
import signUp from "./signUp";
import technologyLevel from "./technologyLevel";
import taskList from "./taskList";
import givenTask from "./assignTask";
import LeftSideBar from "./leftSideBar";
import addTechnology from "./addTechnology";
import addTask from "./addTask";
import assignTasklist from "./assignTasklist";
const {Content } = Layout;

function RouteJs() {

    useEffect(() => {
        console.log("route")
    })

	return (		
	<Router>
			<Content style={{background: '#fff' }}>
			<Route path="/" exact component={loginPage} /><div>
		 		<Route path="/signup" exact component={signUp} />
				<Route path="/home" exact component={home} />
		 		<Route path="/technologylist" exact component={technologyList} />
		 		<Route path="/technologylevel" exact component={technologyLevel} />
		 		<Route path="/tasklist" exact component={taskList} />
		 		<Route path="/giventask" exact component={givenTask} />
				<Route path="/addtechnology" exact component={addTechnology} />
				<Route path="/addtask" exact component={addTask} />
				<Route path="/assigntask" exact component={assignTasklist} />
				</div>
			</Content>
</Router>
	);
}

export default RouteJs;
