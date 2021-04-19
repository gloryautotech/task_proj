import React, { useState, useEffect } from "react";
import { Form, Button, Input, Divider, Layout, Alert, Select, Card } from "antd";
import DynamicField from "./dynamicField";
import axios from 'axios';
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
import "antd/dist/antd.css";

const { Option } = Select;
const { Header, Sider, Content } = Layout;

const defaultFormItemLayout = {
    labelCol: {
        xs: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 12 }
    }
};



function QuestionPaper() {
    const [collapsed, setcollapsed] = useState(false)
    const [questionList, setquestionList] = useState([])

    const [form] = Form.useForm();


    useEffect(() => {
        console.log("question id",sessionStorage.getItem("Question_id"))
        axios({
            'method': 'get',
            'url': `http://localhost:4000/api/v1/assignquestionbank/viewquestionbankbyid/${sessionStorage.getItem("Question_id")}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        })
            .then(function (res) {
                console.log("res of assign question paper list", res.data.data)
                setquestionList(res.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });

        }, [])

    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
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
                        <div>
                            <Card
                                style={{
                                    borderRadius: 40,
                                    justifyContent: 'center',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {
                                    questionList.map(questionList => <div className="technology_card" key={questionList._id}>
                                        <Card style={{ borderRadius: 20, justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                                        >{questionList.questionBankQuestion}{questionList.questionBankOption?<div><li>{questionList.questionOption}</li> </div>:<Input/>}</Card></div>)
                                }
                                <div>
                                    <Button style={{ marginTop: 50 }}>Submit</Button>
                                    </div> 
                                     </Card>
                                     </div>
                </Content>
            </Layout>
        </Layout >
    </div >
    );
}

export default QuestionPaper