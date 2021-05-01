
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Layout, Alert, Row, Col, Card, Image } from 'antd';
import axios from 'axios';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import { useForm } from 'antd/lib/form/Form';
import { useHistory } from "react-router";
const { Header, Sider, Content } = Layout;
const { Option } = Select;

function AddTask() {

    let history = useHistory()
    const [taskName, settaskName] = useState('')
    const [technologyType, settechnologyType] = useState('')
    const [technologyName, settechnologyName] = useState('')
    const [taskDescription, settaskDescription] = useState('')
    const [technologyListId, settechnologyListId] = useState('')
    const [taskType, settaskType] = useState('')
    const [technologyList, setTechnologyList] = useState([])
    const [istechtype, setistechtype] = useState(true)
    const [istechlevel, setistechlevel] = useState(true)
    const [technologyListLevel, settechnologyListLevel] = useState([])
    const [collapsed, setcollapsed] = useState(false)
    const [issubmit, setissubmit] = useState(false)
    const [form] = useForm();

    const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setissubmit(false)
    }, 8000)

    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }

    const taskTypeHandleChange = (value) => {
        console.log('taskTypeHandleChange', value)
        settaskType(value)
    }

    const technologyTypeHandleChange = (value) => {
        axios({
            'method': 'GET',
            'url': `http://localhost:4000/api/v1/technologylist/viewbytechnologytype/${value}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        }).then(response => {
            console.log('response.data', response.data.data)
            setTechnologyList(response.data.data)
            setissubmit(true)
        })
        console.log('Type', value)
        settechnologyType(value)
        setistechtype(false)
    }

    const technologyNameHandleChange = (value) => {
        axios({
            'method': 'GET',
            'url': `http://localhost:4000/api/v1/technologylist/viewByTechnologyname/${value}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        }).then(response => {
            console.log('response.data', response.data.data[0].technologyLevel)
            settechnologyListLevel(response.data.data[0].technologyLevel)
        })
        console.log('Name', value)
        settechnologyName(value)
        setistechlevel(false)
    }

    const technologyLevelHandleChange = (value) => {
        console.log('Name', value)
        settechnologyListId(value)
    }


    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            console.log("Not login")
            history.push("/")
        } else {
            let userId
            function parseJwt(token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                userId = JSON.parse(jsonPayload).userId
            };
            parseJwt(localStorage.getItem('accessToken'))
            axios({
                'method': 'get',
                'url': `http://localhost:4000/api/v1/userdata/viewuserlist/${userId}`,
                'headers': {
                    'token': localStorage.getItem('accessToken')
                },
            }).then(response => {
                console.log('response.data', response.data.data)
                if (response.data.data.userType != 'admin') {
                    history.push('/home')
                }
            }).catch(err => {
                console.log("error", err)
            })
        }

    }, [])

    const submit = () => {
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/tasklist/createtasklist',
            'data': {
                technologyListId: technologyListId,
                taskName: taskName,
                tasDescription: taskDescription,
                taskType: taskType
            },
            'headers': {
                'token': localStorage.getItem('accessToken')
            },
        })
            .then(function (res) {
                console.log("res of add task", res)
            })
            .catch(function (error) {
                console.log(error);
            });
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
                        <LeftSideBar currentkey={'3'} />
                    </Sider>
                    <Content style={{ padding: 20 }}>
                        {issubmit ?
                            <div style={{ width: 212, position: "absolute", right: 0, zIndex: 9999 }}>
                                <Alert message="Success Text" type="success" />
                            </div> : ''}
                        <Row justify="center" align="middle" style={{ minHeight: '80vh' }}> 
                            <Col>
                                <Card style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: 20, width: 800, }}>
                                    <Form form={form} name="addtechnology" onFinish={submit} style={{ width: 400 }} scrollToFirstError>
                                        <Image style={{ marginLeft: 450 }} width={300} src={require('../img/addTask.jpg')} preview={false}></Image>
                                        <Form.Item name="technoloyType"  rules={[{ required: true, message: "Please select Technology Type" }]} style={{ marginTop: -300 }}>
                                            <Select
                                                placeholder="Technology Type"
                                                onChange={(e) => { technologyTypeHandleChange(e) }}>
                                                <Option value="frontend">Front End</Option>
                                                <Option value="backend">Back End</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item name="technoloyName"  rules={[{ required: true, message: "Please select Technology Name" }]} style={{ display: 'inline-list-item' }}>
                                            <Select
                                                placeholder="Technology Name"
                                                disabled={istechtype}
                                                onChange={(e) => { technologyNameHandleChange(e) }}>
                                                {
                                                    technologyList.map(technologyList => <Option value={technologyList.technologyName}>
                                                        {technologyList.technologyName}</Option>)
                                                }

                                            </Select>
                                        </Form.Item>
                                        <Form.Item name="technoloyLevel"  rules={[{ required: true, message: "Please select Technology Level" }]} style={{ display: 'inline-list-item' }}>
                                            <Select
                                                placeholder="Technology Level"
                                                disabled={istechlevel}
                                                onChange={(e) => { technologyLevelHandleChange(e) }}
                                            >
                                                {
                                                    technologyListLevel.map(technologyListLevel => <Option value={technologyListLevel._id}>
                                                        {technologyListLevel.technologyLevelName}</Option>)
                                                }

                                            </Select>
                                        </Form.Item>
                                        <Form.Item name="taskType"  rules={[{ required: true, message: "Plese Select Task Type" }]} >
                                            <Select
                                                placeholder="Task Type"
                                                onChange={(e) => { taskTypeHandleChange(e) }}>
                                                <Option value="Project">Project</Option>
                                                <Option value="Code">Code</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            
                                            name='taskName'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your Task Name'
                                                }
                                            ]}>
                                            <Input placeholder={"Enter Task Name"} onChange={(e) => { settaskName(e.target.value) }}></Input>
                                        </Form.Item>
                                        <Form.Item
                                        
                                            name='taskdescription'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your Task Description'
                                                }
                                            ]}>
                                            <Input placeholder={"Enter Task Description"} onChange={(e) => { settaskDescription(e.target.value) }}></Input>
                                        </Form.Item>

                                        <Form.Item>
                                            <Button style={{marginLeft:155}} type='primary' htmlType='submit'>Submit</Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )

}

export default AddTask

