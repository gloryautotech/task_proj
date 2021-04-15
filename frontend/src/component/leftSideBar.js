import React from 'react';
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import { HomeOutlined, PlusCircleOutlined } from '@ant-design/icons';

function LeftSideBar(props) {

	return (
    <Menu theme="dark" defaultSelectedKeys={[props.currentkey]} mode="inline">
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
