import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles/home.module.css';

axios.defaults.withCredentials = true;
function Home() {
	const [ state, setState ] = useState({
		value: 'Private Protected Route - Home'
	});

	return (
		<div className={styles}>
			<div className={styles.top}>
				<p>Glory Autotech</p>
			</div>
			<div className={styles.bottom}>
				<button className={styles.logout}>
					Log out
				</button>

				<div className={styles.card} />
				<div className={styles.words}> {state.value}</div>
			</div>
		</div>
	);
}

export default Home;
