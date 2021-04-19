import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import axios from 'axios';
import { HomeOutlined, PlusCircleOutlined } from '@ant-design/icons';

function LeftSideBar(props) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSubAdmin, setisSubAdmin] = useState(false)
  useEffect(() => {
    axios({
      'method': 'get',
      'url': (`http://localhost:4000/api/v1/userdata/viewuserlist/${sessionStorage.getItem("user_id")}`)
    }).then(response => {
      console.log('Header Data ', response.data.data)
      if (response.data.data.userType == 'admin') {
        setIsAdmin(true)
        setisSubAdmin(false)
      } else if(response.data.data.userType == 'sub-admin') {
        setisSubAdmin(true)
        setIsAdmin(false)
      }else{
        setisSubAdmin(false)
        setIsAdmin(false)
      }

    }).catch(err => {
      console.log("error", err)
    })
  }, [])

  return (
    <div>
      {isAdmin ?
        <Menu theme="dark" defaultSelectedKeys={[props.currentkey]} mode="inline">
          <Menu.Item key="1">
            <HomeOutlined />
            <span>Home</span>
            <Link to="/round" />
          </Menu.Item>
          <Menu.Item key="2">
            <PlusCircleOutlined />
            <span>Add Technology</span>
            <Link to="/addtechnology" />
          </Menu.Item>
          <Menu.Item key="3">
            <PlusCircleOutlined />
            <span>Add Task</span>
            <Link to="/addtask" />
          </Menu.Item>
          <Menu.Item key="4">
            <PlusCircleOutlined />
            <span>Assign Task</span>
            <Link to="/assigntask" />
          </Menu.Item>
          <Menu.Item key="5">
            <PlusCircleOutlined />
            <span>Add Question</span>
            <Link to="/addquestionbank" />
          </Menu.Item>
        </Menu>
        :<div>{isSubAdmin?
        <Menu theme="dark" defaultSelectedKeys={[props.currentkey]} mode="inline">
          <Menu.Item key="1">
            <HomeOutlined />
            <span>Home</span>
            <Link to="/round" />
          </Menu.Item>
          <Menu.Item key="4">
            <PlusCircleOutlined />
            <span>Assign Task</span>
            <Link to="/assigntask" />
          </Menu.Item>
        </Menu>
        :
        <Menu theme="dark" defaultSelectedKeys={[props.currentkey]} mode="inline">
        <Menu.Item key="1">
          <HomeOutlined />
          <span>Home</span>
          <Link to="/questionpaper" />
        </Menu.Item>
      </Menu>
        }</div>
      }
    </div>
  );

}

export default LeftSideBar
