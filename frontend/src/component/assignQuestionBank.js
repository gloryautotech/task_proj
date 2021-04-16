import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Spin, Form, Input, Select, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import style from "./styles/style.common.css";
import axios from 'axios';
import { useHistory } from "react-router";
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import { useForm } from 'antd/lib/form/Form';

const { Header, Sider, Content } = Layout;
const { Option } = Select;

function AssignQuestionBank() {

    let history = useHistory()
    const [collapsed, setcollapsed] = useState(false)
    const [email, setemail] = useState('')
    const [questionBankType, setquestionBankType] = useState()
    const [isQuestionList, setisQuestionList] = useState(false)
    const [noOfQuestion, setnoOfQuestion] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [questionList, setquestionList] = useState([])
    const [form] = useForm();

    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }

    const questionBankTypeHandleChange = (value) => {
        console.log('questionBankType', value)
        setquestionBankType(value)
    }

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            console.log("Not login")
            history.push("/")
        }
    }, [])

    const submit = () => {
        setisLoading(true)
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/questionbank/viewbyquestionbanktype',
            'data': {
                questionBankType: questionBankType,
                limit: noOfQuestion
            },
            'headers': {
                'token': localStorage.getItem('accessToken')
            },
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
                                    <div style={{ borderRadius: 50 }}>
                                        <Card
                                            style={{
                                                width: 300,
                                                borderRadius: 40,
                                                justifyContent: 'center',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Form form={form} name="assignQuestion" onFinish={submit}>
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
                                                        style={{ borderRadius: 10, borderWidth: 2, borderColor: "#191919" }}
                                                        onChange={(e) => { setemail(e.target.value) }}></Input>
                                                </Form.Item>
                                                <Form.Item name="questionBankType" label="QuestionBank Type" rules={[{ required: true, message: "Plese Select QuestionBank Type" }]} >
                                                    <Select
                                                        defaultValue={questionBankType}
                                                        placeholder="Select"
                                                        onChange={(e) => { questionBankTypeHandleChange(e) }}>
                                                        <Option value="Logical">Logical</Option>
                                                        <Option value="screening">screening</Option>
                                                        <Option value="Technical">Technical</Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    label='No of Question'
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
                                                        onChange={(e) => { setnoOfQuestion(e.target.value) }}></Input>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button type='primary' htmlType="submit">Submit</Button>
                                                </Form.Item>
                                            </Form>
                                        </Card>
                                    </div>
                                    {isQuestionList?
                                    <Card
                                        style={{
                                            borderRadius: 40,
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
                                    </Card>:''}
                                </div>
                            </div>}
                    </Content>
                </Layout>
            </Layout>
        </div>
    )

}

export default AssignQuestionBank
