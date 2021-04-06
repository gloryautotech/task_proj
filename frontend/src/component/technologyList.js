import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Breadcrumb, Card} from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import { useHistory } from "react-router";
import pageHeader from "./pageHeader";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

function DashBoard1(){
    
	let history = useHistory()
    const[technologyList,setTechnologyList]=useState([])

    useEffect(()=>{
        console.log("window.name",window.name)
        axios({
            'method':'GET',
            'url':'http://localhost:4000/api/v1/technologylist/alltechnologylist',
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
            <pageHeader />
           <Layout className="layout">
                <Content style={{ padding: '0 50px' }}>
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
