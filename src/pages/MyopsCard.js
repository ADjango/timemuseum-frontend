import React from 'react'
import { Card, List } from 'antd';

function MyopsCard() {
  return (
    <Card style={{ marginTop: '12px' }}>
      <List>
        <a>
          <List.Item>我的收藏</List.Item>
        </a>
        <a>
          <List.Item>我的关注</List.Item>
        </a>

      </List>
    </Card>
  )
}

export default MyopsCard
