import React, { useState, useEffect } from "react";
import { Form, Button, Input, Divider, Layout, Alert, Select, Row, Col, Card, Image,message } from "antd";
import DynamicField from "./dynamicField";
import axios from 'axios';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import { useHistory } from "react-router";
import "antd/dist/antd.css";

const { Option } = Select;
const { Header, Sider, Content } = Layout;

const defaultFormItemLayout = {
    labelCol: {
        xs: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 12 }
    }
};

function AddQuestionBank() {
    let history = useHistory()
    const [issubmit, setissubmit] = useState(false)
    const [collapsed, setcollapsed] = useState(false)
    const [isQuestionOptionTrue, setisQuestionOptionTrue] = useState(false)
    const [questionBankType, setquestionBankType] = useState()
    const [question, setquestion] = useState()
    const [answer, setanswer] = useState()
    const [questionLevel, setquestionLevel] = useState('')
    const [error, seterror] = useState('')
    const [questionBankOption, setquestionBankOption] = useState()
    const [form] = Form.useForm();

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

    const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setissubmit(false)
    }, 8000)

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

    const questionBankOptionHandleChange = (value) => {
        console.log('questionBankType', value)
        setquestionBankOption(value)
        if (value == 'true') {
            setisQuestionOptionTrue(true)
        }
        else {
            setisQuestionOptionTrue(false)
        }
    }

    const handleFinish = (values) => {
        if (questionBankOption == 'true' && !values.fields) {
            seterror("Please Add Atlist One option")
        }
        else {
            seterror("")
            console.log("values.fields", values.fields)
            let questionOption = []
            if (questionBankOption == 'true') {
                console.log("hel")
                values.fields.forEach(element => {
                    questionOption.push(element)
                });

            }
            console.log("all option", questionOption)
            axios({
                'method': 'post',
                'url': 'http://localhost:4000/api/v1/questionbank/createquestionbank',
                'data': {
                    questionBankType: questionBankType,
                    questionBankOption: questionBankOption,
                    questionBankQuestion: question,
                    questionBankAnswer: answer,
                    questionOption: questionOption,
                    questionLevel: questionLevel
                },
                'headers': {
                    'token': localStorage.getItem('accessToken')
                },
            })
                .then(function (res) {
                    console.log("res", res)
                    console.log("call null")
                    setanswer(null)
                    setquestionBankOption(null)
                    setquestionBankType(null)
                    setquestion(null)
                    setisQuestionOptionTrue(false)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        console.log("VALUES", values);


    }
    return (<div>
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
                    <LeftSideBar currentkey={'5'} />
                </Sider>
                <Content style={{ padding: 20 }}>
                    {issubmit ?
                        <div style={{ width: 212, position: "absolute", right: 0, zIndex: 9999 }}>
                            <Alert message="Success Text" type="success" />
                        </div> : ''}
                    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
                        <Col>
                            <Card style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: 20, width: 800, }}>
                                <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
                                <Image style={{ marginLeft: 450 }} width={300} src={require('../img/addQuestionBank.jpg')} preview={false}></Image>
                                    <Form.Item name="questionBankType" rules={[{ required: true, message: "Plese Select QuestionBank Type" }]} style={{ marginTop: -300 }}>
                                        <Select
                                            defaultValue={questionBankType}
                                            placeholder="QuestionBank Type"
                                            onChange={(e) => { questionBankTypeHandleChange(e) }}>
                                            <Option value="Logical">Logical</Option>
                                            <Option value="screening"> Screening</Option>
                                            <Option value="Technical">Technical</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="questionBankLevel"  rules={[{ required: true, message: "Plese Select QuestionBank Level" }]} >
                                        <Select
                                            placeholder="QuestionBank Level"
                                            onChange={(e) => { questionBankLevelHandleChange(e) }}>
                                            <Option value="Basic">Basic</Option>
                                            <Option value="intermediate">Intermediate</Option>
                                            <Option value="Advance">Advance</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="questionBankQuestion"
                                        
                                        rules={[{ required: true, message: "Plese Enter Question" }]}
                                    >
                                        <Input value={question} placeholder="Enter your Question" onChange={(e) => { setquestion(e.target.value) }} />
                                    </Form.Item>
                                    <Form.Item name="questionBankOption"  rules={[{ required: true, message: "Plese Select QuestionBank Option" }]} >
                                        <Select
                                            value={questionBankOption}
                                            placeholder="QuestionBank Option"
                                            onChange={(e) => { questionBankOptionHandleChange(e) }}>
                                            <Option value="true">True</Option>
                                            <Option value="false">False</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="questionBankAnswer"
                                    
                                        rules={[{ required: isQuestionOptionTrue, message: "Plese Enter Answer" }]}
                                    >
                                        <Input value={answer} defaultValue={answer} placeholder="Enter your Answer" onChange={(e) => { setanswer(e.target.value) }} />
                                    </Form.Item>
                                    {isQuestionOptionTrue ? <DynamicField /> : ''}
                                    <h5 style={{ color: 'red' }}>{error}</h5>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" style={{marginLeft:150}} onClick={()=>{message.success('Your question added')}}>
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    </div>
    );
}

export default AddQuestionBank