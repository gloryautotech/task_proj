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
            let userid
            function parseJwt (token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
               userid = JSON.parse(jsonPayload).userId
            };
            parseJwt(localStorage.getItem('accessToken'))
            axios({
                'method': 'GET',
                'url': `http://localhost:4000/api/v1/assigntask/viewbyuserid/${userid}`,
                'headers': {
                    'token': localStorage.getItem('accessToken')
                }
            }).then(response => {
                console.log('response.data assign task', response.data.data)
                if (response.data.data) {
                    console.log("call")
                    setisData(false)
                }
                setassignTasklist(response.data.data)
            })
            axios({
                'method': 'GET',
                'url': `http://localhost:4000/api/v1/assignquestionbank/viewassignByid/${userid}`,
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

    const viewSubmitLink = (id) => {
        console.log("viewSubmitLink id",id)
        axios({
            'method': 'get',
            'url': `http://localhost:4000/api/v1/submitanswertask/viewbyassigntaskid/${id}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        })
            .then(function (res) {
                console.log("res of SubmitLink", res.data.data[0])
                setIsModalVisible(true)
                setanswerTask(true)
                setanswerList(res.data.data[0])
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return(
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
                <LeftSideBar currentkey={'4'}/>
            </Sider>
            <Content style={{ padding: 20 }}>
                <div className="site-layout-content">
                    <Title >Assign Task</Title>
                    {assignTasklist?<div>              
                    {
                        assignTasklist.map(assignTasklist=><div className="technology_card" style={{borderRadius:50}} key={assignTasklist._id}><Card hoverable style={{ width: 200 ,borderRadius:10, justifyContent:'center', display:'flex', alignItems:'center'}}
                        ><div><div>Assign Task:</div>{assignTasklist.emailIdOfReceiver}<div><span>Task Status: </span>{assignTasklist.assignTaskStatus}</div><div><span>Your Status: </span>{assignTasklist.assignTaskVerifiedStatus}</div></div></Card></div>)
                    } 
                     </div> :''}
                     {assignQuestionList?<div>              
                      {
                        assignQuestionList.map(assignQuestionList=><div className="technology_card" style={{borderRadius:50}} key={assignQuestionList._id}><Card hoverable  style={{ width: 200 ,borderRadius:10, justifyContent:'center', display:'flex', alignItems:'center'}}
                        ><div><div>Assign Task:</div>{assignQuestionList.assignUserEmail}<div><span>Submit Task Status: </span>{assignQuestionList.isSubmit?<span>Submited</span>:<span>Not Submited</span>}</div></div></Card></div>)
                    }
                     </div> :''}
                     <div>
                         {isData?<div>No Data Found</div>:''}
                     </div>
                    </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    
    )

}

export default DashBoard1
