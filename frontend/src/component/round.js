import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Spin } from 'antd';
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
                            <div className="technology_card">
                                <div style={{ borderRadius: 50 }}>
                                    <Card
                                        style={{
                                            width: 200,
                                            borderRadius: 40,
                                            justifyContent: 'center',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        onClick={() => history.push('/assignquestionbank')}>
                                        Question Bank</Card>
                                </div>
                                <div style={{ borderRadius: 50 }}>
                                    <Card
                                        style={{
                                            width: 200,
                                            borderRadius: 40,
                                            justifyContent: 'center',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        onClick={() => history.push('/technologylist')}>
                                        Coding</Card>
                                </div>
                                <div style={{ borderRadius: 50 }}>
                                    <Card
                                        style={{
                                            width: 200,
                                            borderRadius: 40,
                                            justifyContent: 'center',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        onClick={() => history.push('/technologylist')}>
                                        Face-to-Face</Card>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )

}

export default Round
