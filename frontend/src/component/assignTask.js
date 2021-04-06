import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Breadcrumb, Card, Button, Input } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';

import styles from './styles/style.module.css';
import { useHistory } from "react-router";
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { TextArea } = Input;

function GivenTask(props) {

    let history = useHistory()
    const [isData, setisData] = useState(false)
    const [taskId, settaskId] = useState('')
    const [email, setemail] = useState('')
    const [taskDetalis, settaskDetalis] = useState('')
    const [gitLink, setgitLink] = useState('')
    const [isStart, setisStart] = useState(false)
    const [currentUserTaskId, setcurrentUserTaskId] = useState('')
    const [adminEmail, setadminEmail] = useState('')
    const [adminId, setadminId] = useState('')
    useEffect(() => {

        console.log("assifn task user id", window.name)

    }, [])

    const viewbyemailandid = async () => {
        console.log("viewbyemailandid")
        await axios({
            'method': 'post',
            'url': `http://localhost:4000/api/v1/assigntask/viewbyemailandid/`,
            'data': {
                emailIdOfReceiver: email,
                taskid: taskId
            }
        }).then(response => {
            console.log('response viewbyemailandid', response.data.data.userId)
           // setadminId(response.data.data.userId)
            viewbytaskId(response.data.data.userId)
        }).catch(err => {
            console.log("error", err)
        })
    }

    const viewbytaskId = async (id) => {
        console.log("viewbytaskId")
        await axios({
            'method': 'get',
            'url': (`http://localhost:4000/api/v1/tasklist/viewbytaskId/${taskId}`)
        }).then(response => {
            console.log('response viewbytaskId', response.data.data)
            settaskDetalis(response.data.data)
            viewuserlist(id)
            setisData(true)
        }).catch(err => {
            console.log("error", err)
        })
    }

    const viewuserlist = async (id) => {
        console.log("viewuserlist")
        console.log("adminId",id)
        await axios({
            'method': 'get',
            'url': (`http://localhost:4000/api/v1/userdata/viewuserlist/${id}`)
        }).then(response => {
            console.log('response viewuserlist ', response.data.data)
            setadminEmail(response.data.data.email)
            openSendEmail(response.data.data.email,'Open task', email+' open there task at ')
            viewbyuseridandtaskid(id)
        }).catch(err => {
            console.log("error", err)
        })
    }

    const viewbyuseridandtaskid = async (id) => {
        console.log("viewbyuseridandtaskid")
        await axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/assigntask/viewbyuseridandtaskid',
            'data': {
                userId: id,
                emailIdOfReceiver: email,
                assignTaskId: taskId
            }
        }).then(response => {
            console.log('response viewbyuseridandtaskid', response.data.data._id)
            setcurrentUserTaskId(response.data.data._id)
            editassigntask(response.data.data._id)
        }).catch(err => {
            console.log("error", err)
        })
    }

    const editassigntask = async (id) => {
        console.log("editassigntask",id)
        await axios({
            'method': 'post',
            'url': `http://localhost:4000/api/v1/assigntask/editassigntask/${id}`,
            'data': { assignTaskStatus: 'Open' },
        }).then(response => {
            console.log('response editassigntask', response.data)
            setisStart(true)
        }).catch(err => {
            console.log("error", err)
        })
    }

    const openSendEmail = (email, subject, text) => {
        let nowDate= new Date()
        console.log(nowDate)
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/email',
            'data': { emailid: email, subject: subject, text: text + nowDate}
        })
    }
    const onSubmitteDetalis = () => {
        viewbyemailandid()
        console.log("taskId", taskId)
    }

    const startTask = () => {
        console.log("admid id on start",adminEmail)
        axios({
            'method': 'post',
            'url': `http://localhost:4000/api/v1/assigntask/editassigntask/${setcurrentUserTaskId}`,
            'data': { assignTaskStatus: 'Start' },
        }).then(response => {
            console.log('response.data', response.data.data)
            setisStart(true)
            openSendEmail(adminEmail,'Start task','user start there task at ')
        }).catch(err => {
            console.log("error", err)
        })


    }
    const sumbitTask = () => {
        console.log("admid id on submit",adminEmail)
        axios({
            'method': 'post',
            'url': `http://localhost:4000/api/v1/assigntask/editassigntask/${setcurrentUserTaskId}`,
            'data': { assignTaskStatus: 'End' },
        }).then(response => {
            console.log('response.data', response.data.data)
            openSendEmail(adminEmail,'Complete task','user submit there task at ' + gitLink + 'on ')
        }).catch(err => {
            console.log("error", err)
        })
    }

    const stopTask = () => {
        setisStart(false)
        console.log("admid id on submit",adminEmail)
        axios({
            'method': 'post',
            'url': `http://localhost:4000/api/v1/assigntask/editassigntask/${setcurrentUserTaskId}`,
            'data': { assignTaskStatus: 'End' },
        }).then(response => {
            console.log('response.data', response.data.data)
            openSendEmail(adminEmail,'Stop task','user stop there task at ')
        }).catch(err => {
            console.log("error", err)
        })
    }

    return (
        <div>
            {isData ? (
                taskDetalis.map((taskDetalis) => (
                    <div style={{ blockSize: 250 }}>

                        <Card style={{ borderRadius: 20, backgroundColor: '#efefef', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }} >

                            <div style={{ float: 'left' }}>{taskDetalis.taskName}</div>

                            <div style={{ float: 'left' }}>
                                {

                                    <li>{taskDetalis.tasDescription}
                                    </li>}
                                {isStart ? <div><Input onChange={(e) => { setgitLink(e.target.value) }}></Input>
                                    <Button onClick={sumbitTask}>Submit</Button><Button onClick={stopTask}>Stop</Button>
                                </div> : <Button onClick={startTask}>Start</Button>}
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
