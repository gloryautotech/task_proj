import React,{useState,useEffect} from 'react';
import styles from './styles/style.module.css';
import auth from '../auth';
import OtpVerify from './otpVerify'
import { useHistory } from "react-router";

import axios from 'axios';
function LoginPage() {
	let history=useHistory()
	const [isOtpSend, setisOtpSend] = useState(false)
	const [regexp, setregexp] = useState(/^[0-9\+\ ]+$/)
	const [ state, setState ] = useState({
		username:'',
		otp: ''
	});
	const handleChange = (e) => {
		console.log("e",e.target.value)
		 setState({ username : e.target.value});
	};
	// const hashHandleChange = (hash) => {
	// 	 setState({hash : hash})
	// }

	const sendOtp = (e) => {
		if (state.username === '' || regexp.test(state.username)) {
           console.log("number")
        }else{
			console.log("String")
		}
		axios
			.post('http://localhost:4000/api/v1/userData/sendOTP', {
				username: `${state.username}`
			})
			.then(function(res) {
				console.log("res",res);
				// const hash = res.data.hash;
				// hashHandleChange(hash);
				// history.push({ 
				// 	pathname: '/otpVerify',
				// 	state: state.username
				//    });
			});
	};
	const confirmOtp = () => {
		axios
			.post('http://localhost:4000/api/v1/userData/verifyOTP', {
				username: `${useState.username}`,
				//hash: `${value.hash}`,
				otp: `${useState.otp}`,
				withCredentials: true
			})
			.then(function(res) {
				console.log(res.data);
				//window.location.reload();
			})
			.catch(function(error) {
			//	console.log(error.response.data);
				//setError({ ...error, error: error.response.data.msg });
			});
	};
	return (
		<div className={styles}>
			<div className={styles.background}>
				<div className={styles.container}>
					<div className={styles.heading}>Glory Autotech</div>
					
					<div className={styles.input_text}>Phone number/ Email Id:</div>
					<div className={styles.input_container}>
						<input
							type="tel"
							value={state.username}
							onChange={handleChange}
							placeholder="Enter the username"
							className={styles.input}
						/>{
							isOtpSend ? 			<input
							type="tel"
							//value={value.otp}
							onChange={handleChange}
							placeholder="Enter the 6 digits OTP"
							className={styles.input}
						/>:''
						}
					</div>
					{isOtpSend?					<button onClick={confirmOtp} className={styles.submit}>
						Confirm OTP
					</button>:
						<button onClick={sendOtp} className={styles.submit}>
						Send OTP
					</button>}
				
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
