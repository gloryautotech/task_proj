import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Breadcrumb, Card, Button, Input} from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';

import styles from './styles/style.module.css';
import { useHistory } from "react-router";
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { TextArea } = Input;

function GivenTask(props){
    
	let history = useHistory()
    const [isData, setisData] = useState(false)
    const [taskId, settaskId] = useState('')
    const [email, setemail] = useState('')
    const [taskDetalis, settaskDetalis] = useState('')
    const [gitLink, setgitLink] = useState('')
    const [isStart, setisStart] = useState(false)
    const [currentUserTaskId, setcurrentUserTaskId] = useState('')
    const [adminEmail, setadminEmail] = useState('')
    useEffect(()=>{
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/userData/assigntaskviewByUserIdandTaskId',
            'data': {
                userId: window.name,
                emailIdOfReceiver: email,
                assignTaskId: taskId
            }
        }).then(response=>{
            console.log('response.data',response.data.data[0]._id)
            setcurrentUserTaskId(response.data.data[0]._id)
        }).catch(err=>{
            console.log("error",err)
        })
        axios({
            'method': 'get',
            'url': `http://localhost:4000/api/v1/userData/viewuserlist/${window.name}`
        }).then(response=>{
            console.log('response.data',response.data.data)
            setadminEmail(response.data.data.email)
        }).catch(err=>{
            console.log("error",err)
        })
    },[])

    const onSubmitteDetalis = () => {
        console.log("taskId",taskId)
                 axios({
            'method': 'get',
            'url': ('http://localhost:4000/api/v1/userData/viewbytaskId/'+taskId)
        }).then(response=>{
            console.log('response.data',response.data)
            settaskDetalis(response.data)
            setisData(true)
        }).catch(err=>{
            console.log("error",err)
        })
    }

    const startTask = () => {
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/userData/assigntaskeditassigntask/'+setcurrentUserTaskId,
            'data': {assignTaskStatus:'Start'} ,
        }).then(response=>{
            console.log('response.data',response.data.data)
            setisStart(true)
            axios({
                'method': 'post',
                'url': 'http://localhost:4000/api/v1/userData/email',
                'data': {emailid:adminEmail,subject:'user hase Start There task',text:'use start there task on  '+ Date.now()}
            })
        }).catch(err=>{
            console.log("error",err)
        })
        

    }
    const sumbitTask = () => {
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/userData/assigntaskeditassigntask/'+setcurrentUserTaskId,
            'data': {assignTaskStatus:'End'} ,
        }).then(response=>{
            console.log('response.data',response.data.data)
            axios({
                'method': 'post',
                'url': 'http://localhost:4000/api/v1/userData/email',
                'data': {emailid:adminEmail,subject:'user hase Complete There task',text:'use submit there task on this link '+ gitLink}
            })
        }).catch(err=>{
            console.log("error",err)
        })
    }
    return(
        <div>
            {isData?(
             taskDetalis.map((taskDetalis)=>(
                <div  style={{blockSize:250}}>
                
                <Card style={{borderRadius:20, backgroundColor:'#efefef',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'}} >
 
                   <div style={{float:'left'}}>{taskDetalis.taskName}</div>

                     <div style={{float:'left'}}>
                    {
                       
                       <li>{taskDetalis.tasDescription}
                        </li>}
                        {isStart?<div><Input onChange={(e) => { setgitLink(e.target.value) }}></Input>
                        <Button onClick={sumbitTask}>Submit</Button>
                        </div>:<Button onClick={startTask}>Start</Button>}
                    </div>
                    
                    </Card>
                </div>
            ))
            )
            :
        <div className={styles}>
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.heading}>Glory Autotech</div>
                    <div className={styles.input_text}>unique Id:</div>
                <div className={styles.input_container}>
                    <input
                        type="tel"
                        value={taskId}
                        onChange={(e) => { settaskId(e.target.value) }}
                        placeholder="Enter Your Unique Id"
                        className={styles.input}
                    />
                </div>
                <div className={styles.input_text}>Email Id:</div>
                <div className={styles.input_container}>
                <input
                        type="tel"
                        value={email}
                        onChange={(e) => { setemail(e.target.value) }}
                        placeholder="Enter the Email"
                        className={styles.input}
                    />
                    </div>
               <button onClick={onSubmitteDetalis} className={styles.submit}>
                   Submit
                </button>
            </div>
        </div>
    </div>}
    </div>
    )

}

export default GivenTask
