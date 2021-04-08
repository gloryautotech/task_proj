import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { useHistory } from "react-router";
import { Menu, Button } from 'antd';

import { HomeOutlined, PartitionOutlined, PlusCircleOutlined } from '@ant-design/icons';
import SignUp from './signUp';

const { SubMenu } = Menu;

function LeftSideBar() {
  let history = useHistory()
    const [collapsed, setcollapsed] = useState(false)
  const [isAddUser, setisAddUser] = useState(false)
    const toggleCollapsed = () => {
        setcollapsed(!collapsed)
    }
    const addUser = () =>{
     setisAddUser(true)
    }
	return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
    <Menu.Item key="1">
      <HomeOutlined />
      <span>Home</span>
      <Link to="/technologylist" />
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
  </Menu>
	);

}

export default LeftSideBar
