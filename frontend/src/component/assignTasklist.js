import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Button, Modal,Row,Col } from 'antd';
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
    const [questionBankId,setQuestionBankId]=useState([])
    const [questionBankAnswer, setQuestionBankAnswer]=useState('')
    const [answerTask, setanswerTask] = useState(false)
    const [taskAnswerList, settaskAnswerList] = useState('')
    const [currentId,setCurrentId]=useState('')
    const [assignTaskUserList,setAssignTaskUserList]=useState()
    const [userIdArray,setUserIdArray]=useState()
    const [allassigntask,setAllAssignTask]=useState([])
    const [assignQuestionList,setassignQuestionList]=useState([]);
    const [answerList,setAnswerList]=useState([])
    const [answerquestionId,setAnswerQuestionId]=useState([])
    const [bothId,setBothID]=useState(false)
    const [allassignAnswer,setAllAssignAnswer]=useState([])
    const [assignUserEmail,setassignUserEmail]=useState([])

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
               'method':'get',
               'url':`http://localhost:4000/api/v1/assigntaskuserlist/viewbyassignby/${userid}`,
               'headers': {
                'token': localStorage.getItem('accessToken')
              }
           })
           .then(response=>{
               console.log('assigntaskuserlist',response.data.data)
               let assignTaskUserIdList=[]
               response.data.data.forEach(element=>{
                   assignTaskUserIdList.push(element._id)
                    setAssignTaskUserList(element._id)
                   
            
                
               })
               
               console.log('assigntaskuserlistiDD',assignTaskUserIdList)
               axios({
                   'method':'post',
                   'url':'http://localhost:4000/api/v1/allassigntasklist/allviewbyid',
                   'data':{
                    id:assignTaskUserIdList
                   },
                   
                   'headers': {
                    'token': localStorage.getItem('accessToken')
                  }

               })
               .then(response=>{
                   console.log('allasigntasklistid',response.data.data) 
                   setAllAssignTask(response.data.data)
                   
                   
                
                   
                  
                  
                
                   
               })
               .catch(error=>{
                   console.log('errro',error)
               })


           })
          

           

            
            
            
            
        }

            
    }, [])
 

    

    const handleOk = () => {
        setIsModalVisible(false)     
    }

    const handleCancel=()=>{    
        setIsModalVisible(false)
    }
    
    const viewResult = (id) =>{
        console.log('userarray',id)
        axios({
            'method':'GET',
            'url':`http://localhost:4000/api/v1/allassigntasklist/viewbyid/${id}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
              }
        })
        .then(response=>{
            console.log('elememnet',response.data.data)
            response.data.data.forEach(element=>{
                console.log('userId',element._id)
                setAllAssignAnswer(element.answer)
                setUserIdArray(element._id)
            })
        })
    
       
        
       
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
                    

                    
                            {allassigntask ? <div >{allassigntask.map(allassigntask => <div className='technology_card'>
                                

                                        <Card hoverable style={{ width: 200, borderRadius: 10, justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                                           {/* <span>Assigned to:{assignUserEmail}{console.log('allassigntask._id',allassigntask._id)}</span><br/> */}
                                            Status:{allassigntask.isSubmit ? <div><Button onClick={() => { viewResult(allassigntask._id);setIsModalVisible(true) }}>View</Button></div> : <div>Not Submitted</div>}

                                        </Card>
                                   
                            </div>)}</div> : null}

                    
                   
                    
                    <Modal title='Answer' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    
                     
                       {allassignAnswer.map(allassignAnswer=><div key={allassignAnswer._id}>{allassignAnswer.answer}{console.log('hope this works',allassignAnswer.answer)}</div>)}
                        
                    </Modal>

                   

                    
                    </div>
                
                   
                    </Content>
                
                </Layout>
            </Layout>
        </div>
    
    )

}

export default DashBoard1
