import React, { useState } from 'react';
import styles from './styles/style.module.css';
import axios from 'axios';

import { useHistory } from "react-router";

function OtpVerify() {
	let history=useHistory()
	axios.defaults.withCredentials = true;

	const [ error, setError ] = useState({
		error: '',
		success: ''
	});
	const [ state, setState ] = useState({
		otp:''
	});
	const handleChange = (e) => {
		console.log("e",e.target.value)
		 setState({ otp : e.target.value});
	};
	//const { value, handleChange } = props;
	const back = (e) => {
	history.pushState('/')
	};

	const confirmOtp = () => {
		axios
			.post('http://localhost:4000/api/v1/userData/verifyOTP', {
				//username: `${username}`,
				//hash: `${value.hash}`,
				otp: `${useState.otp}`,
				withCredentials: true
			})
			.then(function(res) {
				console.log(res.data);
				//window.location.reload();
			})
			.catch(function(error) {
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
					<div className={styles.success}>{error.success}</div>
					<div className={styles.input_text}>Enter One Time Password:</div>
					<div className={styles.input_container}>
						<input
							type="tel"
							//value={value.otp}
							onChange={handleChange}
							placeholder="Enter the 6 digits OTP"
							className={styles.input}
						/>
					</div>
					<button onClick={back} className={styles.back}>
						Back
					</button>
					<button onClick={confirmOtp} className={styles.submit}>
						Confirm OTP
					</button>
				</div>
			</div>
		</div>
	);
}

export default OtpVerify;
