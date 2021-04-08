import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import loginPage from './component/loginPage';
import { Layout, Menu } from 'antd';
import technologyList from './component/technologyList';
import home from "./component/home";
import signUp from "./component/signUp";
import technologyLevel from "./component/technologyLevel";
import taskList from "./component/taskList";
import givenTask from "./component/assignTask";
import PageHeader from './component/pageHeader';
import LeftSideBar from "./component/leftSideBar";
import addTechnology from "./component/addTechnology";
import addTask from "./component/addTask";
import { HomeOutlined, PartitionOutlined, PlusCircleOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;

function App() {
	const [collapsed, setcollapsed] = useState(false)


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
			</Header>:<div></div>}

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
			</Menu>
		</Sider>:''}
			<Content style={{ padding:10, background: '#fff' }}>
			<Route path="/" exact component={loginPage} />
		 		<Route path="/signup" exact component={signUp} />
				<Route path="/home" exact component={home} />
		 		<Route path="/technologylist" exact component={technologyList} />
		 		<Route path="/technologylevel" exact component={technologyLevel} />
		 		<Route path="/tasklist" exact component={taskList} />
		 		<Route path="/giventask" exact component={givenTask} />
		 		<Route path="/leftsidebar" exact component={LeftSideBar} />
				<Route path="/addtechnology" exact component={addTechnology} />
				<Route path="/addtask" exact component={addTask} />
			</Content>

		</Layout>

	</Layout>
</Router>
	);
}

export default App;
