import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Button, Input, Form, Layout } from 'antd';
import axios from 'axios';
import styles from './styles/style.module.css';
import { useForm } from 'antd/lib/form/Form';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import { useHistory } from "react-router";

const { Header, Sider, Content } = Layout;

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
    const [taskEnd, setTaskEnd] = useState(false)
    const [allData, setallData] = useState([])
    const [isSubmited, setisSubmited] = useState(false)
    const [collapsed, setcollapsed] = useState(false)
    const [taskID, settaskID] = useState('')
    const [form] = useForm();


    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }

    useEffect(() => {
        console.log("assifn task user id", props.assignTasklistid)
        axios({
            'method': 'get',
            'url': `http://localhost:4000/api/v1/allassigntasklist/viewbyid/${props.assignTasklistid}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        }).then(response => {
            console.log('response viewbyid', response.data.data[0].assignTaskId)
            setcurrentUserTaskId(response.data.data[0]._id)
            if (response.data.data[0].isSubmit) {
                setisSubmited(true)
            }
            else {
                setisSubmited(false)
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
            }
            if(response.data.data[0].assignTaskId)
            {
                settaskID(response.data.data[0].assignTaskId)
            }

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
        setisStart(true)
    }
    const sumbitTask = () => {

        console.log("currentUserTaskId",currentUserTaskId)
        axios({
            'method': 'put',
            'url': `http://localhost:4000/api/v1/allassigntasklist/editallassigntasklist/${currentUserTaskId}`,
            'data': { isSubmit: true,
                    answer : {
                        questionid: taskID,
                        answer: gitLink
                    }
            },
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        }).then(response => {
            history.push('/usertask')
            console.log("response update",response)
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
            {/* <Layout className="layout" style={{ minHeight: '100vh' }}>
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
                    <Content style={{ padding: 20 }}> */}
            <div>{isSubmited ?
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
                                        {isStart ? <div>{taskDetalis.taskType == 'Project' ?<div><Input onChange={(e) => { setgitLink(e.target.value) }}></Input>
                                            <Button onClick={e=>sumbitTask()}>Submit</Button></div>:<div></div>}
                                        </div> : <Button onClick={e=>startTask()}>Start</Button>}
                                    </div>

                                </Card>
                            </div>
                        ))
                    ) : <div>No Data</div>}</div>
            }</div>
            {/* </Content>
                </Layout>
            </Layout> */}
        </div>
    )

}

export default GivenTask
