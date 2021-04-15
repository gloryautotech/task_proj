
import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, DatePicker, Select, Checkbox, Divider, Alert, Layout} from 'antd';
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

function AddTechnology() {

    let history = useHistory()

    const [technologyType, settechnologyType] = useState('')
    const [technologyName, settechnologyName] = useState('')
    const [checkedList, setCheckedList] = useState('');
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const [issubmit, setissubmit] = useState(false)  
    const [collapsed, setcollapsed] = useState(false)
    const [form] = useForm();
    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }
    const toggle = () => {
        setcollapsed(!collapsed)
    }

    
    const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setissubmit(false)
      }, 3000)

    const technologyTypeHandleChange = (value) => {
        console.log('Type', value)
        settechnologyType(value)
    }

    const onChange = list => {
 
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
      };
    
      const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
      };

    const submit = () => {
        console.log("usertechnologyType", `${technologyType}`)
        console.log("usertechnologyName", `${technologyName}`)
        var levels=[]
        checkedList.forEach(element => {
            levels.push({'level': element})
        });
        console.log("level",levels)
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/technologylist/createtechnologylist',
            'data': {
                technologyType:technologyType,
                technologyName: technologyName,
                technologyLevel: levels
            } ,
            'headers': {
                'token':localStorage.getItem('accessToken')
            },
        })
            .then(function (res) {
                settechnologyName('')
                settechnologyType('')
                setCheckedList('')
                setissubmit(true)
                timeId()
                console.log("res of add technology",res)
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
                        <LeftSideBar currentkey={'2'} />
                    </Sider>
                    <Content style={{ padding: 20 }}>
            {issubmit?
                       <div style={{width:212,position:"absolute",right:0,zIndex:9999}}> 
           <Alert message="Success Text" type="success" />
           </div>:''}
           <Form form={form} name="addtechnology" onFinish={submit} style={{width:400}} scrollToFirstError>
            <Form.Item name="technoloyType" label="Technology Type" rules={[{ required: true, message:'please select technology Type' }]} style={{ display: 'inline-list-item' }}>
                <Select
                    placeholder="Select a option and change input text above"
                    onChange={(e) => { technologyTypeHandleChange(e) }}
                    defaultValue={technologyType}>
                    <Option value="frontend">Front End</Option>
                    <Option value="backend">Back End</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label='Technology Name'
                name='technologyName'
                rules={[
                    {
                        pattern: /[a-zA-Z]/,
                        message: 'Please enter a valid Technology Name',
                    },
                    {
                        required: true,
                        message: 'please Type Technology Name'
                    }
                ]}>
                <Input onChange={(e) => { settechnologyName(e.target.value) }}></Input>
            </Form.Item>
            <Form.Item
                label='level'
                name='level'
                rules={[
                    {
                        required: true,
                        message: 'Please Check your level'
                    }
                ]}>
                          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType="submit">Submit</Button>
            </Form.Item>
            </Form>
            </Content>
            </Layout>
            </Layout>
        </div>
    )

}

export default AddTechnology

