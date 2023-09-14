import React from 'react'
import { Card, Avatar, Button, Space, App } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

import './creativeCenterCard.css'
import api from '../http/api';

function CreativeCenterCard() {


  return (
    <Card
      title={<div><EditOutlined />创作中心</div>}
      extra={'草稿箱(' + 1 + ')'}>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '12px'
      }}>

        <Space direction="vertical" onClick={() => {
          api.getRequest('/public/allpost').then(res => {
            console.log(res)
          })
        }}>
          <Avatar
            size={40}
            style={{
              backgroundColor: '#87d068',
            }}
            icon={<EditOutlined />}
          />
          写文章
        </Space>
        <Space direction="vertical">
          <Avatar
            size={40}
            style={{
              backgroundColor: '#87d068',
            }}
            icon={<EditOutlined />}
          />
          写文章
        </Space>
        <Space direction="vertical">
          <Avatar
            size={40}
            style={{
              backgroundColor: '#87d068',
            }}
            icon={<EditOutlined />}
          />
          写文章
        </Space>
        <Space direction="vertical">
          <Avatar
            size={40}
            style={{
              backgroundColor: '#87d068',
            }}
            icon={<EditOutlined />}
          />
          写文章
        </Space>

      </div>



      <Button block size='large' icon={<PlusOutlined />} href='/article/write' target='_blank'>开始创作</Button>
    </Card>
  )
}

export default CreativeCenterCard
