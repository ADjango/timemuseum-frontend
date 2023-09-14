import React, { useEffect, useState } from 'react'
import { Avatar, List, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import api from '../http/api';
import { useParams } from 'react-router-dom';
import url from '../http/url';


const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function MyPosts(props) {

  console.log(props)

  const [posts, setPosts] = useState([])
  const { id } = useParams()

  useEffect(() => {
    //get all posts
    api.getRequest('/public/posts?userId=' + id).then(res => {
      console.log(res)
      setPosts(res.data)
      // console.log(posts)
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
          key={item.id}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          extra={
            // item.post.coverImgUrl ?
            //     <img
            //         width={272}
            //         alt="logo"
            //         src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            //     />
            //     :
            <></>
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={url.BASE_IMG_URL+props.userInfo.avatarUrl} />}
            title={<a href={'/article/' + item.id}>{item.title}</a>}
            description='Ant Design, a design language for background applications'
          />
          <div dangerouslySetInnerHTML={{ __html: item.content.substring(0, 200) + '...' }}></div>
        </List.Item>
        // <></>
      )}
    />
  )
}

export default MyPosts
