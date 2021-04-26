import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Button, Modal } from 'antd';
import Title from 'antd/lib/typography/Title';
import style from "./styles/style.common.css";
import axios from 'axios';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import { useHistory } from "react-router";
import AssignTask from "./assignTask";
import QuestionPaper from "./questionPaper";

const { Header, Sider, Content } = Layout;

function DashBoard1() {
    let history = useHistory()
    const [collapsed, setcollapsed] = useState(false)
    const [allTask, setallTask] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTaskId, setcurrentTaskId] = useState('')
    const [isData, setisData] = useState(false)
    const [isTask, setisTask] = useState(false)

    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }


    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            console.log("Not login")
            history.push("/")
        } else {
            console.log("user_id", sessionStorage.getItem("user_id"))
            axios({
                'method': 'GET',
                'url': `http://localhost:4000/api/v1/userdata/viewuserlist/${sessionStorage.getItem("user_id")}`,
                'headers': {
                    'token': localStorage.getItem('accessToken')
                }
            }).then(response => {
                console.log('response.data viewuserlist', response.data.data)
                axios({
                    'method': 'GET',
                    'url': `http://localhost:4000/api/v1/assigntaskuserlist/viewbyassignuseremail/${response.data.data.email}`,
                    'headers': {
                        'token': localStorage.getItem('accessToken')
                    }
                }).then(response => {
                    console.log('response.data viewbyassignuseremail', response.data.data)
                    var allUserTask = []
                    response.data.data.forEach(element => {
                        allUserTask.push(element._id)
                    });
                    console.log("allUserTask", allUserTask)
                    axios({
                        'method': 'post',
                        'url': `http://localhost:4000/api/v1/allassigntasklist/allviewbyid`,
                        'data': {
                            id: allUserTask
                        },
                        'headers': {
                            'token': localStorage.getItem('accessToken')
                        }
                    }).then(response => {
                        console.log("allviewbyid response", response.data.data)
                        setallTask(response.data.data)
                    })
                })
            })

        }
    }, [])

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
                        <div className="site-layout-content">
                            <Title >Assign Task</Title>
                            {allTask ? <div>
                                {
                                    allTask.map(allTask => <div className="technology_card"
                                        style={{ borderRadius: 50 }} key={allTask._id}>
                                        <Card style={{ width: 200, borderRadius: 10, justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                                        ><div>
                                                <span>Task Status: </span>
                                                {allTask.isSubmit?<div>Submited</div>:<div>Not Submited</div>}
                                                {allTask.isSubmit == false ? <Button onClick={() => { setIsModalVisible(true); setcurrentTaskId(allTask._id); { allTask.questionBankList.length <= 0 ? setisTask(true) : setisTask(false) } }}>Start</Button> : '' }</div></Card></div>)
                                }
                            </div> : ''}
                            <div>
                                {isData ? <div>No Data Found</div> : ''}
                                <Modal title="Answer List" visible={isModalVisible} onOk={() => { setIsModalVisible(false) }} onCancel={e => setIsModalVisible(false)}>
                                    <div>
                                        {isTask ? <div>
                                            <AssignTask assignTasklistid={currentTaskId} />
                                        </div>
                                            :
                                            <div>
                                                <QuestionPaper assignTasklistid={currentTaskId} />
                                            </div>}
                                    </div>
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
