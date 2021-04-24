import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Button, Input, Form, Layout } from 'antd';
import axios from 'axios';
import styles from './styles/style.module.css';
import { useForm } from 'antd/lib/form/Form';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";

const { Header, Sider, Content } = Layout;

function GivenTask(props) {

    const [isData, setisData] = useState(false)
    const [taskId, settaskId] = useState('')
    const [email, setemail] = useState('')
    const [taskDetalis, settaskDetalis] = useState('')
    const [gitLink, setgitLink] = useState('')
    const [isStart, setisStart] = useState(false)
    const [currentUserTaskId, setcurrentUserTaskId] = useState('')
    const [adminEmail, setadminEmail] = useState('')
    const [taskEnd, setTaskEnd] = useState(false)
    const [allData, setallData] = useState([])
    const [collapsed, setcollapsed] = useState(false)
    const [form] = useForm();


    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }

    useEffect(() => {
        console.log("assifn task user id", sessionStorage.getItem("assign_id"))
        axios({
            'method': 'get',
            'url': `http://localhost:4000/api/v1/assigntask/viewbyid/${sessionStorage.getItem("assign_id")}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        }).then(response => {
            console.log('response viewbyemailandid', response.data.data)
            setallData(response.data.data[0])
            if (response.data.data[0].assignTaskStatus == 'End') {
                setTaskEnd(true)
            }
            axios({
                'method': 'get',
                'url': `http://localhost:4000/api/v1/tasklist/viewbytaskId/${response.data.data[0].assignTaskId}`,
                'headers': {
                    'token': localStorage.getItem('accessToken')
                }
            }).then(response => {
                console.log('response viewbytaskId', response)
                settaskDetalis(response.data.data)
                setisData(true)
            }).catch(err => {
                console.log("error", err)
            })

            axios({
                'method': 'get',
                'url': `http://localhost:4000/api/v1/userdata/viewuserlist/${response.data.data[0].userId}`,
                'headers': {
                    'token': localStorage.getItem('accessToken')
                }
            }).then(response => {
                console.log('response viewuserlist ', response.data.data)
                setadminEmail(response.data.data.email)
                openSendEmail(response.data.data.email, 'Open task', email + ' open there task at ')
            }).catch(err => {
                console.log("error", err)
            })

            axios({
                'method': 'post',
                'url': 'http://localhost:4000/api/v1/assigntask/viewbyuseridandtaskid',
                'data': {
                    userId: response.data.data[0].userId,
                    emailIdOfReceiver: response.data.data[0].emailIdOfReceiver,
                    assignTaskId: response.data.data[0].assignTaskId
                },
                'headers': {
                    'token': localStorage.getItem('accessToken')
                }
            }).then(res => {
                console.log('response viewbyuseridandtaskid', res.data.data._id)
                setcurrentUserTaskId(res.data.data._id)
                if (!response.data.data[0].assignTaskStatus == 'End') {
                    console.log("1")
                    axios({
                        'method': 'post',
                        'url': `http://localhost:4000/api/v1/assigntask/editassigntask/${res.data.data._id}`,
                        'data': { assignTaskStatus: 'Open' },
                        'headers': {
                            'token': localStorage.getItem('accessToken')
                        }
                    }).then(response => {
                        console.log('response editassigntask', response.data)
                        setisStart(true)
                    }).catch(err => {
                        console.log("error", err)
                    })
                }
            }).catch(err => {
                console.log("error", err)
            })

        }).catch(err => {
            console.log("error", err)
        })
    }, [])


    const openSendEmail = (email, subject, text) => {
        let nowDate = new Date()
        console.log(nowDate)
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/email',
            'data': { emailid: email, subject: subject, text: text + nowDate },
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        })
    }


    const startTask = () => {
        console.log("admid id on start", currentUserTaskId)

        axios({
            'method': 'post',
            'url': `http://localhost:4000/api/v1/assigntask/editassigntask/${currentUserTaskId}`,
            'data': { assignTaskStatus: 'Start' },
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
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
        console.log("allData.assignTaskId", allData.assignTaskId)
        axios({
            'method': 'post',
            'url': `http://localhost:4000/api/v1/assigntask/editassigntask/${currentUserTaskId}`,
            'data': { assignTaskStatus: 'End' },
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        }).then(response => {
            setisStart(false)
            setTaskEnd(true)
            console.log('response.data', response.data.data)
            openSendEmail(adminEmail, 'Complete task', 'user submit there task at ' + gitLink + 'on ')
        }).catch(err => {
            console.log("error", err)
        })

        axios({
            'method': 'post',
            'url': `http://localhost:4000/api/v1/submitanswertask/createsubmittasklist`,
            'data': {
                assignTaskId: allData._id,
                AnswerList: gitLink
            },
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        }).then(response => {
            console.log('submitanswertask.data', response.data.data)
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
            'data': { assignTaskStatus: 'Stop' },
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        }).then(response => {
            setisStart(false)
            console.log('response.data', response.data.data)
            openSendEmail(adminEmail, 'Stop task', 'user stop there task at ')
        }).catch(err => {
            console.log("error", err)
        })

    }

    const formItemLayout = {
        labelCol: {
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
            <Layout className="layout" style={{ minHeight: '100vh' }}>
                <Header>
                    <PageHeader />
                </Header>
                <Layout>
                    <Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={onCollapse}>
                        <div className="logo" />
                        <LeftSideBar currentkey={'1'} />
                    </Sider>
                    <Content style={{ padding: 20 }}>
                        <div>{allData.assignTaskStatus == 'End' ?
                            <Card style={{
                                borderRadius: 20,
                                backgroundColor: '#efefef',
                                width: 160,
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
                            }} >
                                Already Submited
                        </Card> : <div>
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
                                ) : <div>No Data</div>}</div>
                        }</div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )

}

export default GivenTask
