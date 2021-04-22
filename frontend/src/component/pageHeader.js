import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Layout, Button } from 'antd';
import styles from './styles/style.module.css';
import styles1 from "./styles/style.header.css";
import { UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import axios from 'axios';
import Title from 'antd/lib/typography/Title';

const { Header, Content } = Layout;


function PageHeader() {
	const [userData, setuserData] = useState('')
	let history = useHistory()
	const logoutHandelChnage = () =>{
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
			
				<Header >
					{/* <Title level={2}>Glory Autotech</Title> */}
					<div style={{display:'flex', height:'100vh'}}>
						<label style={{color:'#ffffff', marginRight:400	,fontSize:20,alignSelf:'center'}} >Glory Autotech</label>
					</div>
					<label style={{color:'#ffffff',fontWeight:30,fontSize:20,marginRight:10}}>{userData.userFirstName +' '+ userData.userLastName}</label>
				<UserOutlined className="user_icon"/>
				<Button onClick={logoutHandelChnage} type='default' style={{borderRadius:10}}>Logout</Button>
				</Header>
				<Content style={{ padding: '0 50px' }}>
				</Content>
			
		</div>
	);

}

export default PageHeader
