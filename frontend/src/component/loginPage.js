import React, { useState, useEffect } from 'react';
import styles from './styles/style.module.css';
import { Radio } from 'antd';
import { useHistory } from "react-router";

import axios from 'axios';
function LoginPage(props) {
	let history = useHistory()
	const [error, setError] = useState({
		error: '',
		success: ''
	});
	const [isOtpSend, setisOtpSend] = useState(false)
	const [isConfirmOtp, setisConfirmOtp] = useState(false)
	const [isPassword, setisPassword] = useState(false)
	const [regexp, setregexp] = useState(/^[0-9\+\ ]+$/)
	const [userName, setuserName] = useState('')
	const [hash, sethash] = useState('')
	const [otp, setotp] = useState('')
	const [password, setpassword] = useState('')

	const [value, setValue] = useState();

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
			history.push("/technologylist")
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
		if (userName === '' || regexp.test(userName)) {
			console.log("number")
		} else {
			console.log("String")
		}
		axios
			.post('http://localhost:4000/api/v1/userData/sendOTP', {
				username: `${userName}`
			})
			.then(function (res) {
				console.log("res", res);
				setisConfirmOtp(true)
				const hash = res.data.hash;
				hashHandleChange(hash);
			});
	};
	const confirmOtp = () => {
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
	};
	const login = () => {
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
	};
	return (
		<div className={styles}>
			<div className={styles.background}>
				<div className={styles.container}>
					<div className={styles.heading}>Glory Autotech</div>
					<div className={styles.error}>{error.error}</div>
					<div className={styles.success}>{error.success}</div>{isOtpSend ?
						<div className={styles.input_text}>Enter One Time Password:</div> :
						<div className={styles.input_text}>Phone number/ Email Id:</div>}
					<div className={styles.input_container}>
						<input
							type="tel"
							value={userName}
							onChange={setUserName}
							placeholder="Enter the username"
							className={styles.input}
						/>
						<Radio.Group onChange={onChange} value={value}>
							<Radio value={'password'}>Password</Radio>
							<Radio value={"otp"}>OTP</Radio>
						</Radio.Group>
						{isPassword ? <input
							type="tel"
							value={password}
							onChange={setPassword}
							placeholder="Enter the Password"
							className={styles.input}
						/> : ''}
						{
							isConfirmOtp ? <input
								type="tel"
								value={otp}
								onChange={setOtp}
								placeholder="Enter the 6 digits OTP"
								className={styles.input}
							/> : ''
						}
					</div>
					{isOtpSend ? <button onClick={sendOtp} className={styles.submit}>
						Send OTP
					</button> : ''
					}
					{isConfirmOtp ? <button onClick={confirmOtp} className={styles.submit}>
						Confirm OTP
					</button> : ''}
					{isPassword ? <button onClick={login} className={styles.submit}>
						Login
					</button> : ''}

				</div>
			</div>
		</div>
	);
}

export default LoginPage;
