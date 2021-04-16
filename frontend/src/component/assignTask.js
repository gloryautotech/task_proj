import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import {Card, Button, Input, Form } from 'antd';
import axios from 'axios';
import styles from './styles/style.module.css';
import { useForm } from 'antd/lib/form/Form';

function GivenTask(props) {

    const [isData, setisData] = useState(false)
    const [taskId, settaskId] = useState('')
    const [email, setemail] = useState('')
    const [taskDetalis, settaskDetalis] = useState('')
    const [gitLink, setgitLink] = useState('')
    const [isStart, setisStart] = useState(false)
    const [currentUserTaskId, setcurrentUserTaskId] = useState('')
    const [adminEmail, setadminEmail] = useState('')
    const [form] = useForm();

    useEffect(() => {
        console.log("assifn task user id", sessionStorage.getItem("user_id"))
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
        console.log("adminId", id)
        await axios({
            'method': 'get',
            'url': (`http://localhost:4000/api/v1/userdata/viewuserlist/${id}`)
        }).then(response => {
            console.log('response viewuserlist ', response.data.data)
            setadminEmail(response.data.data.email)
            openSendEmail(response.data.data.email, 'Open task', email + ' open there task at ')
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
        console.log("editassigntask", id)
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
        let nowDate = new Date()
        console.log(nowDate)
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/email',
            'data': { emailid: email, subject: subject, text: text + nowDate }
        })
    }
    const onSubmitteDetalis = () => {
        viewbyemailandid()
        console.log("taskId", taskId)
    }

    const startTask = () => {
        console.log("admid id on start",currentUserTaskId )
        axios({
            'method': 'post',
            'url': `http://localhost:4000/api/v1/assigntask/editassigntask/${currentUserTaskId}`,
            'data': { assignTaskStatus: 'Start' },
        }).then(response => {
            console.log('response.data', response.data.data)
            setisStart(true)
            openSendEmail(adminEmail, 'Start task', 'user start there task at ')
        }).catch(err => {
            console.log("error", err)
        })


    }
    const sumbitTask = () => {
        console.log("admid id on submit", adminEmail)
        axios({
            'method': 'post',
            'url': `http://localhost:4000/api/v1/assigntask/editassigntask/${currentUserTaskId}`,
            'data': { assignTaskStatus: 'End' },
        }).then(response => {
            setisStart(false)
            console.log('response.data', response.data.data)
            openSendEmail(adminEmail, 'Complete task', 'user submit there task at ' + gitLink + 'on ')
        }).catch(err => {
            console.log("error", err)
        })
    }

    const stopTask = () => {
        setisStart(false)
        console.log("admid id on submit", adminEmail)
        axios({
            'method': 'post',
            'url': `http://localhost:4000/api/v1/assigntask/editassigntask/${currentUserTaskId}`,
            'data': { assignTaskStatus: 'End' },
        }).then(response => {
            setisStart(false)
            console.log('response.data', response.data.data)
            openSendEmail(adminEmail, 'Stop task', 'user stop there task at ')
        }).catch(err => {
            console.log("error", err)
        })
    }

    const formItemLayout ={
        labelCol:{
            xs: {
                span: 20,
            },
            sm: {
                span: 6,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 20,
            },
        },
    };

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
                        <div className={styles.container} style={{height:250}}>
                            <div className={styles.heading}>Glory Autotech</div>
                            <Form {...formItemLayout} form={form} name="giventask" onFinish={onSubmitteDetalis}scrollToFirstError>
                                <Form.Item
                                    label='Unique Id'
                                    name='uniqueid'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your Unique Id'
                                        }
                                    ]}>
                                    <Input
                                        style={{width:250, borderRadius:10, borderWidth:2,borderColor:"#191919",height:40}}
                                        value={taskId}
                                        onChange={(e) => { settaskId(e.target.value) }}
                                        placeholder="Enter Your Unique Id"
                                        className={styles.input}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Email'
                                    name='email'
                                    rules={[
                                        {
                                            type: "email",
                                            message: 'Please Enter a Valid Email'
                                        },
                                        {
                                            required: true,
                                            message: 'Please enter your Email'
                                        }
                                    ]}>
                                    <Input
                                        style={{width:250, borderRadius:10, borderWidth:2,borderColor:"#191919",height:40}}
                                        value={email}
                                        onChange={(e) => { setemail(e.target.value) }}
                                        placeholder="Enter the Email"
                                    /></Form.Item>
                                <Form.Item>
                                    <button type='primary' htmlType="submit" className={styles.submit} style={{marginTop:-5,marginRight:60}}>
                                        Submit
                </button></Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>}
        </div>
    )

}

export default GivenTask
