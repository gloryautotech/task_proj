import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Breadcrumb, Card, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import styles from './styles/style.module.css';
import styles1 from "./styles/style.header.css";
import { UserOutlined } from "@ant-design/icons";
import LeftSideBar from "./leftSideBar";
import { useHistory } from "react-router";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;


function PageHeader() {
	const [islogout, setislogout] = useState(false)
	let history = useHistory()
	const logoutHandelChnage = () =>{
		setislogout(true)
		localStorage.removeItem("accessToken")
		history.push('/')
	}
	return (
		<div>
			
				<Header>
				<UserOutlined className="user_icon"/>
				<Button onClick={logoutHandelChnage}>Logout</Button>
				</Header>
				{/* <LeftSideBar className="header_menu"/> */}
				<Content style={{ padding: '0 50px' }}>
				</Content>
			
		</div>
	);

}

export default PageHeader
