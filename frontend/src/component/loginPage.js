import React, { useState, useEffect } from 'react';
import styles from './styles/style.module.css';
import auth from '../auth';
import OtpVerify from './otpVerify'
import { useHistory } from "react-router";

import axios from 'axios';
function LoginPage() {
	let history = useHistory()
	const [error, setError] = useState({
		error: '',
		success: ''
	});
	const [isOtpSend, setisOtpSend] = useState(false)
	const [isPassword, setisPassword] = useState(false)
	const [regexp, setregexp] = useState(/^[0-9\+\ ]+$/)
	const [state, setState] = useState({
		username: '',
		hash: '',
		otp: '',
		password: ''
	});
	const setUserName = (e) => {
		console.log("e", e.target.value)
		setState({ username: e.target.value });
	};
	const setPassword = (e) => {
		console.log("e", e.target.value)
		setState({ password: e.target.value });
	};
	const setOtp = (e) => {
		console.log("e", e.target.value)
		setState({ otp: e.target.value });
	};
	const hashHandleChange = (hash) => {
		 setState({hash : hash})
	}

	const sendOtp = (e) => {
		if (state.username === '' || regexp.test(state.username)) {
			console.log("number")
		} else {
			console.log("String")
		}
		axios
			.post('http://localhost:4000/api/v1/userData/sendOTP', {
				username: `${state.username}`
			})
			.then(function (res) {
				console.log("res", res);
				setisOtpSend(true)
				const hash = res.data.hash;
				hashHandleChange(hash);
			});
	};
	const confirmOtp = () => {
		axios
			.post('http://localhost:4000/api/v1/userData/verifyOTP', {
				username: `${state.username}`,
				hash: `${state.hash}`,
				otp: `${state.otp}`,
				withCredentials: true
			})
			.then(function (res) {
				console.log(res.data);
				//window.location.reload();
			})
			.catch(function (error) {
				console.log(error.response.data);
				setError({ ...error, error: error.response.data.msg });
			});
	};
	const login = () => {
		axios
			.post('http://localhost:4000/api/v1/userData/loginuser', {
				username: `${state.username}`,
				password: `${state.password}`
			})
			.then(function (res) {
				console.log(res.data);
				//window.location.reload();
			})
			.catch(function (error) {
				console.log(error.response.data);
				setError({ ...error, error: error.response.data.msg });
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
							value={state.username}
							onChange={setUserName}
							placeholder="Enter the username"
							className={styles.input}
						/>
						{isPassword?		<input
							type="tel"
							value={state.password}
							onChange={setPassword}
							placeholder="Enter the username"
							className={styles.input}
						/>:''}
						{
							isOtpSend ? <input
								type="tel"
								value={state.otp}
								onChange={setOtp}
								placeholder="Enter the 6 digits OTP"
								className={styles.input}
							/> : ''
						}
					</div>
					{isOtpSend ? <button onClick={confirmOtp} className={styles.submit}>
						Confirm OTP
					</button> :
						<button onClick={sendOtp} className={styles.submit}>
							Send OTP
					</button>}
					{isPassword?	<button onClick={login} className={styles.submit}>
							Login
					</button>:''}

				</div>
			</div>
		</div>
	);
}

export default LoginPage;
