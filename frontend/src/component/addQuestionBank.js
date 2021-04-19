import React, { useState } from "react";
import { Form, Button, Input, Divider, Layout, Alert, Select } from "antd";
import DynamicField from "./dynamicField";
import axios from 'axios';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
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
    const [issubmit, setissubmit] = useState(false)
    const [collapsed, setcollapsed] = useState(false)
    const [isQuestionOptionTrue, setisQuestionOptionTrue] = useState(false)
    const [questionBankType, setquestionBankType] = useState()
    const [question, setquestion] = useState()
    const [answer, setanswer] = useState()
    const [error, seterror] = useState('')
    const [questionBankOption, setquestionBankOption] = useState()
    const [form] = Form.useForm();

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
            console.log("values.fields",values.fields)
            let questionOption = []
             if(questionBankOption == 'true'){
                 console.log("hel")
                 values.fields.forEach(element => {
                    questionOption.push(element)
                 });
            // for (let index = 0; index <= values.fields.length; index++) {
            //     questionOption.push(values.fields[index].option)
            // }
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
                    questionOption: questionOption
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
                    <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
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
                            name="questionBankQuestion"
                            label="Question"
                            rules={[{ required: true, message: "Plese Enter Question" }]}
                        >
                            <Input value={question} placeholder="Enter your Question" onChange={(e) => { setquestion(e.target.value) }} />
                        </Form.Item>
                        <Form.Item name="questionBankOption" label="QuestionBank Option" rules={[{ required: true, message: "Plese Select QuestionBank Option" }]} >
                            <Select
                                value={questionBankOption}
                                placeholder="Select"
                                onChange={(e) => { questionBankOptionHandleChange(e) }}>
                                <Option value="true">True</Option>
                                <Option value="false">false</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="questionBankAnswer"
                            label="Answer"
                            rules={[{ required: true, message: "Plese Enter Answer" }]}
                        >
                            <Input value={answer} defaultValue={answer} placeholder="Enter your Answer" onChange={(e) => { setanswer(e.target.value) }} />
                        </Form.Item>
                        {/* <Form.Item
                            hidden={!isQuestionOptionTrue}
                            name="option"
                            label="Option"
                            rules={[{ required: true, message: "Plese Enter Option" }]}
                        >
                            <Input />
                        </Form.Item> */}
                        {/* <Divider dashed>Additional Fields</Divider> */}
                        {isQuestionOptionTrue ? <DynamicField /> : ''}
                        <h5 style={{ color: 'red' }}>{error}</h5>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
          </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </Layout>
    </div>
    );
}

export default AddQuestionBank