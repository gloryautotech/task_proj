import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Breadcrumb, Card, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import styles from './styles/style.module.css';
import styles1 from "./styles/style.header.css";
import { UserOutlined } from "@ant-design/icons";
import LeftSideBar from "./leftSideBar";
import { useHistory } from "react-router";
import axios from 'axios';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;


function PageHeader() {
	const [islogout, setislogout] = useState(false)
	const [userData, setuserData] = useState('')
	let history = useHistory()
	const logoutHandelChnage = () =>{
		setislogout(true)
		localStorage.removeItem("accessToken")
		history.push('/')
	}

useEffect(() => {
	axios({
		'method': 'get',
		'url': (`http://localhost:4000/api/v1/userdata/viewuserlist/${sessionStorage.getItem("user_id")}`)
	}).then(response => {
		console.log('Header Data ', response.data.data)
		setuserData(response.data.data)
	}).catch(err => {
		console.log("error", err)
	})
}, [])
	return (
		<div>
			
				<Header>
					<label style={{color:'#ffffff',fontWeight:30,fontSize:20,marginRight:10}}>{userData.userFirstName +' '+ userData.userLastName}</label>
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
