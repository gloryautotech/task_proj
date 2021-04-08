
import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, DatePicker, Select, Checkbox, Divider, Alert } from 'antd';
import { useHistory } from "react-router";
import moment from 'moment';
import axios from 'axios';
const { Option } = Select;

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Basic', 
'intermediate', 
'Advance'];
const defaultCheckedList = ['Basic'];

function AddTechnology() {

    let history = useHistory()

    const [technologyType, settechnologyType] = useState('')
    const [technologyName, settechnologyName] = useState('')
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const [issubmit, setissubmit] = useState(false)

    
    const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setissubmit(false)
      }, 3000)

    const technologyTypeHandleChange = (value) => {
        console.log('Type', value)
        settechnologyType(value)
    }

    const onChange = list => {
 
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
      };
    
      const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
      };

    const submit = () => {
        console.log("usertechnologyType", `${technologyType}`)
        console.log("usertechnologyName", `${technologyName}`)
        var levels=[]
        checkedList.forEach(element => {
            levels.push({'level': element})
        });
        console.log("level",levels)
        axios({
            'method': 'post',
            'url': 'http://localhost:4000/api/v1/technologylist/createtechnologylist',
            'data': {
                technologyType:technologyType,
                technologyName: technologyName,
                technologyLevel: levels
            } ,
            'headers': {
                'token':localStorage.getItem('accessToken')
            },
        })
            .then(function (res) {
                settechnologyName('')
                settechnologyType('')
                setCheckedList(defaultCheckedList)
                setissubmit(true)
                timeId()
                console.log("res of add technology",res)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            {issubmit?
                       <div style={{width:212,position:"absolute",right:0,zIndex:9999}}> 
           <Alert message="Success Text" type="success" />
           </div>:''}
            <Form.Item name="technoloyType" label="Technology Type" rules={[{ required: true }]} style={{ display: 'inline-list-item' }}>
                <Select
                    placeholder="Select a option and change input text above"
                    onChange={(e) => { technologyTypeHandleChange(e) }}
                    defaultValue={technologyType}>
                    <Option value="frontend">Front End</Option>
                    <Option value="backend">Back End</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label='Technology Name'
                name='technologyName'
                rules={[
                    {
                        required: true,
                        message: 'Please enter your Last Name'
                    }
                ]}>
                <Input onChange={(e) => { settechnologyName(e.target.value) }}></Input>
            </Form.Item>
            <Form.Item
                label='level'
                name='level'
                rules={[
                    {
                        required: true,
                        message: 'Please enter your level'
                    }
                ]}>
                          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
            </Form.Item>
            <Form.Item>
                <Button type='primary' onClick={submit}>Submit</Button>
            </Form.Item>
        </div>
    )

}

export default AddTechnology

