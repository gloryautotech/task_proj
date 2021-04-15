
import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, DatePicker, Select, Checkbox, Divider, Layout} from 'antd';
import { useHistory } from "react-router";
import moment from 'moment';
import axios from 'axios';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import { useForm } from 'antd/lib/form/Form';
const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Basic', 
'intermediate', 
'Advance'];
const defaultCheckedList = ['Basic'];

function AddTask() {

    let history = useHistory()

    const [taskName, settaskName] = useState('')
    const [technologyType, settechnologyType] = useState('')
    const [technologyName, settechnologyName] = useState('')
    const [taskDescription, settaskDescription] = useState('')
    const [technologyListId, settechnologyListId] = useState('')
    const[technologyList,setTechnologyList]=useState([])
    const [istechtype, setistechtype] = useState(true)
    const [istechlevel, setistechlevel] = useState(true)
    const [technologyListLevel, settechnologyListLevel] = useState([])
    const [technologyLevel, settechnologyLevel] = useState('')    
    const [collapsed, setcollapsed] = useState(false)
    const [form] = useForm();
    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }
    const toggle = () => {
        setcollapsed(!collapsed)
    }
    const technologyTypeHandleChange = (value) => {
        axios({
            'method':'GET',
            'url':`http://localhost:4000/api/v1/technologylist/viewbytechnologytype/${value}`,
            'headers': {
                'token':localStorage.getItem('accessToken')
            }
        }).then(response=>{
            console.log('response.data',response.data.data)
            setTechnologyList(response.data.data)
        })
        console.log('Type', value)
        settechnologyType(value)
        setistechtype(false)
    }

    const technologyNameHandleChange = (value) => {
        axios({
            'method':'GET',
            'url':`http://localhost:4000/api/v1/technologylist/viewByTechnologyname/${value}`,
            'headers': {
                'token':localStorage.getItem('accessToken')
            }
        }).then(response=>{
            console.log('response.data',response.data.data[0].technologyLevel)
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


    useEffect(()=>{
        console.log("User_id",sessionStorage.getItem("user_id"))

    },[])

    const submit = () => {
        console.log("technologyListId",technologyListId)
        console.log("taskName",taskName)
        console.log("tasDescription",taskDescription)
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/tasklist/createtasklist',
            'data': {
                technologyListId:technologyListId,
                taskName: taskName,
                tasDescription: taskDescription
            } ,
            'headers': {
                'token':localStorage.getItem('accessToken')
            },
        })
            .then(function (res) {
                console.log("res of add task",res)
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
                    <Form form={form} name="addtechnology" onFinish={submit} style={{width:400}} scrollToFirstError>
                        <Form.Item name="technoloyType" label="Technology Type" rules={[{ required: true, message:"Please select Technology Type" }]} style={{ display: 'inline-list-item' }}>
                <Select
                    placeholder="Select a option and change input text above"
                    onChange={(e) => { technologyTypeHandleChange(e) }}
                    defaultValue={technologyType}>
                    <Option value="frontend">Front End</Option>
                    <Option value="backend">Back End</Option>
                </Select>
            </Form.Item>
            <Form.Item name="technoloyName" label="Technology Name" rules={[{ required: true,message:"Please select Technology Name" }]} style={{ display: 'inline-list-item' }}>
                <Select
                    placeholder="Select a option and change input text above"
                    disabled={istechtype}
                    onChange={(e)=>{technologyNameHandleChange(e)}}
                    defaultValue={technologyName}>
                                        {
                        technologyList.map(technologyList=><Option value={technologyList.technologyName}>
                        {technologyList.technologyName}</Option>)
                    } 
                    
                </Select>
            </Form.Item>
            <Form.Item name="technoloyLevel" label="Technology Level" rules={[{ required: true,message:"Please select Technology Level" }]} style={{ display: 'inline-list-item' }}>
                <Select
                    placeholder="Select a option and change input text above"
                    disabled={istechlevel}
                    onChange={(e)=>{technologyLevelHandleChange(e)}}
                    >
                                        {
                        technologyListLevel.map(technologyListLevel=><Option value={technologyListLevel._id}>
                        {technologyListLevel.technologyLevelName}</Option>)
                    } 
                    
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
                <Input onChange={(e) => { settaskName(e.target.value) }}></Input>
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
                <Input onChange={(e) => { settaskDescription(e.target.value) }}></Input>
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

