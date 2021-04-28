
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Layout } from 'antd';
import styles from './styles/style.module.css';
import { useHistory } from "react-router";
import moment from 'moment';
import axios from 'axios';
import { useForm } from 'antd/lib/form/Form';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
const { Header, Sider, Content } = Layout;
const { Option } = Select;

function SignUp() {

    let history = useHistory()

    const [startDate, setstartDate] = useState('')
    const [endDate, setendDate] = useState('')
    const [email, setemail] = useState('')
    const [endDateMin, setendDateMin] = useState('')
    const [description, setdescription] = useState('')
    const [collapsed, setcollapsed] = useState(false)
    const [form] = useForm();

    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }

    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    const disabledDate = (current) => {
        // Can not select days before today and today
        
        return current && current.valueOf() < Date.now()-1;
    }



    const disabledDateEnd = (current) => {
        // Can not select days before today and today
       // console.log("Date",current)
        //current=startDate.split(' ').[0]
        return current && current.valueOf() < endDateMin;
    }

    const disabledDateTimeEnd = () => {
        console.log("Hourse",startDate)
        console.log("minutes",startDate)
        console.log("Second",startDate)
        return {
            disabledHours: () => range(0, 24).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }
    const selectedDate = (e) => {
        console.log("date", e)
    }
    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            console.log("Not login")
            history.push("/")
        }
    }, [])

    const submit = () => {
        console.log("req.body.startDate", startDate)
        console.log("req.body.endDate", endDate)
        console.log("req.body.email", email)
        console.log("req.body.description", description)

        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/facetoface/createmeetinglink',
            'data': {
                startDate,
                endDate,
                email,
                description
            },
            'headers': {
                'token': localStorage.getItem('accessToken')
            },
        })
            .then(function (res) {

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 20,
            },
            sm: {
                span: 6,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 20,
            },
        },
    };

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
                        <div style={{ padding: 20 }}>

                            <Form {...formItemLayout} form={form} onFinish={e=>submit()} name="googleMeet" style={{ width: 400 }} scrollToFirstError>
                                <Form.Item
                        label='User Email'
                        name='useremail'
                        rules={[
                            {
                                type: "email",
                                message: 'Please Enter a Valid Email'
                            },
                            {
                                required: true,
                                message: 'Please enter your Email'
                            }
                        ]}>
                        <Input
                            style={{ width: 270, borderRadius: 10, borderWidth: 2, borderColor: "#191919" }}
                            onChange={(e) => { setemail(e.target.value) }}></Input>
                    </Form.Item>
                    <Form.Item
                        label='Description'
                        name='description'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Description'
                            }
                        ]}>
                        <Input
                            style={{ width: 270, borderRadius: 10, borderWidth: 2, borderColor: "#191919" }}
                            onChange={(e) => { setdescription(e.target.value) }}></Input>
                    </Form.Item>
                                <DatePicker
                                   // format="YYYY-MM-DD HH:mm:ss"
                                    disabledDate={disabledDate}
                                    onChange={(date, dateString) => { setstartDate(dateString); setendDateMin(date) }}
                                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                />
                                <DatePicker
                                    format="YYYY-MM-DD HH:mm:ss"
                                    disabledDate={disabledDateEnd}
                                   // disabledTime={disabledDateTimeEnd}
                                    onChange={(date, dateString) => { setendDate(dateString) }}
                                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                />
                                <Form.Item {...formItemLayout} style={{ marginLeft: 300 }}>
                                    <Button type='primary' htmlType="submit" className={styles.submit} >Submit</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div >
    )

}

export default SignUp

