import React, { useState, useEffect } from 'react';
import styles from './styles/style.module.css';
import { Radio, Input, Form, Spin, Button,Image } from 'antd';
import { useHistory } from "react-router";
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import img from "../img/HR.jpg";
import Title from 'antd/lib/typography/Title';

function LoginPage(props) {
	let history = useHistory()
	const [error, setError] = useState({
		error: '',
		success: ''
	});
	const [isOtpSend, setisOtpSend] = useState(false)
	const [isConfirmOtp, setisConfirmOtp] = useState(false)
	const [isPassword, setisPassword] = useState(false)
	const [userName, setuserName] = useState('')
	const [hash, sethash] = useState('')
	const [otp, setotp] = useState('')
	const [password, setpassword] = useState('')
	const [value, setValue] = useState();
	const [isLoading, setisLoading] = useState(false)
	const [form] = useForm();


	const onChange = e => {
		console.log('radio checked', e.target.value);
		if (e.target.value == 'password') {
			setisPassword(true)
			setisOtpSend(false)
			setisConfirmOtp(false)
		} else {
			setisPassword(false)
			setisOtpSend(true)
		}
		setValue(e.target.value);
	};

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			console.log("already login")
			history.push("/round")
		}
	}, [])

	const setUserName = (e) => {
		console.log("e", e.target.value)
		setuserName(e.target.value);
	};
	const setPassword = (e) => {
		console.log("e", e.target.value)
		setpassword(e.target.value);
	};
	const setOtp = (e) => {
		console.log("e", e.target.value)
		setotp(e.target.value);
	};
	const hashHandleChange = (hash) => {
		sethash(hash)
	}

	const sendOtp = (e) => {
		setisLoading(true)
		if(userName.length<=0){
			//setError({ error: "Plase Enter UserName" })
			setisLoading(false)
		}else{
		axios
			.post('http://localhost:4000/api/v1/userData/sendOTP', {
				username: `${userName}`
			})
			.then(function (res) {
				setisLoading(false)
				console.log("res", res);
				setisConfirmOtp(true)
				const hash = res.data.hash;
				hashHandleChange(hash);
			});
		}
	};
	const confirmOtp = () => {
		setisLoading(true)
		if(userName.length<=0 || otp.length<=0){
			setisLoading(false)
		}else{
		console.log("state.username", userName)
		console.log("state.hash", hash)
		console.log("state.otp", otp)
		axios
			.post('http://localhost:4000/api/v1/userData/verifyOTP', {
				username: `${userName}`,
				hash: `${hash}`,
				otp: `${otp}`,
				withCredentials: true
			})
			.then(function (res) {
				setisLoading(false)
				console.log("verify", res);
				history.push({
					pathname: '/home',
					state: {
						userName: userName
					}
				})
			})
			.catch(function (error) {
				console.log(error.response.data);
				setError({ ...error, error: error.response.data.msg });
			});
		}
	};
	const login = () => {
		setisLoading(true)
		if(userName.length<=0 || password.length<=0){
			setisLoading(false)
		}else{
		console.log("username", `${userName}`)
		console.log("password", `${password}`)
		axios
			.post('http://localhost:4000/api/v1/userData/loginuser', {
				username: `${userName}`,
				password: `${password}`
			})
			.then(function (res) {
				if (!res.data.data) {
					console.log("null", res.data.message)
					setError({ error: res.data.message })
				}
				setisLoading(false)
				console.log("accessToken", res.data.data.accessToken.accessToken);
				localStorage.setItem("accessToken", res.data.data.accessToken.accessToken)
				history.push({
					pathname: '/home',
					state: {
						userName: userName
					}
				})

			})
			.catch(function (error) {
				console.log(error);
			});
		}
	};

	const formItemLayout = {
		labelCol: {
			xs: {
				span: 20,
			},
			sm: {
				span: 6,
			},
		},
		wrapperCol: {
			xs: {
				span: 24,
			},
			sm: {
				span: 20,
			},
		},
	};

	return (<div>
		{isLoading?<Spin tip="Loading..."></Spin>:
		<div className={styles}>
			<div className={styles.background}>
				<div className={styles.container}>
					
					<div className={styles.heading}>Glory Autotech</div>
					<div className={styles.error}>{error.error}</div>
					<div className={styles.success}>{error.success}</div>
					<Image style={{marginLeft:10}} width={300} src={require('../img/HR.jpg')} preview={false}></Image>
					<Form {...formItemLayout} form={form} name="login" style={{float:'right', width: 400 }} scrollToFirstError>
						<Form.Item
						
							name='userName'
							style={{marginLeft:80, marginTop:40,marginBottom:8}}
							rules={[
								{
									required: true,
									message: 'Please enter Email/Phone'
								}
							]}>
							<Input
								style={{width:270, borderRadius:5, }}
								value={userName}
								onChange={setUserName}
								placeholder="Email or Phone number"
								className={styles.input}
							/>
						</Form.Item>
						<Form.Item
							style={{flex:1,justifyContent:"center"}}
							name='option'
							rules={[
								{
									required: true,
									message: 'Please Select one'
								}
							]}>
							<Radio.Group style={{marginLeft:90}} onChange={onChange} value={value}>
								<Radio value={'password'}>Password</Radio>
								<Radio value={"otp"}>OTP</Radio>
							</Radio.Group>
						</Form.Item>
						{isPassword ?
							<Form.Item
							
								name='password'
								style={{marginLeft:80,verticalAlign:'top',marginTop:-15}}
								rules={[
									{
										required: true,
										message: 'Please enter your password'
									}
								]}>
								<Input.Password
									style={{width:270, borderRadius:5, height:40}}
									value={password}
									onChange={setPassword}
									placeholder="Password"
									
								/></Form.Item> : ''}
						{
							isConfirmOtp ?						
							<Form.Item
							
							name='otp'
							style={{marginLeft:80,verticalAlign:'top',marginTop:-15}}
							rules={[
								{
									required: true,
									message: 'Please enter your Otp'
								}
							]}>
								 <Input
								style={{width:270, borderRadius:5, height:40}}
								value={otp}
								onChange={setOtp}
								placeholder="Enter the 6 digits OTP"
								className={styles.input}
							/></Form.Item> : ''
						}

						{isOtpSend ? <Button type='primary' style={{marginLeft:81,borderRadius:5,width:270,marginRight:50,marginTop:-10,background:'#023047',borderColor:'#023047'}} onClick={sendOtp} className={styles.submit}>
							Send OTP
					</Button> : ''
						}
						{isConfirmOtp ? <Button type='primary' style={{width:270,borderRadius:5,marginRight:50,background:'#023047',borderColor:'#023047'}} onClick={confirmOtp} className={styles.submit}>
							Confirm OTP
					</Button> : ''}
						{isPassword ? <Button type='primary' style={{marginLeft:81,borderRadius:5,width:270,background:'#023047',borderColor:'#023047'}} onClick={login} >
							Login
					</Button> : ''}
					</Form>
				</div>
			</div>
		</div>}
		</div>
	);
}

export default LoginPage;
