import React, { useEffect } from 'react';
import axios from 'axios';

import { useHistory } from "react-router";

function Home(props){
    
	let history = useHistory()

    useEffect(()=>{
        let userName = props.location.state.userName
        
        console.log("username_123",userName)
        axios.get(`http://localhost:4000/api/v1/userdata/fetchuserlist/${userName}`)
        .then(response=>{
            console.log("home",response.data.data)
            if(!response.data.data){
                history.push('/signup')
            }else{
                
                if(response.data.data[0]._id){
                sessionStorage.setItem("user_id",response.data.data[0]._id) }
                history.push('/round')
            }
        })

    },[])

    return(
        <div>
            
        </div>
    )

}

export default Home
