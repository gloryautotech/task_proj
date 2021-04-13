import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Breadcrumb, Card } from 'antd';
import Title from 'antd/lib/typography/Title';
import style from "./styles/style.common.css";
import axios from 'axios';
import { useHistory } from "react-router";
import PageHeader from './pageHeader';
import LeftSideBar from "./leftSideBar";

const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;


function DashBoard2(props) {

    let history = useHistory()
    const [technologyLevel, settechnologyLevel] = useState([])
    const [collapsed, setcollapsed] = useState(false)

    const onCollapse = (collapsed) => {
        setcollapsed(collapsed)
    }
    const toggle = () => {
        setcollapsed(!collapsed)
    }

    useEffect(() => {
        let technologyName = props.location.state.technologyName
        console.log("technology nme", technologyName)
        axios({
            'method': 'get',
            'url': `http://localhost:4000/api/v1/technologylist/viewByTechnologyname/${technologyName}`,
            'headers': {
                'token': localStorage.getItem('accessToken')
            }
        }).then(response => {
            console.log('response.data', response.data.data[0].technologyLevel)
            settechnologyLevel(response.data.data[0].technologyLevel)
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
                            <Title>Level</Title>
                            {
                                technologyLevel.map(technologyLevel => <div className="technology_card" key={technologyLevel._id}><Card style={{ width: 200, borderRadius: 40, justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                                    onClick={() => history.push({ pathname: '/tasklist', state: { technologyListId: technologyLevel._id } })}>{technologyLevel.technologyLevelName}</Card></div>)
                            }
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )

}

export default DashBoard2