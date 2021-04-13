import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Breadcrumb, Card } from 'antd';
import Title from 'antd/lib/typography/Title';
import style from "./styles/style.common.css";
import axios from 'axios';
import { useHistory } from "react-router";
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";
const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;

function DashBoard1() {

    let history = useHistory()
    const [technologyList, setTechnologyList] = useState([])
    const [collapsed, setcollapsed] = useState(false)

    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }
    const toggle = () => {
        setcollapsed(!collapsed)
    }

    useEffect(() => {
        console.log("user_id", sessionStorage.getItem("user_id"))
        axios({
            'method': 'GET',
            'url': 'http://localhost:4000/api/v1/technologylist/alltechnologylist',
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        }).then(response => {
            console.log('response.data', response.data.data)
            setTechnologyList(response.data.data)
        })
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
                        <LeftSideBar currentkey={'1'}/>
                    </Sider>
                    <Content style={{ padding: 20 }}>
                        <div className="site-layout-content">
                            <Title >Frontend</Title>
                            {
                                technologyList.map(technologyList => <div className="technology_card">{technologyList.technologyType == 'frontend' ? <div style={{ borderRadius: 50 }} key={technologyList._id}><Card style={{ width: 200, borderRadius: 40, justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                                    onClick={() => history.push({ pathname: '/technologylevel', state: { technologyName: technologyList.technologyName } })}>{technologyList.technologyName}</Card></div> : ''}</div>)
                            }
                        </div>
                        <div className="site-layout-content">
                            <Title >Backend</Title>
                            {
                                technologyList.map(technologyList => <div className="technology_card">{technologyList.technologyType == 'backend' ? <div style={{ borderRadius: 50 }} key={technologyList._id}><Card style={{ width: 200, borderRadius: 40, justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                                    onClick={() => history.push({ pathname: '/technologylevel', state: { technologyName: technologyList.technologyName } })}>{technologyList.technologyName}</Card></div> : ''}</div>)
                            }
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )

}

export default DashBoard1