import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Breadcrumb, Card } from 'antd';
import Title from 'antd/lib/typography/Title';
import styles from './styles/style.module.css';
import styles1 from "./styles/style.header.css";
import { UserOutlined } from "@ant-design/icons";
import LeftSideBar from "./leftSideBar";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;


function PageHeader() {

	return (
		<div>
			
				<Header>
				<UserOutlined className="user_icon"/>
				</Header>
				{/* <LeftSideBar className="header_menu"/> */}
				<Content style={{ padding: '0 50px' }}>
				</Content>
			
		</div>
	);

}

export default PageHeader
