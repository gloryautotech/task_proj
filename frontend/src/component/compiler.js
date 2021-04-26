import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, Card, Input, Button, Select, Space } from 'antd';
import 'antd/dist/antd.css';
import { CodeOutlined, UserOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';
import { Col, Row,Radio } from 'antd';
import axios from 'axios';

const { TextArea } = Input
const { Header, Content, Footer } = Layout;
const { Option } = Select;

function Compiler() {
    const [input, setInput] = useState()
    const [output, setOutput] = useState()
    const [languageid, setLanguageId] = useState();
    const [userinput, setUserInput] = useState('')
    const [value,setValue]=useState(false)

    const handleInput = (e) => {
        console.log('Input', e.target.value)
        setInput(e.target.value)
    }

    const handleLanguage = (value) => {

        console.log(`Language ${value}`)
        setLanguageId(value)

    }
    const handleRadio=(e)=>{
        console.log('Radio checked',e.target.value)
        setValue(e.target.value)
    }

    const handleUserInput = (e) => {
        console.log('user input',e.target.value)
        setUserInput(e.target.value)
    
        
    }
    const handleRun=()=>{
        console.log("input",input)
        console.log("userinput",userinput)
        console.log("value",value)
        console.log("languageid",languageid)
        axios({
            'method':'post',
            'url':'http://localhost:4000/api/v1/compiler/compilercode',
            'data':{
                code : input,
                input: userinput,
                inputRadio: value,
                lang:languageid
            },
            'headers': {
                'token': localStorage.getItem('accessToken')
            },
        })
        .then(function(res){
            console.log('res',res)
            setInput(null)
            setLanguageId(null)
            setUserInput(null)
            setValue(false)
        })
        .catch(function(error){
            console.log(error)
        })
    }
    

    return (
        <>
            <Layout className="layout" style={{ minHeight: '100vh' }}>
                <Content style={{ padding: 20 }}>
                    <div className='site-card-wrapper'>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card style={{ width: 650 }}>

                                <CodeOutlined style={{ fontSize: 20 }} /> Code Here
                                <TextArea data-gramm='false' style={{ height: '50vh' }} rows={6} onChange={(e) => handleInput(e)}></TextArea>
                                    <Button onClick={e=>handleRun()} danger style={{ marginTop: 20 }} type='primary' >Run</Button>
                                    <Select
                                        placeholder='Language'
                                        style={{ marginLeft: 20, width: 200 }}
                                        onChange={e=>handleLanguage(e)}
                                    >
                                        <Option value='C'>C</Option>
                                        <Option value='C++'>C++</Option>
                                       
                                        <Option value='Python'>Python</Option>


                                    </Select>


                                    <Radio.Group value={value} onChange={handleRadio} style={{marginLeft:20}}>
                                        <Radio value={true}>True</Radio>
                                        <Radio value={false}>False</Radio>
                                    </Radio.Group>
                                    <br />
                                    <UserOutlined style={{ marginTop: 20 }} /> User Input
                                    <TextArea data-gramm='false' onChange={(e)=>handleUserInput(e)} rows={2}></TextArea>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card style={{ width: 600,marginLeft:250 }}>
                                    <ExclamationCircleTwoTone /> Output
                                    <TextArea data-gramm='false' rows={10}></TextArea>
                                </Card>
                            </Col>



                        </Row>
                    </div>



                </Content>
            </Layout>


        </>

    )


}


export default Compiler;