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
                    sessionStorage.setItem("user_id",response.data.data[0]._id)
                    if(response.data.data[0].userType == 'user'){
                        axios({
                            'method': 'get',
                            'url': `http://localhost:4000/api/v1/assigntask/viewbyid/${response.data.data[0].password}`,
                            'headers': {
                                'token':localStorage.getItem('accessToken')
                            },
                        })
                            .then(function (res) {
                                if(res.data.data.length>0){
                                    sessionStorage.setItem("assign_id",res.data.data[0]._id)
                                    history.push('/giventask')
                                }
                                else{
                                    axios({
                                        'method': 'get',
                                        'url': `http://localhost:4000/api/v1/assignquestionbank/viewassignuserbyid/${response.data.data[0].password}`,
                                        'headers': {
                                            'token':localStorage.getItem('accessToken')
                                        },
                                    })
                                        .then(function (res) {
                                            console.log("res of questionpaper home",res)
                                            if(res.data.data.length>0){
                                                sessionStorage.setItem("Question_id",response.data.data[0].password)
                                                history.push('/questionpaper')
                                            }
                                        })
                                }
                            })
                        
                       
                    }else{
                
                history.push('/round') }
            }
                
            }
        })

    },[])

    return(
        <div>
            
        </div>
    )

}

export default Home
