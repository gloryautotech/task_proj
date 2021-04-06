import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, Breadcrumb, Card } from 'antd';
import Title from 'antd/lib/typography/Title';
import styles from './styles/style.module.css';
import { UserOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
const { Meta } = Card;


function PageHeader() {

	return (
		<div>
			<Layout className="layout">
				<Header>
				<UserOutlined style={{color:"#ffffff", fontSize:30}}/>
				</Header>
				<Content style={{ padding: '0 50px' }}>
				</Content>
			</Layout>
		</div>
	);

}

export default PageHeader
