import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Breadcrumb, Card} from 'antd';
import Title from 'antd/lib/typography/Title';
import style from "./styles/style.common.css";
import axios from 'axios';
import { useHistory } from "react-router";
import pageHeader from "./pageHeader";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

function DashBoard1(){
    
	let history = useHistory()
    const[assignTasklist,setassignTasklist]=useState([])

    useEffect(()=>{
        console.log("user_id",sessionStorage.getItem("user_id"))
        axios({
            'method':'GET',
            'url':`http://localhost:4000/api/v1/assigntask/viewbyuserid/${sessionStorage.getItem("user_id")}`,
            'headers': {
                'token':localStorage.getItem('accessToken')
            }
        }).then(response=>{
            console.log('response.data',response.data.data)
            setassignTasklist(response.data.data)
        })
    },[])

    return(
        <div>
           <Layout className="layout">
                <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <Title >Assign Task</Title>              
                    {
                        assignTasklist.map(assignTasklist=><div className="technology_card" style={{borderRadius:50}} key={assignTasklist._id}><Card  style={{ width: 200 ,borderRadius:10, justifyContent:'center', display:'flex', alignItems:'center'}}
                        ><div><div>Assign Task:</div>{assignTasklist.emailIdOfReceiver}<div><span>Task Status: </span>{assignTasklist.assignTaskStatus}</div><div><span>Your Status: </span>{assignTasklist.assignTaskVerifiedStatus}</div></div></Card></div>)
                    }   
                </div>
                </Content>
            </Layout>
        </div>
    )

}

export default DashBoard1
