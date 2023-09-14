import React, { useEffect, useState } from 'react'
import { Avatar, List, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import api from '../http/api';
import url from '../http/url';

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'Ant Design, a design language for background applications',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function ArticleList() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    //get all posts
    api.getRequest('/public/allposts').then(res => {
      console.log(res)
      setPosts(res.data)
      console.log(posts)
    })
  }, [])

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      }}
      dataSource={posts}
      renderItem={(item) => (
        <List.Item
          style={{ padding: '16px 0' }}
          key={item.post.id}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text={item.commentCount} key="list-vertical-message" />,
          ]}
          extra={
            item.post.coverImgUrl ?
              <img
                width={272}
                alt="logo"
                src={''}
              />
              :
              <></>
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={url.BASE_IMG_URL + item.user.avatarUrl} />}
            title={<a href={'/article/' + item.post.id}>{item.post.title}</a>}
            description='Ant Design, a design language for background applications'
          />
          <div dangerouslySetInnerHTML={{ __html: item.post.content.substring(0, 200) + '...' }}></div>
        </List.Item>
      )}
    />
  )
}

export default ArticleList
