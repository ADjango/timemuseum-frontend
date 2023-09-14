import React, { useEffect, useState } from 'react'
import { Col, Row, Card, List, Avatar, Button, Space, Tag, Segmented, Input, Divider, Spin } from 'antd';
import { PlusOutlined, LikeOutlined, DislikeOutlined, ShareAltOutlined, HeartOutlined, StarFilled, ContainerOutlined, MessageFilled, SmileOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import api from '../http/api';
import { store } from '../redux/store';
import url from '../http/url';

const data = [
  'Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const { TextArea } = Input;

function ArticleDetail() {

  const [postData, setPostData] = useState()
  const [loading, setLoading] = useState(false)
  const [followed, setFollowed] = useState(false)
  const [followerCount, setFollowerCount] = useState(0)
  const [postsCount, setPostsCount] = useState(0)
  const [commentList, setCommentList] = useState([])
  const [comment, setComment] = useState('')

  const { id } = useParams()

  const findByUserId = () => {
    console.log(postData)
    api.postRequest(
      '/follow/findby',
      postData.user
    ).then(res => {
      if (res.data) {
        setFollowed(true)
      }
    })
  }

  const countFollower = () => {
    api.postRequest('/public/follow/count', postData.user).then(res => {
      console.log(res)
      setFollowerCount(res.data)
    })
  }

  const countPostsByUserid = () => {
    api.getRequest('/public/posts/' + postData.user.id).then(res => {
      setPostsCount(res.data)
    })
  }

  const getComments = () => {
    api.getRequest('/public/post/' + id + '/comments').then(res => {
      console.log("comments: ", res)
      setCommentList(res.data)
    })
  }

  const postComment = () => {
    api.postRequest(
      '/comment/newcomment',
      {
        content: comment,
        postId: id
      }
    ).then(res => {
      console.log("comment list from new comment:", res.data)
      setCommentList(res.data)
    })
  }

  useEffect(() => {
    //获取文章详情
    //获取用户详情
    //获取评论列表
    api.getRequest('/public/post/' + id).then(res => {
      setPostData(res.data)
    })
  }, [])

  useEffect(() => {
    console.log("data changed")
    console.log(postData)
    if (postData) {
      if (postData.user.id !== store.getState().userCredential.userId) {
        findByUserId()
        countFollower()
        countPostsByUserid()
      }

      getComments()
    }

  }, [postData])

  const followUser = () => {
    setLoading(true)
    api.postRequest(
      '/followuser',
      postData.user
    ).then(res => {
      console.log(res)
      findByUserId()
      countFollower()
    })
  }

  return (
    <Row>
      <Col span={6}></Col>

      <Col span={12} style={{ margin: "10px 0" }}>

        {
          postData ?
            <Row gutter={8}>

              <Col span={postData.user.id !== store.getState().userCredential.userId ? 18 : 24}>
                <Card>
                  <List>
                    <List.Item key="1">
                      <List.Item.Meta
                        avatar={<Avatar src={url.BASE_IMG_URL + postData.user.avatarUrl} shape="square" size={44} />}
                        title={<a href={"/user/" + postData.user.id}>{postData.user.username}</a>}
                        description={'item.email'}
                      ></List.Item.Meta>
                      {
                        postData.user.id !== store.getState().userCredential.userId ?
                          followed ?
                            <Button>已关注</Button>
                            :
                            <Button loading={loading} type='primary' icon={<PlusOutlined />} onClick={followUser}>关注</Button>
                          :
                          <></>
                      }

                    </List.Item>
                  </List>

                  <div>10 人点赞</div>

                  <h2>{postData.post.title}</h2>

                  <div dangerouslySetInnerHTML={{ __html: postData.post.content }}></div>

                  <div>发布于 {postData.post.createDateTime}・IP 属地海南</div>

                  <Space wrap style={{ marginTop: '16px', marginBottom: '16px' }}>
                    <Tag color="#108ee9">Java开发</Tag>
                    <Tag color="#108ee9">Java开发</Tag>
                  </Space>

                  <div>
                    <Space>
                      <Button type="primary" icon={<LikeOutlined />}>赞同</Button>
                      <Button type="primary" icon={<DislikeOutlined />}></Button>
                      <Button type="text" icon={<ShareAltOutlined />}>分享</Button>
                      <Button type="text" icon={<HeartOutlined />}>喜欢</Button>
                      <Button type="text" icon={<StarFilled />}>收藏</Button>
                      <Button type="text" icon={<ContainerOutlined />}>申请转载</Button>
                    </Space>
                  </div>

                  <div>
                    <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
                      <Avatar src={url.BASE_IMG_URL + store.getState().userCredential.avatarUrl} size={40} shape='square' />
                      <Card size='small' style={{ flex: '1 1' }}>
                        <TextArea placeholder="请写下你的评论......" size='large' bordered={false} autoSize value={comment} onChange={e => {
                          setComment(e.target.value)
                        }} />
                        <Divider style={{ margin: '12px 0' }} />
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}>
                          <SmileOutlined style={{ fontSize: '24px' }} />
                          <Button type="primary" onClick={postComment}>发布</Button>
                        </div>
                      </Card>

                    </div>
                    <List
                      // itemLayout="vertical"
                      header={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          1 个评论
                          <Segmented options={['默认', '最新']} />
                        </div>
                      }
                      bordered
                      dataSource={commentList}
                      renderItem={(item, index) => (
                        <List.Item
                          actions={[
                            <Button type="text" icon={<StarFilled />}>回复</Button>,
                            <Button type="text" icon={<HeartOutlined />}>喜欢</Button>
                            // <IconText icon={HeartOutlined} text="156" key="list-vertical-star-o" />,
                            // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                          ]}
                        // extra={<a href="https://ant.design">item.title</a>}
                        >
                          <List.Item.Meta
                            avatar={<Avatar src={url.BASE_IMG_URL + item.userinfo.avatarUrl} size={24} shape='square' />}
                            title={<a href={"/user/" + item.userinfo.id}>{item.userinfo.username}</a>}
                          // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                          />
                          {item.comment.content}
                        </List.Item>
                      )}
                    />

                  </div>


                </Card>

              </Col>

              {
                postData.user.id !== store.getState().userCredential.userId ?
                  <Col span={6}>
                    <Card title='关于作者'>
                      <div style={{ display: 'flex' }}>
                        <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`} size={60} shape='square' />
                        <div style={{ flex: '1 1', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <a href={"/user/" + postData.user.id}>{postData.user.username}</a>
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>infoddddddddddddddddddddddddddddddd</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '16px 0' }}>
                        <Space direction="vertical" align='center'>
                          文章
                          <span>{postsCount}</span>
                        </Space>
                        <Space direction="vertical" align='center'>
                          关注者
                          <span>{followerCount}</span>
                        </Space>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', }}>
                        {
                          followed ?
                            <Button block>已关注</Button>
                            :
                            <Button loading={loading} type='primary' icon={<PlusOutlined />} onClick={followUser} block>关注</Button>
                        }
                        {/* <Button type="primary" icon={<PlusOutlined />} block>关注</Button> */}
                        <Button icon={<MessageFilled />} block>发私信</Button>
                      </div>
                    </Card>
                  </Col>
                  :
                  <></>
              }

            </Row>
            :
            <Spin />
        }


      </Col >

      <Col span={6}></Col>
    </Row >
  )
}

export default ArticleDetail
