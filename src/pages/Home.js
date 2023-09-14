import React from 'react'
import { Col, Row, Card } from 'antd';

import ArticleList from './ArticleList';
import CreativeCenterCard from './CreativeCenterCard';
import MyopsCard from './MyopsCard';


function Home() {
  return (
    <Row>
      <Col span={6}></Col>

      <Col span={12} style={{ margin: "10px 0" }}>

        <Row gutter={8}>
          <Col span={18}>
            <Card>
              <ArticleList />
            </Card>
          </Col>
          <Col span={6}>
            <CreativeCenterCard />
            <MyopsCard/>
          </Col>
        </Row>

      </Col>

      <Col span={6}></Col>
    </Row>
  )
}

export default Home
