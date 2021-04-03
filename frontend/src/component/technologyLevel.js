import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Breadcrumb, Card} from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import { useHistory } from "react-router";
const { Header, Content, Footer } = Layout;
const { Meta } = Card;


function DashBoard2(props){
    
	let history = useHistory()
    const[technologyLevel,settechnologyLevel]=useState([])

    useEffect(()=>{
        let technologyName = props.location.state.technologyName
        console.log("technology nme",technologyName)
        axios({
            'method': 'POST',
            'url': 'http://localhost:4000/api/v1/userData/viewByTechnologyName',
            'data': {technologyName:technologyName} ,
            'headers': {
                'token':localStorage.getItem('accessToken')
            }
        }).then(response=>{
            console.log('response.data',response.data.data[0].technologyLevel)
            settechnologyLevel(response.data.data[0].technologyLevel)
        })
    },[])

    return(
        <div>
           <Layout className="layout">
                <Header>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>DashBoard2</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <Title style={{marginRight:1080}}>Level</Title>              
                    {
                        technologyLevel.map(technologyLevel=><div style={{borderRadius:50}} key={technologyLevel._id}><Card  style={{ width: 200 ,borderRadius:40, justifyContent:'center', display:'flex', alignItems:'center'}}
                        onClick={()=>history.push({pathname: '/tasklist',state: {technologyListId: technologyLevel._id}})}>{technologyLevel.technologyLevelName}</Card></div>)
                    }   
                </div>
                </Content>
            </Layout>
        </div>
    )

}

export default DashBoard2
