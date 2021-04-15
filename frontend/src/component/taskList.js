import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Card, Button, Input, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import { useHistory } from "react-router";
const { Header, Sider, Content } = Layout;


function DashBoard3(props) {
    let history = useHistory()
    const [taskList, settaskList] = useState([])
    const [expanded, setExpanded] = useState(false)
    const [single, setSingle] = useState()
    const [email, setemail] = useState('')
    const [collapsed, setcollapsed] = useState(false)
    const [isNotEmail, setisNotEmail] = useState(true)
    const [error, seterror] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }


    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
			console.log("Not login")
			history.push("/")
		}else{
            setisLoading(true)
        console.log("technology id id ", sessionStorage.getItem("user_id"))
        let technologyListId = props.location.state.technologyListId
        console.log("technology nme", technologyListId)
        axios({
            'method': 'get',
            'url': `http://localhost:4000/api/v1/tasklist/viewbytechnologylistid/${technologyListId}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
            },
        }).then(response => {
            console.log('response.data', response.data.data)
            settaskList(response.data.data)
            setisLoading(false)
        }).catch(err => {
            console.log("error", err)
        })
    }
    }, [])

    const handleIndividual = async (id) => {
        console.log('Id', id)
        setSingle(id)
    }
    const sendTask = (id) => {
        setExpanded(false)
        //let urlPathOfTask='http://localhost:4000/api/v1/userData/viewbytaskId/'
        let urlOfGivenTask = 'http://localhost:3000/giventask/'
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/email',
            'data': { emailid: email, subject: 'Your Task is', text: 'Open this link to get your task    ' + urlOfGivenTask + '   or your id is ' + id },
            'headers': {
                'token': localStorage.getItem('accessToken')
            },
        }).then(response => {
            axios({
                'method': 'post',
                'url': 'http://localhost:4000/api/v1/assigntask/createassigntasklist',
                'data': {
                    userId: sessionStorage.getItem("user_id"),
                    emailIdOfReceiver: email,
                    assignTaskId: id,
                    assignTaskStatus: 'Receive',
                    assignTaskVerifiedStatus: 'send'
                },
                'headers': {
                    'token': localStorage.getItem('accessToken')
                },
            })
        }).catch(err => {
            console.log("error", err)
        })
    }
    const onEmailChangeHandle = (e) =>{
        if (!/^.+@.+\..+$/.test(e.target.value)) {
            setisNotEmail(true)
            seterror("please Enter a Valid Email")
          }else{
              setisNotEmail(false)
              setemail(e.target.value)
              seterror("")
          }
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
                    {isLoading?<Spin tip="Loading..."></Spin>:<div>
                        <Title>Task List</Title>
                        {taskList ? (
                            taskList.map((taskList) => (
                                <div style={{ blockSize: 250 }}>

                                    <Card style={{ borderRadius: 20, backgroundColor: '#efefef', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }} >

                                        <div style={{ display: 'block' }}>{taskList.taskName}</div>
                                        <Space style={{ float: 'right', marginBottom:5 }}>
                                            <Button style={{ borderRadius: 50 }} onClick={() => { setExpanded(true); handleIndividual(taskList._id) }}> Know more</Button>

                                            <Button style={{ borderRadius: 50 }} onClick={() => { setExpanded(false) }}>Close</Button>
                                        </Space>
                                        <div style={{ display: 'block' }}>
                                            {

                                                expanded ? taskList._id == single ? <li>Description: {taskList.tasDescription}
                                            
                                                        <Input onChange={onEmailChangeHandle}></Input>
                                                        <h5 style={{color:'red'}} hidden={!isNotEmail}>{error}</h5>
                                                        <Button type='primary' onClick={()=>{sendTask(taskList._id)}} disabled={isNotEmail}>Submit</Button>
                                                    </li>: '' : ''
                                            }
                                        </div>

                                    </Card>
                                </div>
                            ))
                        ) : <div>No Data Found</div>}
                                      </div>  }
                    </Content>
                </Layout>
            </Layout>
        </div>
    )

}

export default DashBoard3
