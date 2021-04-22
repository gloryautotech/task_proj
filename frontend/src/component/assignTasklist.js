import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Button, Modal } from 'antd';
import Title from 'antd/lib/typography/Title';
import style from "./styles/style.common.css";
import axios from 'axios';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import { useHistory } from "react-router";

const { Header, Sider, Content } = Layout;

function DashBoard1() {
    let history = useHistory()
    const [assignTasklist, setassignTasklist] = useState([])
    const [assignQuestionList, setassignQuestionList] = useState([])
    const [collapsed, setcollapsed] = useState(false)
    const [isData, setisData] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [questionList, setquestionList] = useState([])
    const [answerList, setanswerList] = useState([])
    const [answerTask, setanswerTask] = useState(false)
    const [taskAnswerList, settaskAnswerList] = useState('')

    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }


    useEffect(() => {
        //    / setisData(true)
        if (!localStorage.getItem('accessToken')) {
            console.log("Not login")
            history.push("/")
        } else {
            console.log("user_id", sessionStorage.getItem("user_id"))
            axios({
                'method': 'GET',
                'url': `http://localhost:4000/api/v1/assigntask/viewbyuserid/${sessionStorage.getItem("user_id")}`,
                'headers': {
                    'token': localStorage.getItem('accessToken')
                }
            }).then(response => {
                console.log('response.data', response.data.data)
                if (response.data.data) {
                    console.log("call")
                    setisData(false)
                }
                setassignTasklist(response.data.data)
            })
            axios({
                'method': 'GET',
                'url': `http://localhost:4000/api/v1/assignquestionbank/viewassignByid/${sessionStorage.getItem("user_id")}`,
                'headers': {
                    'token': localStorage.getItem('accessToken')
                }
            }).then(response => {
                console.log('response.data', response.data.data)
                if (response.data.data.length > 0) {
                    console.log("call")
                    setisData(false)
                }
                setassignQuestionList(response.data.data)
            })
        }
    }, [])
    const viewAnswer = (id) => {
        console.log("id", id)
        axios({
            'method': 'get',
            'url': `http://localhost:4000/api/v1/assignquestionbank/viewquestionbankbyid/${id}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        })
            .then(function (res) {
                console.log("res of assign question paper list", res.data.data)
                setquestionList(res.data.data)
                axios({
                    'method': 'get',
                    'url': `http://localhost:4000/api/v1/submitanswerbank/viewbyassignquestionuserid/${id}`,
                    'headers': {
                        'token': localStorage.getItem('accessToken')
                    }
                })
                    .then(function (res) {
                        console.log("res of AnswerList", res.data.data[0].AnswerList)
                        setanswerList(res.data.data[0].AnswerList)
                        setIsModalVisible(true)
                        setanswerTask(false)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const viewSubmitLink = () => {
        axios({
            'method': 'get',
            'url': `http://localhost:4000/api/v1/submitanswertask/viewbyassigntaskid/${assignTasklist.assignTaskId}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        })
            .then(function (res) {
                console.log("res of SubmitLink", res.data.data)
                setIsModalVisible(true)
                setanswerTask(true)
                setassignTasklist(res.data.data)
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
                        <LeftSideBar currentkey={'4'} />
                    </Sider>
                    <Content style={{ padding: 20 }}>
                        <div className="site-layout-content">
                            <Title >Assign Task</Title>
                            {assignTasklist ? <div>
                                {
                                    assignTasklist.map(assignTasklist => <div className="technology_card" style={{ borderRadius: 50 }} key={assignTasklist._id}><Card style={{ width: 200, borderRadius: 10, justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                                    ><div><div>Assign Task:</div>{assignTasklist.emailIdOfReceiver}<div><span>Task Status: </span>{assignTasklist.assignTaskStatus}{assignTasklist.assignTaskStatus == 'End'?<Button onClick={e => viewAnswer(assignQuestionList._id)}>View</Button>:''}</div><div><span>Your Status: </span>{assignTasklist.assignTaskVerifiedStatus}</div></div></Card></div>)
                                }
                            </div> : ''}
                            {assignQuestionList ? <div>
                                {
                                    assignQuestionList.map(assignQuestionList => <div className="technology_card" style={{ borderRadius: 50 }} key={assignQuestionList._id}><Card style={{ width: 200, borderRadius: 10, justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                                    ><div><div>Assign Task:</div>{assignQuestionList.assignUserEmail}<div><span>Submit Task Status: </span>{assignQuestionList.isSubmit ? <div><span>Submited</span><Button onClick={e => viewAnswer(assignQuestionList._id)}>View</Button></div> : <span>Not Submited</span>}</div></div></Card></div>)
                                }
                            </div> : ''}
                            <div>
                                {isData ? <div>No Data Found</div> : ''}
                                <Modal title="Answer List" visible={isModalVisible} onOk={e => setIsModalVisible(false)} onCancel={e => setIsModalVisible(false)}>
                                  <div>
                                   {answerTask?
                                   <div>{assignTasklist.AnswerList}</div>
                                   :
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
                                                ><div style={{ display: "block" }}>Question: {questionList.questionBankQuestion}</div><div style={{ display: "flex" }}> Answer: {questionList.questionBankOption ? <div>

                                                    <li>{answerList.map(answerList => <div>{questionList._id == answerList.questionId ?
                                                        <div>{questionList.questionBankAnswer == answerList.answer ? <div>Right</div> : <div>Wrong</div>}</div> : ''}</div>)}</li>

                                                </div> : <li>{answerList.map(answerList => <div>{questionList.questionBankAnswer?<div>{questionList._id == answerList.questionId ?
                                                    <div>{questionList.questionBankAnswer == answerList.answer ? <div>Right</div> : <div>Wrong</div>}</div> : ''}</div>:<div>{answerList.answer}</div>}</div>)}</li>}</div></Card></div>)
                                        }
                                    </Card>}</div>
                                </Modal>
                            </div>

                        </div>

                    </Content>
                </Layout>
            </Layout>
        </div>
    )

}

export default DashBoard1
