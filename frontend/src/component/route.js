import React,{useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import loginPage from './loginPage';
import { Layout, Menu } from 'antd';
import technologyList from './technologyList';
import home from "./home";
import signUp from "./signUp";
import technologyLevel from "./technologyLevel";
import taskList from "./taskList";
import givenTask from "./assignTask";
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import addTechnology from "./addTechnology";
import addTask from "./addTask";
import assignTasklist from "./assignTasklist";
import { HomeOutlined, PartitionOutlined, PlusCircleOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;

function RouteJs() {
	const [collapsed, setcollapsed] = useState(false)

    useEffect(() => {
        console.log("route")
    })

    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }
    const toggle = () => {
       setcollapsed(!collapsed)
    }
	
	return (		
	<Router>
	<Layout style={{ minHeight: '100vh' }}>
		{localStorage.getItem("accessToken")?	<Header>
						<PageHeader />
			</Header>:''}

			<Layout>
				{localStorage.getItem("accessToken")?
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={onCollapse}>
			<div className="logo" />
			<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
				<Menu.Item key="1">
					<HomeOutlined />
					<span>Home</span>
					<Link to="/technologylist" />
				</Menu.Item>
				<Menu.Item key="2">
				<PlusCircleOutlined />
					<span>Add Technology</span>
					<Link to="/addtechnology" />
				</Menu.Item>
				<Menu.Item key="3">
				<PlusCircleOutlined />
					<span>Add Task</span>
					<Link to="/addtask" />
				</Menu.Item>
                <Menu.Item key="4">
				<PlusCircleOutlined />
					<span>Assign Task</span>
					<Link to="/addtask" />
				</Menu.Item>
			</Menu>
		</Sider>:''}
			<Content style={{background: '#fff' }}>
			<Route path="/" exact component={loginPage} /><div style={{padding:10}}>
		 		<Route path="/signup" exact component={signUp} />
				<Route path="/home" exact component={home} />
		 		<Route path="/technologylist" exact component={technologyList} />
		 		<Route path="/technologylevel" exact component={technologyLevel} />
		 		<Route path="/tasklist" exact component={taskList} />
		 		<Route path="/giventask" exact component={givenTask} />
		 		<Route path="/leftsidebar" exact component={LeftSideBar} />
				<Route path="/addtechnology" exact component={addTechnology} />
				<Route path="/addtask" exact component={addTask} />
				<Route path="/assigntask" exact component={assignTasklist} />
				</div>
			</Content>

		</Layout>

	</Layout>
</Router>
	);
}

export default RouteJs;
