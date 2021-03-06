import React, { useState, useEffect } from "react";
import { Form, Button, Input, Divider, Layout, Alert, Select, Card, Radio } from "antd";
import DynamicField from "./dynamicField";
import axios from 'axios';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import "antd/dist/antd.css";
import Title from "antd/lib/typography/Title";

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



function QuestionPaper(props) {
    const [collapsed, setcollapsed] = useState(false)
    const [questionList, setquestionList] = useState([])
    const [answerList, setanswerList] = useState([])
    const [isSubmit, setIsSubmit] = useState(false)
    const [currentUserTaskId, setcurrentUserTaskId] = useState('')
    const [form] = Form.useForm();


    useEffect(() => {
        axios({
            'method': 'get',
            'url': `http://localhost:4000/api/v1/allassigntasklist/viewbyid/${props.assignTasklistid}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        }).then(response => {
            console.log('res of viewbyid', response.data.data[0].isSubmit)
            setcurrentUserTaskId(response.data.data[0]._id)
            if (response.data.data[0].isSubmit) {
                setIsSubmit(response.data.data[0].isSubmit)
            }
            else {
                axios({
                    'method': 'post',
                    'url': `http://localhost:4000/api/v1/assignquestionbank/viewquestionbankbyid`,
                    'data' : {
                        questionBankList: response.data.data[0].questionBankList
                    },
                    'headers': {
                        'token': localStorage.getItem('accessToken')
                    }
                })
                    .then(function (res) {
                        console.log("res of assign question paper list", res.data.data)
                        setquestionList(res.data.data)
                        setIsSubmit(false)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        })


    }, [])

    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }

    const createSubmitAnswerList = (answer, questionid) => {
        var isFind = false
        if (answerList.length >= 0) {
            answerList.forEach((element, index) => {
                if (element.questionid == questionid) {
                    isFind = true
                    let newArray = [...answerList]
                    newArray[index] = { ...newArray[index], answer: answer }
                    setanswerList(newArray)
                }
            });
        }

        if (!isFind) {
            setanswerList(answerList => [...answerList, { questionid, answer }])
            isFind = false
        }

    }

    const onSubmit = () => {
        console.log("Answer lis", answerList)
            axios({
                'method': 'put',
                'url': `http://localhost:4000/api/v1/allassigntasklist/editallassigntasklist/${currentUserTaskId}`,
                'data': { isSubmit: true,
                    answer: answerList
                    },
                'headers': {
                    'token': localStorage.getItem('accessToken')
                }
            }).then(response => {
            }).catch(err => {
                console.log("error", err)
            })
    }

    return (
        <div>
            {/* <Layout className="layout" style={{ minHeight: '100vh' }}>
                <Header>
                    
                    <PageHeader/>
                    

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
            <div>{isSubmit ? <Card>Already submitted</Card> :
                <Card
                    style={{
                        borderRadius: 40,
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {<div>
                        {questionList.map(questionList => <div className="technology_card" style={{ display: 'flex' }} key={questionList._id}>
                            <Card style={{ borderRadius: 20, justifyContent: 'center', display: 'flex', alignItems: 'center', width: 200 }}
                            >{questionList.questionBankQuestion}{questionList.questionBankOption ? <div style={{ display: 'flex' }}>
                                {questionList.questionOption.map(questionOption => <div key={questionList._id}>
                                    <Radio.Group style={{ display: 'flex' }} name={questionList._id} onChange={e => createSubmitAnswerList(e.target.value, questionList._id)} value={answerList.Answer} key={questionList._id}>
                                        <Radio value={questionOption}>{questionOption}</Radio>
                                    </Radio.Group></div>
                                )}


                                {/* <li>{questionList.questionOption}</li>  */}

                            </div> : <Input onChange={e => createSubmitAnswerList(e.target.value, questionList._id)} />}</Card></div>)}

                        <div>
                            <Button style={{ marginTop: 50 }} onClick={e => onSubmit()}>Submit</Button>
                        </div></div>}
                </Card>
            }
            </div>
            {/* </Content>
                </Layout>
            </Layout > */}
        </div >
    );
}

export default QuestionPaper