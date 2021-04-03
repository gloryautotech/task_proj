import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Breadcrumb, Card, Button, Input} from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import { useHistory } from "react-router";
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { TextArea } = Input;

function GivenTask(props){
    
	let history = useHistory()
    const[singleTask,setsingleTask]=useState([])
    const [email, setemail] = useState('')

    useEffect(()=>{
        console.log("technology nme",props)
        let taskId = props.location.state.taskId
        console.log("technology nme",taskId)
         axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/userData/viewbytaskId',
            'data': {taskId:taskId} ,
        }).then(response=>{
            console.log('response.data',response.data.data)
            setsingleTask(response.data.data)
        }).catch(err=>{
            console.log("error",err)
        })
    },[])

const sendTask = (id) =>{
    axios({
        'method': 'post',
        'url': 'http://localhost:4000/api/v1/userData/email',
        'data': {emailid:email,subject:'Your Task is',text:'Open this link to get your task'+id} ,
        'headers': {
            'token':localStorage.getItem('accessToken')
        },
    }).then(response=>{
    }).catch(err=>{
        console.log("error",err)
    })
}
    
    return(
        <div>
           <Layout className="layout">
                <Header>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                {singleTask?(
                   singleTask.map((singleTask)=>(
                       <div  style={{blockSize:250}}>
                       
                       <Card style={{borderRadius:20, backgroundColor:'#efefef',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'}} >
        
                          <div style={{float:'left'}}>{singleTask.taskName}</div>

                            <div style={{float:'left'}}>
                           {
                              
                               <li>{singleTask.tasDescription}
                               
                             
                               <Space>
                               <Button onClick={()=>{sendTask(singleTask._id)}}>Submit</Button>
                               </Space>
                               
                               </li>
                           }
                           </div>
                           
                           </Card>
                       </div>
                   ))
                ):<div>No Data Found</div>}
                </Content>
            </Layout>
        </div>
    )

}

export default GivenTask
