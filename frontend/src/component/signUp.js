
import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, DatePicker, Select } from 'antd';
import styles from './styles/style.module.css';
import { useHistory } from "react-router";
import moment from 'moment';
import axios from 'axios';
import { useForm } from 'antd/lib/form/Form';
const { Option } = Select;

function SignUp() {

    let history = useHistory()

    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [password, setpassword] = useState('')
    const [gender, setgender] = useState('')
    const [dateofBirth, setdateofBirth] = useState('')
    const [organizationName, setorganizationName] = useState('')
    const [error, setError] = useState({
        error: '',
        success: ''
    });
    const [form] = useForm();

    const genderHandleChange = (value) => {
        console.log('Gender', value)
        setgender(value)
    }

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            console.log("already login")
            history.push("/technologylist")
        }
    }, [])

    const submit = () => {
        console.log("userFirstName", `${firstName}`)
        console.log("userLastName", `${lastName}`)
        console.log("email", `${email}`)
        console.log("phone", `${phone}`)
        console.log("password", `${password}`)
        console.log("gender", `${gender}`)
        console.log("dateOfBirth", `${dateofBirth}`)
        console.log("organizationName", `${organizationName}`)
        axios
            .post('http://localhost:4000/api/v1/userData/createuserlist', {
                userFirstName: `${firstName}`,
                userLastName: `${lastName}`,
                email: `${email}`,
                phone: `${phone}`,
                password: `${password}`,
                gender: `${gender}`,
                dateOfBirth: `${dateofBirth}`,
                organizationName: `${organizationName}`
            })
            .then(function (res) {
                console.log("accessToken", res.data.data);
                localStorage.setItem("accessToken", res.data.data.accessToken.accessToken)
                if (res.data.data.result._id) {
                    sessionStorage.setItem("user_id", res.data.data.result._id)
                }
                history.push('/technologylist')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const formItemLayout ={
        labelCol:{
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
        <div className={styles}>
            <div className={styles.background}>
                <div style={{backgroundColor: "#ffffff",borderRadius: 20,}}>
                    <div className={styles.heading}>Glory Autotech</div>
                    <div className={styles.error}>{error.error}</div>
                    <div className={styles.success}>{error.success}</div>
                    <div style={{padding: 20}}>
                        
                            <Form {...formItemLayout} form={form} name="signUp" onFinish={submit} style={{width:400}} scrollToFirstError>
                        <Form.Item
                            label='First Name'
                            name='firstName'
                            rules={[
                                {
                                    pattern: /[a-zA-Z]/,
                                    message: 'Please enter a valid Last Name',
                                },
                                {
                                    required: true,
                                    message: 'Please enter your First Name'
                                }
                            ]}>
                            <Input onChange={(e) => { setfirstName(e.target.value) }}></Input>
                        </Form.Item>
                        <Form.Item
                            label='Last Name'
                            name='lastName'
                            rules={[
                                {
                                    pattern: /[a-zA-Z]/,
                                    message: 'Please enter a valid Last Name',
                                },
                                {
                                    required: true,
                                    message: 'Please enter your Last Name'
                                }
                            ]}>
                            <Input onChange={(e) => { setlastName(e.target.value) }}></Input>
                        </Form.Item>
                       
                        <Form.Item
                            label='Email'
                            name='email'
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
                            <Input onChange={(e) => { setemail(e.target.value) }}></Input>
                        </Form.Item>
                        <Form.Item
                            label='Phone'
                            name='phone'
                            rules={[
                                {
                                    type:'number',
                                    message: 'Please Enter only Number'
                                },
                                {
                                    required: true,
                                    message: 'Please enter your Phone'
                                }
                            ]}>
                            <Input onChange={(e) => { setphone(e.target.value) }}></Input>
                        </Form.Item>
                        <Form.Item
                            label='Password'
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Password'
                                }
                            ]}
                            hasFeedback
                            >
                            <Input.Password onChange={(e) => { setpassword(e.target.value) }}></Input.Password>
                        </Form.Item>
                        <Form.Item name="gender" label="Gender" rules={[{ required: true }]} style={{ display: 'inline-list-item' }}>
                            <Select
                                placeholder="Select a option and change input text above"
                                onChange={(e) => { genderHandleChange(e) }}
                                defaultValue={gender}>
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                                <Option value="other">other</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="dateOfBirth" label="Date Of Birth">
                            <DatePicker
                                defaultValue={moment(Date.now())}
                                disabledDate={disabledDate}
                                format={'YYYY/MM/DD'}
                                onChange={(date, dateString) => { setdateofBirth(dateString) }} />
                        </Form.Item>
                        <Form.Item
                            label='Organization'
                            name='organizationName'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Organization Name'
                                }
                            ]}>
                            <Input onChange={(e) => { setorganizationName(e.target.value) }}></Input>
                        </Form.Item>
                        <Form.Item {...formItemLayout} style={{marginLeft:300}}>
                            <Button type='primary' htmlType="submit">Submit</Button>
                        </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SignUp

