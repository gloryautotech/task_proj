
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Layout, Alert,Row,Col,Card,Image } from 'antd';
import axios from 'axios';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import { useForm } from 'antd/lib/form/Form';
import { useHistory } from "react-router";
const { Header, Sider, Content } = Layout;
const { Option } = Select;

function AddTask() {

    let history = useHistory()
    const [taskName, settaskName] = useState('')
    const [technologyType, settechnologyType] = useState('')
    const [technologyName, settechnologyName] = useState('')
    const [taskDescription, settaskDescription] = useState('')
    const [technologyListId, settechnologyListId] = useState('')
    const [taskType, settaskType] = useState('')
    const[technologyList,setTechnologyList]=useState([])
    const [istechtype, setistechtype] = useState(true)
    const [istechlevel, setistechlevel] = useState(true)
    const [technologyListLevel, settechnologyListLevel] = useState([])
    const [collapsed, setcollapsed] = useState(false)
    const [issubmit, setissubmit] = useState(false)
    const [form] = useForm();

    const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setissubmit(false)
    }, 8000)

    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }

    const taskTypeHandleChange = (value) => {
        console.log('taskTypeHandleChange', value)
        settaskType(value)
    }

    const technologyTypeHandleChange = (value) => {
        axios({
            'method': 'GET',
            'url': `http://localhost:4000/api/v1/technologylist/viewbytechnologytype/${value}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        }).then(response => {
            console.log('response.data', response.data.data)
            setTechnologyList(response.data.data)
            setissubmit(true)
        })
        console.log('Type', value)
        settechnologyType(value)
        setistechtype(false)
    }

    const technologyNameHandleChange = (value) => {
        axios({
            'method': 'GET',
            'url': `http://localhost:4000/api/v1/technologylist/viewByTechnologyname/${value}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        }).then(response => {
            console.log('response.data', response.data.data[0].technologyLevel)
            settechnologyListLevel(response.data.data[0].technologyLevel)
        })
        console.log('Name', value)
        settechnologyName(value)
        setistechlevel(false)
    }

    const technologyLevelHandleChange = (value) => {
        console.log('Name', value)
        settechnologyListId(value)
    }


    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            console.log("Not login")
            history.push("/")
        }
        console.log("User_id", sessionStorage.getItem("user_id"))

    }, [])

    const submit = () => {
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/tasklist/createtasklist',
            'data': {
                technologyListId: technologyListId,
                taskName: taskName,
                tasDescription: taskDescription,
                taskType: taskType
            } ,
            'headers': {
                'token': localStorage.getItem('accessToken')
            },
        })
            .then(function (res) {
                console.log("res of add task", res)
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
                        <LeftSideBar currentkey={'3'} />
                    </Sider>
                    <Content style={{ padding: 20 }}>
                    {issubmit?
                       <div style={{width:212,position:"absolute",right:0,zIndex:9999}}> 
           <Alert message="Success Text" type="success" />
           </div>:''}
                    <Form form={form} name="addtechnology" onFinish={submit} style={{width:400}} scrollToFirstError>
                        <Form.Item name="technoloyType" label="Technology Type" rules={[{ required: true, message:"Please select Technology Type" }]} style={{ display: 'inline-list-item' }}>
                <Select
                    placeholder="Select"
                    onChange={(e) => { technologyTypeHandleChange(e) }}>
                    <Option value="frontend">Front End</Option>
                    <Option value="backend">Back End</Option>
                </Select>
            </Form.Item>
            <Form.Item name="technoloyName" label="Technology Name" rules={[{ required: true,message:"Please select Technology Name" }]} style={{ display: 'inline-list-item' }}>
                <Select
                    placeholder="Select"
                    disabled={istechtype}
                    onChange={(e)=>{technologyNameHandleChange(e)}}>
                                        {
                        technologyList.map(technologyList=><Option value={technologyList.technologyName}>
                        {technologyList.technologyName}</Option>)
                    } 
                    
                </Select>
            </Form.Item>
            <Form.Item name="technoloyLevel" label="Technology Level" rules={[{ required: true,message:"Please select Technology Level" }]} style={{ display: 'inline-list-item' }}>
                <Select
                    placeholder="Select"
                    disabled={istechlevel}
                    onChange={(e)=>{technologyLevelHandleChange(e)}}
                    >
                                        {
                        technologyListLevel.map(technologyListLevel=><Option value={technologyListLevel._id}>
                        {technologyListLevel.technologyLevelName}</Option>)
                    } 
                    
                </Select>
            </Form.Item>
            <Form.Item name="taskType" label="Task Type" rules={[{ required: true, message: "Plese Select Task Type" }]} >
                            <Select
                                placeholder="Select"
                                onChange={(e) => { taskTypeHandleChange(e) }}>
                                <Option value="Project">Project</Option>
                                <Option value="Code">Code</Option>
                            </Select>
                        </Form.Item>
            <Form.Item
                label='Task Name'
                name='taskName'
                rules={[
                    {
                        required: true,
                        message: 'Please enter your Task Name'
                    }
                ]}>
                <Input placeholder={"Enter Task Name"} onChange={(e) => { settaskName(e.target.value) }}></Input>
            </Form.Item>
            <Form.Item
                label='Task Description'
                name='taskdescription'
                rules={[
                    {
                        required: true,
                        message: 'Please enter your Task Description'
                    }
                ]}>
                <Input placeholder={"Enter Task Description"} onChange={(e) => { settaskDescription(e.target.value) }}></Input>
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit'>Submit</Button>
            </Form.Item>
            </Form>
            </Content>
            </Layout>
            </Layout>
        </div>
    )

}

export default AddTask

