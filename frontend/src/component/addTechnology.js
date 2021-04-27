
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Checkbox, Divider, Alert, Layout, Row, Col, Card, Image } from 'antd';
import axios from 'axios';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import { useForm } from 'antd/lib/form/Form';
import { useHistory } from "react-router";
const { Header, Sider, Content } = Layout;
const { Option } = Select;

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Basic',
    'Intermediate',
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


    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            console.log("Not login")
            history.push("/")
        } else {
            let userId
            function parseJwt(token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                userId = JSON.parse(jsonPayload).userId
            };
            parseJwt(localStorage.getItem('accessToken'))
            axios({
                'method': 'get',
                'url': `http://localhost:4000/api/v1/userdata/viewuserlist/${userId}`,
                'headers': {
                    'token': localStorage.getItem('accessToken')
                },
            }).then(response => {
                console.log('response.data', response.data.data)
                if (response.data.data.userType != 'admin') {
                    history.push('/home')
                }
            }).catch(err => {
                console.log("error", err)
            })
        }
    }, [])
    const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setissubmit(false)
    }, 8000)

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
        var levels = []
        checkedList.forEach(element => {
            levels.push({ 'level': element })
        });
        console.log("level", levels)
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/technologylist/createtechnologylist',
            'data': {
                technologyType: technologyType,
                technologyName: technologyName,
                technologyLevel: levels
            },
            'headers': {
                'token': localStorage.getItem('accessToken')
            },
        })
            .then(function (res) {
                settechnologyName()
                settechnologyType()
                setCheckedList()
                setissubmit(true)
                timeId()
                console.log("res of add technology", res)
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
                        {issubmit ?
                            <div style={{ width: 212, position: "absolute", right: 0, zIndex: 9999 }}>
                                <Alert message="Success Text" type="success" />
                            </div> : ''}

                        <Row justify="center" align="middle" style={{ minHeight: '80vh' }} >
                            <Col>
                                <Card style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: 20, width: 800, }}>
                                    <Form form={form} name="addtechnology" onFinish={submit} style={{ width: 400, }} scrollToFirstError>
                                        <Image style={{ marginLeft: 450 }} width={300} src='https://i.pinimg.com/564x/8c/22/2c/8c222c3f4bc0a92105d90564f0abac4b.jpg' preview={false}></Image>
                                        <Form.Item
                                            name="technoloyType"
                                            style={{ marginTop: -300 }}
                                            rules={[
                                                {
                                                    required: true, message: 'please select technology Type'
                                                }]}
                                        >
                                            <Select
                                                placeholder="Technology Type"
                                                style={{ borderRadius: '36px' }}
                                                onChange={(e) => { technologyTypeHandleChange(e) }}>
                                                <Option value="frontend">Front End</Option>
                                                <Option value="backend">Back End</Option>
                                            </Select>

                                        </Form.Item>


                                        <Form.Item

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
                                            <Input defaultValue={technologyName} onChange={(e) => { settechnologyName(e.target.value) }} placeholder={"Enter Technology Name"}></Input>
                                        </Form.Item>

                                        <Form.Item
                                            label='Level'
                                            name='level'
                                            style={{ marginLeft: 120 }}
                                            rules={[
                                                {

                                                    message: 'Please Check your level'
                                                }
                                            ]}>
                                            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                                Check all
                                            </Checkbox>
                                        </Form.Item>
                                        <Divider />
                                        <Form.Item style={{ marginLeft: 60 }}>
                                            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button style={{ marginLeft: 150 }} type='primary' htmlType="submit">Submit</Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>

                    </Content>
                </Layout>
            </Layout>
        </div>
    )

}

export default AddTechnology

