import React, { useRef, useState } from 'react';
import { Col, Row, Card, Input, Divider, Button, List, Select, message } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { EyeOutlined, SendOutlined } from '@ant-design/icons';
import api from '../http/api';
import { useNavigate } from 'react-router-dom';
import './ckeditor.css'

function NewArticle() {

  const [postTitle, setPostTitle] = useState('')
  const [content, setContent] = useState('')

  const navigate = useNavigate()
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current);
    }
  };

  return (
    <Row gutter={16} style={{ margin: "10px 0" }}>
      <Col span={6}>
        <Card
          title='文章设置'>
        </Card>

      </Col>

      <Col span={12}>

        <Card>
          <Input
            placeholder="请输入标题（最多 100 个字）"
            value={postTitle}
            onChange={(e) => {
              setPostTitle(e.target.value)
            }}
            bordered={false}
            size='large'
            style={{
              height: '45px',
              fontSize: '32px',
              fontWeight: '600'
            }} />
          <Divider />
          <CKEditor
            editor={ClassicEditor}
            data={content}
            placeholder={'请输入正文'}
            style={{height:'500px'}}
            onReady={editor => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data)
              console.log({ event, editor, data });
            }}
            // onBlur={(event, editor) => {
            //   console.log('Blur.', editor);
            // }}
            // onFocus={(event, editor) => {
            //   console.log('Focus.', editor);
            // }}
          />
          <button onClick={log}>Log editor content</button>
        </Card>
      </Col>

      <Col span={6}>
        <Card
          title='发布设置'>

          <List
            size="large"
          // renderItem={() => }
          >
            <List.Item style={{ padding: '24px 0' }}>
              文章话题：
              <Select
                defaultValue="lucy"
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: 'jack',
                    label: 'Jack',
                  },
                  {
                    value: 'lucy',
                    label: 'Lucy',
                  },
                  {
                    value: 'Yiminghe',
                    label: 'yiminghe',
                  },
                  {
                    value: 'disabled',
                    label: 'Disabled',
                    disabled: true,
                  },
                ]}
              />
            </List.Item>

          </List>

          <div style={{ display: 'flex' }}>
            <Button size='large' icon={<EyeOutlined />} block>预览</Button>
            <Divider type="vertical" />
            <Button
              type='primary'
              size='large'
              icon={<SendOutlined />}
              block
              maxLength={100}
              onClick={() => {
                if (postTitle.length === 0) {
                  message.warning('请输入文章标题');
                } else {
                  api.postRequest(
                    '/newpost',
                    {
                      title: postTitle,
                      content: content
                    }
                  ).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                      navigate('/article/' + res.data.id)
                    }
                  })
                }
              }}
            >
              发布
            </Button>
          </div>

        </Card>

      </Col>
    </Row>
  )
}

export default NewArticle
