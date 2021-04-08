import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { useHistory } from "react-router";
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
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
        <div style={{ width: "100%" }} >
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Add Technology
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Add Task
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />} onClick={addUser}>
            Add User
            <Link to="/signup" />
          </Menu.Item>
        </Menu>
        {isAddUser?<SignUp/>:''}
      </div>
	);

}

export default LeftSideBar
