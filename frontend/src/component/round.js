import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Spin,Space } from 'antd';
import {  Col, Row,Image } from 'antd';
import Title from 'antd/lib/typography/Title';
import style from "./styles/style.common.css";
import axios from 'axios';
import { useHistory } from "react-router";
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
const { Header, Sider, Content } = Layout;

function Round() {

    let history = useHistory()
    const [collapsed, setcollapsed] = useState(false)

    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }


    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            console.log("Not login")
            history.push("/")
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
                            <Title >Round</Title> 
                            <div className="technology_card" >
                            
                            <Row gutter={16} >
                                <Col gutter={8}>
                                <div style={{ borderRadius: 50 }}>
                                    
                                    <Card
                                        style={{
                                            width: 200,
                                            height:150,
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        hoverable
                                        onClick={() => history.push('/assignquestionbank')}>
                                        Question Bank</Card>
                                </div>
                                </Col>
                                <Col gutter={8}>
                                <div style={{ borderRadius: 50 }}>
                                    <Card
                                        style={{
                                            width: 200,
                                            height:150,
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        hoverable
                                        onClick={() => history.push('/technologylist')}>
                                        Coding</Card>
                                </div>
                                </Col>
                                <Col gutter={8}>
                                <div style={{ borderRadius: 50 }}>
                                    <Card
                                        style={{
                                            width: 200,
                                            height:150,
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        hoverable
                                        onClick={() => history.push('/facetoface')}>
                                        Face-to-Face</Card>
                                </div>
                                </Col>
                            </Row>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )

}

export default Round
