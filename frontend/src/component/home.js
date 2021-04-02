import React, { useEffect, useState } from 'react';
import technologyList from "./technologyList";
import signUp from "./signUp";
import axios from 'axios';

import { useHistory } from "react-router";

function Home(props){
    
	let history = useHistory()
    //const[isUserNew,setisUserNew]=useState(false)

    useEffect(()=>{
        let userName = props.location.state.userName
        console.log("username_123",userName)
        axios.post('http://localhost:4000/api/v1/userData/fetchuserlist',{
            username: userName
        })
        .then(response=>{
            console.log("home",response.data.data)
            if(!response.data.data){
                history.push('/signup')
            }else{
                history.push('/technologylist')
            }
        })

    },[])

    return(
        <div>
        </div>
    )

}

export default Home
