import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Card, Button, Input, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import { useHistory } from "react-router";
const { Header, Sider, Content } = Layout;
var shortid = require('shortid');

function DashBoard3(props) {
    let history = useHistory()
    const [taskList, settaskList] = useState([])
    const [expanded, setExpanded] = useState(false)
    const [single, setSingle] = useState()
    const [email, setemail] = useState('')
    const [collapsed, setcollapsed] = useState(false)
    const [isNotEmail, setisNotEmail] = useState(true)
    const [error, seterror] = useState('')
    const [mainUserId, setmainUserId] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }


    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            console.log("Not login")
            history.push("/")
        } else {
            function parseJwt (token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
               setmainUserId(JSON.parse(jsonPayload).userId)
            };
            parseJwt(localStorage.getItem('accessToken'))
            setisLoading(true)
            let technologyListId = props.location.state.technologyListId
            console.log("technology nme", technologyListId)
            axios({
                'method': 'get',
                'url': `http://localhost:4000/api/v1/tasklist/viewbytechnologylistid/${technologyListId}`,
                'headers': {
                    'token': localStorage.getItem('accessToken')
                },
            }).then(response => {
                console.log('response.data', response.data.data)
                settaskList(response.data.data)
                setisLoading(false)
            }).catch(err => {
                console.log("error", err)
            })
        }
    }, [])

    const handleIndividual = async (id) => {
        console.log('Id', id)
        setSingle(id)
    }
    const sendTask = (id) => {
        setExpanded(false)
        axios({
            'method': 'get',
            'url': `http://localhost:4000/api/v1/userdata/viewbyusertypeemail/${email}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
            },
        }).then(response => {
            if(response.data.data.length<=0){
                axios({
                    'method': 'post',
                    'url': `http://localhost:4000/api/v1/userdata/createIdPassword`,
                    'data': {
                        email: email,
                        password: shortid.generate()
                    },
                    'headers': {
                        'token': localStorage.getItem('accessToken')
                    },
                }).then(response => {

                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });

        axios({
            'method': 'post',
            'url': `http://localhost:4000/api/v1/assigntaskuserlist/viewbyassignbyemail`,
            'data': {
                assignUserEmail: email,
                assignBy: mainUserId
            },
            'headers': {
                'token': localStorage.getItem('accessToken')
            },
        }).then(response => {
            console.log("viewbyassignbyemail",response.data.data.length)
            if(response.data.data.length<=0){
                console.log("if")
                axios({
                    'method': 'post',
                    'url': `http://localhost:4000/api/v1/assigntaskuserlist/createassigntaskuserlist`,
                    'data': {
                        assignUserEmail: email,
                        assignBy: mainUserId
                    },
                    'headers': {
                        'token': localStorage.getItem('accessToken')
                    },
                }).then(response => {
                    console.log("createassigntaskuserlist",response.data.data)
                    addAssignTaskList(response.data.data._id,id)
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else{
                console.log("else")
                addAssignTaskList(response.data.data[0]._id,id)
            }

        })
        .catch(function (error) {
            console.log(error);
        });
       
       }

       const addAssignTaskList = (id,taskId) =>{
        axios({
            'method': 'post',
            'url': `http://localhost:4000/api/v1/allassigntasklist/createallassigntasklist`,
            'data': {
                assignTaskUserListId: id,
                assignTaskId: taskId,
                isSubmit:false
            },
            'headers': {
                'token': localStorage.getItem('accessToken')
            },
        }).then(response => {
            console.log("createallassigntasklist",response.data.data)       
        })
        .catch(function (error) {
            console.log(error);
        });
       }
        
    const onEmailChangeHandle = (e) => {
        if (!/^.+@.+\..+$/.test(e.target.value)) {
            setisNotEmail(true)
            seterror("please Enter a Valid Email")
        } else {
            setisNotEmail(false)
            setemail(e.target.value)
            seterror("")
        }
    }

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
                        {isLoading ? <Spin tip="Loading..."></Spin> : <div>
                            <Title>Task List</Title>
                            {taskList ? (
                                taskList.map((taskList) => (
                                    <div style={{ blockSize: 250 }}>

                                        <Card style={{ borderRadius: 20, backgroundColor: '#efefef', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }} >

                                            <div style={{ display: 'block' }}>{taskList.taskName}</div>
                                            <Space style={{ float: 'right', marginBottom: 5 }}>
                                                <Button style={{ borderRadius: 50 }} onClick={() => { setExpanded(true); handleIndividual(taskList._id) }}> Know more</Button>

                                                <Button style={{ borderRadius: 50 }} onClick={() => { setExpanded(false) }}>Close</Button>
                                            </Space>
                                            <div style={{ display: 'block' }}>
                                                {

                                                    expanded ? taskList._id == single ? <li>Description: {taskList.tasDescription}

                                                        <Input onChange={onEmailChangeHandle}></Input>
                                                        <h5 style={{ color: 'red' }} hidden={!isNotEmail}>{error}</h5>
                                                        <Button type='primary' onClick={() => { sendTask(taskList._id) }} disabled={isNotEmail}>Submit</Button>
                                                    </li> : '' : ''
                                                }
                                            </div>

                                        </Card>
                                    </div>
                                ))
                            ) : <div>No Data Found</div>}
                        </div>}
                    </Content>
                </Layout>
            </Layout>
        </div>
    )

}

export default DashBoard3
