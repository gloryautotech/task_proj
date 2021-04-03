import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Breadcrumb, Card} from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import { useHistory } from "react-router";
const { Header, Content, Footer } = Layout;
const { Meta } = Card;


function DashBoard1(){
    
	let history = useHistory()
    const[technologyList,setTechnologyList]=useState([])

    useEffect(()=>{
        axios({
            'method':'GET',
            'url':'http://localhost:4000/api/v1/userData/alltechnologylist',
            'headers': {
                'token':localStorage.getItem('accessToken')
            }
        }).then(response=>{
            console.log('response.data',response.data.data)
            setTechnologyList(response.data.data)
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
                    <Title style={{marginRight:1080}}>Frontend</Title>              
                    {
                        technologyList.map(technologyList=><div>{technologyList.technologyType == 'frontend'?<div style={{borderRadius:50}} key={technologyList._id}><Card  style={{ width: 200 ,borderRadius:40, justifyContent:'center', display:'flex', alignItems:'center'}}
                        onClick={()=>history.push({pathname: '/technologylevel',state: {technologyName: technologyList.technologyName}})}>{technologyList.technologyName}</Card></div>:''}</div>)
                    }   
                </div>
                <div className="site-layout-content">
                    <Title style={{marginRight:1080}}>Backend</Title>
                    {
                        technologyList.map(technologyList=><div>{technologyList.technologyType == 'backend'?<div style={{borderRadius:50}} key={technologyList._id}><Card  style={{ width: 200 ,borderRadius:40, justifyContent:'center', display:'flex', alignItems:'center'}}
                        onClick={()=>history.push({pathname: '/technologylevel',state: {technologyName: technologyList.technologyName}})}>{technologyList.technologyName}</Card></div>:''}</div>)
                    }
                </div>
                </Content>
            </Layout>
        </div>
    )

}

export default DashBoard1
