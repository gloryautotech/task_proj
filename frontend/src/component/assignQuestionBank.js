import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Spin, Form, Input, Select, Button } from 'antd';
import {  Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import style from "./styles/style.common.css";
import axios from 'axios';
import { useHistory } from "react-router";
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import { useForm } from 'antd/lib/form/Form';

const { Header, Sider, Content } = Layout;
const { Option } = Select;
var shortid = require('shortid');

function AssignQuestionBank() {

    let history = useHistory()
    const [collapsed, setcollapsed] = useState(false)
    const [email, setemail] = useState('')
    const [questionBankType, setquestionBankType] = useState()
    const [confirmQuestionList, setconfirmQuestionList] = useState([])
    const [isQuestionList, setisQuestionList] = useState(false)
    const [noOfQuestion, setnoOfQuestion] = useState('')
    const [questionLevel, setquestionLevel] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [mainUserId, setmainUserId] = useState('')
    const [questionList, setquestionList] = useState([])
    const [form] = useForm();

    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }

    const questionBankTypeHandleChange = (value) => {
        console.log('questionBankType', value)
        setquestionBankType(value)
    }

    const questionBankLevelHandleChange = (value) => {
        console.log('questionBankLevel', value)
        setquestionLevel(value)
    }

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            console.log("Not login")
            history.push("/")
        }else {
            let userId
            function parseJwt (token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                userId = JSON.parse(jsonPayload).userId
                setmainUserId(JSON.parse(jsonPayload).userId)
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
               if( response.data.data.userType == 'user'){
                history.push('/home')
               }
            }).catch(err => {
                console.log("error", err)
            })
        }
    }, [])

    const submit = () => {
        setisLoading(true)
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/questionbank/viewbyquestionbanktype',
            'data': {
                questionBankType: questionBankType,
                questionBankLevel: questionLevel,
                limit: noOfQuestion
            },
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        })
            .then(function (res) {
                console.log("res of assign question bank", res.data.data)
                setquestionList(res.data.data)
                setisLoading(false)
                setisQuestionList(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const sumbitQuestion = () =>{
        console.log("question",questionList)
        var questionlist=[]
        questionList.forEach(element => {
            console.log("element",element)
            questionlist.push({'questionId': element._id})
        });
        console.log("questionlist",questionlist)
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
                    addAssignTaskList(response.data.data._id,questionlist)
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else{
                console.log("else")
                addAssignTaskList(response.data.data[0]._id,questionlist)
            }

        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    const addAssignTaskList = (id,questionlist) =>{
        axios({
            'method': 'post',
            'url': `http://localhost:4000/api/v1/allassigntasklist/createallassigntasklist`,
            'data': {
                assignTaskUserListId: id,
                questionListId: questionlist,
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
                        {isLoading ? <Spin tip="Loading..."></Spin> :
                            <div className="site-layout-content">
                                <Title >Round</Title>
                                <div className="technology_card" style={{ flexDirection: 'column' }}>
                                    <Row gutter={16}>
                                    <div style={{ borderRadius: 50 }}>
                                    <Col gutter={8}>
                                        <Card
                                            style={{
                                                width: 300,
                                                borderRadius: 10,
                                                justifyContent: 'center',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Form form={form} name="assignQuestion" onFinish={submit}>
                                                <Form.Item
                                                    
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
                                                        placeholder='Enter Email'
                                                        
                                                        onChange={(e) => { setemail(e.target.value) }}></Input>
                                                </Form.Item>
                                                <Form.Item name="questionBankType"  rules={[{ required: true, message: "Plese Select QuestionBank Type" }]} >
                                                    <Select
                                                        defaultValue={questionBankType}
                                                        placeholder="QuestionBank Type"
                                                        onChange={(e) => { questionBankTypeHandleChange(e) }}>
                                                        <Option value="Logical">Logical</Option>
                                                        <Option value="screening">Screening</Option>
                                                        <Option value="Technical">Technical</Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item name="questionBankLevel"  rules={[{ required: true, message: "Plese Select QuestionBank Level" }]} >
                                                    <Select
                                                        placeholder="Select"
                                                        onChange={(e) => { questionBankLevelHandleChange(e) }}>
                                                         <Option value="Basic">Basic</Option>
                                                        <Option value="intermediate">Intermediate</Option>
                                                        <Option value="Advance">Advance</Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    
                                                    name='no-ofquestion'
                                                    rules={[
                                                        {
                                                            pattern: /[0-9]/,
                                                            message: 'Please Enter only Number'
                                                        },
                                                        {
                                                            required: true,
                                                            message: 'Please enter your Phone'
                                                        }
                                                    ]}>
                                                    <Input
                                                        placeholder='No of Question'
                                                        onChange={(e) => { setnoOfQuestion(e.target.value) }}></Input>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button style={{marginLeft:50}} type='primary' htmlType="submit">Submit</Button>
                                                </Form.Item>
                                            </Form>
                                        </Card>
                                        </Col>
                                    </div>
                                    {isQuestionList?
                                    <div>
                                    <Col gutter={8}>
                                    <Card
                                        style={{
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {
                                            questionList.map(questionList => <div className="technology_card" key={questionList._id}>
                                                <Card style={{ borderRadius: 20, justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                                                >{questionList.questionBankQuestion}</Card></div>)
                                        }
                                  <div><Button style={{marginTop:50}} onClick={e=>sumbitQuestion()}>Submit</Button></div>  </Card></Col></div>:''}
                                  </Row>   
                                </div>
                            </div>}
                    </Content>
                </Layout>
            </Layout>
        </div>
    )

}

export default AssignQuestionBank
