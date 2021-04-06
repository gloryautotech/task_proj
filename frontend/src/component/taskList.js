import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Breadcrumb, Card, Button, Input} from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import { useHistory } from "react-router";
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { TextArea } = Input;

function DashBoard3(props){
    
	let history = useHistory()
    const[taskList,settaskList]=useState([])
    const[expanded,setExpanded]=useState(false)
    const[single,setSingle]=useState()
    const [email, setemail] = useState('')

    useEffect(()=>{
        
        console.log("technology id id ",window.name)
        let technologyListId = props.location.state.technologyListId
        console.log("technology nme",technologyListId)
         axios({
            'method': 'get',
            'url': `http://localhost:4000/api/v1/tasklist/viewbytechnologylistid/${technologyListId}`,
            'headers': {
                'token':localStorage.getItem('accessToken')
            },
        }).then(response=>{
            console.log('response.data',response.data.data)
            settaskList(response.data.data)
        }).catch(err=>{
            console.log("error",err)
        })
    },[])

    const handleIndividual=async(id)=>{
        console.log('Id',id)
        setSingle(id)
    }
const sendTask = (id) =>{
    setExpanded(false)
    //let urlPathOfTask='http://localhost:4000/api/v1/userData/viewbytaskId/'
    let urlOfGivenTask='http://localhost:3000/giventask/'
    axios({
        'method': 'post',
        'url': 'http://localhost:4000/api/v1/email',
        'data': {emailid:email,subject:'Your Task is',text:'Open this link to get your task    '+urlOfGivenTask+'   or your id is '+id} ,
        'headers': {
            'token':localStorage.getItem('accessToken')
        },
    }).then(response=>{
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/assigntask/createassigntasklist',
            'data': {
                userId: window.name,
                emailIdOfReceiver: email,
                assignTaskId: id,
                assignTaskStatus: 'Receive',
                assignTaskVerifiedStatus: 'send'
            } ,
            'headers': {
                'token':localStorage.getItem('accessToken')
            },
        })
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
                {taskList?(
                   taskList.map((taskList)=>(
                       <div  style={{blockSize:250}}>
                       
                       <Card style={{borderRadius:20, backgroundColor:'#efefef',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'}} >
        
                          <div style={{float:'left'}}>{taskList.taskName}</div>
                          <Space style={{float:'right'}}> 
                           <Button style={{borderRadius:50}} onClick={()=>{setExpanded(true);handleIndividual(taskList._id)}}> Know more</Button>

                           <Button style={{borderRadius:50}} onClick={()=>{setExpanded(false)}}>Close</Button>
                           </Space>
                            <div style={{float:'left'}}>
                           {
                              
                               expanded?taskList._id==single?<li>{taskList.tasDescription}
                               
                               <Input onChange={(e) => { setemail(e.target.value) }}></Input>
                               <Space>
                               <Button onClick={()=>{sendTask(taskList._id)}}>Submit</Button>
                               </Space>
                               
                               </li>:'':''
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

export default DashBoard3
