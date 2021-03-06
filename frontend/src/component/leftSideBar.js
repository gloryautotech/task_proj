import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import axios from 'axios';
import { HomeOutlined, PlusCircleOutlined,CarryOutOutlined } from '@ant-design/icons';

function LeftSideBar(props) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSubAdmin, setisSubAdmin] = useState(false)
  const [isUser, setisUser] = useState(false)
  useEffect(() => {
    let userid
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
       userid = JSON.parse(jsonPayload).userId
    };
    parseJwt(localStorage.getItem('accessToken'))
    axios({
      'method': 'get',
      'url': (`http://localhost:4000/api/v1/userdata/viewuserlist/${userid}`)
    }).then(response => {
      console.log('left side bar Data ', response.data.data)
      if (response.data.data.userType == 'admin') {
        setIsAdmin(true)
        setisSubAdmin(false)
        setisUser(false)
      } else if(response.data.data.userType == 'sub-admin') {
        setisSubAdmin(true)
        setIsAdmin(false)
        setisUser(false)
      } else if(response.data.data.userType == 'user') {
        setisSubAdmin(false)
        setIsAdmin(false)
        setisUser(true)
      }
      else{
        setisSubAdmin(false)
        setIsAdmin(false)
        setisUser(false)
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
            <CarryOutOutlined />
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
        :<div>{isUser?
        <Menu theme="dark" defaultSelectedKeys={[props.currentkey]} mode="inline">
        <Menu.Item key="1">
          <HomeOutlined />
          <span>Home</span>
          <Link to="/questionpaper" />
        </Menu.Item>
      </Menu>:<div></div>}</div>
        }</div>
      }
    </div>
  );

}

export default LeftSideBar
