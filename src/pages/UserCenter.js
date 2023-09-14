import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Avatar, Space, Tabs, Statistic, Button } from 'antd';
import { PlusOutlined, MessageFilled } from '@ant-design/icons';
import api from '../http/api';
import { useParams } from 'react-router-dom';
import { store } from '../redux/store';

import MyPosts from './MyPosts';
import url from '../http/url';



function UserCenter() {

  const { id } = useParams()
  const [userInfo, setUserInfo] = useState({})
  const [followsCount, setFollowsCount] = useState(0)
  const [followersCount, setFollowersCount] = useState(0)

  const countFollows = () => {
    api.getRequest('/follow/count/follower?userId=' + id).then(res => setFollowsCount(res.data))
    api.getRequest('/follow/count/follows?userId=' + id).then(res => setFollowersCount(res.data))
  }

  useEffect(() => {
    api.getRequest('/user/' + id).then(res => {
      setUserInfo(res.data)
      countFollows()
    })
  }, [])

  const items = [
    {
      key: '1',
      label: '动态',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: '文章',
      children: <MyPosts userInfo={userInfo}/>,
    },
    {
      key: '3',
      label: '专栏',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: '想法',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '5',
      label: '收藏',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '6',
      label: '关注',
      children: 'Content of Tab Pane 3',
    },
  ];

  return (
    <Row>
      <Col span={6}></Col>

      <Col span={12} style={{ margin: "10px 0" }}>

        <Card style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex' }}>
            <Avatar src={url.BASE_IMG_URL + userInfo.avatarUrl} shape="square" size={168} />
            <div style={{
              flex: '1 1', overflow: 'hidden', marginLeft: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <Space direction="vertical">
                <div>{userInfo.username}</div>
                <div>info</div>
              </Space>
              <div style={{
                display: 'flex',
                justifyContent: 'end'
              }}>
                {
                  store.getState().userCredential.userId === id ?
                    <Button type="primary" href='/user/edit' ghost>编辑个人资料</Button>
                    :
                    <>
                      <Button type='primary' icon={<PlusOutlined />} >关注</Button>
                      <Button icon={<MessageFilled />} style={{ marginLeft: '16px' }}>发私信</Button>
                    </>

                }

              </div>

            </div>
          </div>
        </Card>

        <Row gutter={8}>
          <Col span={18}>
            <Card>
              <Tabs defaultActiveKey="1" items={items} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Row>
                <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <Statistic title="关注了" value={followsCount} />
                </Col>
                <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <Statistic title="关注者" value={followersCount} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

      </Col>

      <Col span={6}></Col>
    </Row>
  )
}

export default UserCenter
