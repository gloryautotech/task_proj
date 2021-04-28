import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Button, Modal } from 'antd';
import Title from 'antd/lib/typography/Title';
import style from "./styles/style.common.css";
import axios from 'axios';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import { useHistory } from "react-router";
import AssignTask from './assignTask';

const { Header, Sider, Content } = Layout;

function DashBoard1() {
    let history = useHistory()
    const [assignTasklist, setassignTasklist] = useState([])
    const [collapsed, setcollapsed] = useState(false)
    const [isData, setisData] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [questionList, setquestionList] = useState([])
    const [questionBankId,setQuestionBankId]=useState('')
    const [questionBankAnswer, setQuestionBankAnswer]=useState('')
    const [answerTask, setanswerTask] = useState(false)
    const [taskAnswerList, settaskAnswerList] = useState('')
    const [currentId,setCurrentId]=useState('')
    const [assignTaskUserList,setAssignTaskUserList]=useState([])
    const [userIdArray,setUserIdArray]=useState([])
    const [allassigntask,setAllAssignTask]=useState([])
    const [assignQuestionList,setassignQuestionList]=useState([]);
    const [answerList,setAnswerList]=useState([])
    

    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }


    useEffect(() => {
        //    / setisData(true)
        if (!localStorage.getItem('accessToken')) {
            console.log("Not login")
            history.push("/")
        } 
        else
        {
            console.log("user_id", sessionStorage.getItem("user_id"))
            axios({
                'method':'get',
                'url': `http://localhost:4000/api/v1/assigntaskuserlist/viewbyassignid/${sessionStorage.getItem("user_id")}`,
                'headers': {
                            'token': localStorage.getItem('accessToken')
                }
               

            })
            .then(response=>{
                console.log('RRResponse',response.data.data)
                let assignTaskUserListIdList = []
                setAssignTaskUserList(response.data.data)
                response.data.data.forEach(element => {
                    assignTaskUserListIdList.push(element._id)
                });
                axios({
                    'method':'post',
                    'url':`http://localhost:4000/api/v1/allassigntasklist/allviewbyid`,
                    'data': {
                        id: assignTaskUserListIdList
                    },
                    'headers': {
                        'token': localStorage.getItem('accessToken')
                    }
                })
                .then(response=>{
                    console.log('allassigntask',response.data.data)
                    // response.data.data.forEach(element=>{
                    //     console.log('element.answer',element.answer)
                    //     setAnswerList(element.answer)
                    // })
                    
                    setAllAssignTask(response.data.data)
                })

            })
            
            
            // axios({
            //     'method': 'GET',
            //     'url': `http://localhost:4000/api/v1/assigntask/viewbyuserid/${sessionStorage.getItem("user_id")}`,
            //     'headers': {
            //         'token': localStorage.getItem('accessToken')
            //     }
            // }).then(response => {
            //     console.log('response.data assign task', response.data.data)
            //     if (response.data.data) {
            //         console.log("call")
            //         setisData(false)
            //     }
            //     setassignTasklist(response.data.data)
            // })
            // axios({
            //     'method': 'GET',
            //     'url': `http://localhost:4000/api/v1/assignquestionbank/viewassignByid/${sessionStorage.getItem("user_id")}`,
            //     'headers': {
            //         'token': localStorage.getItem('accessToken')
            //     }
            // }).then(response => {
            //     console.log("user_id 2", sessionStorage.getItem("user_id"))
            //     console.log('response.data', response.data.data)
            //     console.log('response.data.data[0].assignby',response.data.data[0].assignBy)
            //     if (response.data.data.length > 0) {
            //         console.log("call")
            //         setisData(false)
            //     }
            //     setassignQuestionList(response.data.data)
               
            // })
        }

            
    }, [])
    // const viewAnswer = (id) => {
    //     console.log("id", id)
    //     axios({
    //         'method': 'get',
    //         'url': `http://localhost:4000/api/v1/assignquestionbank/viewquestionbankbyid/${id}`,
    //         'headers': {
    //             'token': localStorage.getItem('accessToken')
    //         }
    //     })
    //         .then(function (res) {
    //             console.log("res of assign question paper list", res.data.data)
    //             setquestionList(res.data.data)
    //             axios({
    //                 'method': 'get',
    //                 'url': `http://localhost:4000/api/v1/submitanswerbank/viewbyassignquestionuserid/${id}`,
    //                 'headers': {
    //                     'token': localStorage.getItem('accessToken')
    //                 }
    //             })
    //                 .then(function (res) {
    //                     console.log("res of AnswerList", res.data.data[0].AnswerList)
    //                     setanswerList(res.data.data[0].AnswerList)
    //                     setIsModalVisible(true)
    //                     setanswerTask(false)
    //                 })
    //                 .catch(function (error) {
    //                     console.log(error);
    //                 });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    // const viewSubmitLink = (id) => {
    //     console.log("viewSubmitLink id",id)
    //     axios({
    //         'method': 'get',
    //         'url': `http://localhost:4000/api/v1/submitanswertask/viewbyassigntaskid/${id}`,
    //         'headers': {
    //             'token': localStorage.getItem('accessToken')
    //         }
    //     })
    //         .then(function (res) {
    //             console.log("res of SubmitLink", res.data.data[0])
    //             setIsModalVisible(true)
    //             setanswerTask(true)
    //             setanswerList(res.data.data[0])
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    const handleView=()=>{
        console.log("user_id 1", sessionStorage.getItem("user_id"))
        axios({
            'method':'get',
            'url':`http://localhost:4000/api/v1/assigntaskuserlist/viewbyid/${sessionStorage.getItem("user_id")}`,
            'headers':{
                'token': localStorage.getItem('accessToken')
            }
        })
        .then(function(res){
            console.log('View data',res.data)
        })
        .catch(function(error){
            console.log(error)
        })
    }

    const handleOk = () => {
        setIsModalVisible(false)     
    }

    const handleCancel=()=>{    
        setIsModalVisible(false)
    }
    
    const viewResult = (answer) =>{
        console.log("answer",answer.answer)
        let allQuestionList = []
        
        answer.answer.forEach(element => {
            
            console.log('element.answer',element.answer)
            setAnswerList(element.answer)
            // setassignQuestionList(assignQuestionList.push({"id":element.questionid,"answer":element.answer}))
        });
        if(answer.questionBankList.length>0){
  
            axios({
                'method':'post',
                'url':`http://localhost:4000/api/v1/questionbank/allviewbyid`,
                'data': {
                    id: allQuestionList
                }, 
                'headers':{
                    'token': localStorage.getItem('accessToken')
                }
            })
            .then(function(res){

                console.log('View data',res.data.data)
                res.data.data.forEach(element=>{
                    console.log('questionbanklist',element._id)
                    setQuestionBankId(element._id)
                    setQuestionBankAnswer(element._questionBankAnswer)
                })
                setquestionList(res.data.data)
                setIsModalVisible(true)


            
                
            })
            .catch(function(error){
                console.log(error)
            })
        }
        else{
            {console.log('else true')}
            setIsModalVisible(true)
        }
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
                    <div>
                    {allassigntask?<div>{allassigntask.map(allassigntask=><div>
                    <Card hoverable style={{ width: 200 ,borderRadius:10, justifyContent:'center', display:'flex', alignItems:'center'}}>
                        Status:{allassigntask.isSubmit?<div><Button onClick={()=>viewResult(allassigntask)}>View</Button></div>:<div>Not Submitted</div>}
                    </Card>
                    </div>)}</div>:null}
                    </div>

                    <Modal title='Answer' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        {console.log('answerList',answerList)}
                        {answerList}
                        
                       


                        

                      
                        
                       
                        

                       
                        
                    </Modal>

                   

                    
                    </div>
                
                   
                    </Content>
                
                </Layout>
            </Layout>
        </div>
    
    )

}

export default DashBoard1
