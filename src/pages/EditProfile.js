import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Avatar, List, message, Upload, Button, Form, Space, Input } from 'antd';
import { UploadOutlined, RightOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../http/api';
import { store } from '../redux/store';
import './editProfile.css'

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

function EditProfile() {

  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    api.getRequest('/user/' + store.getState().userCredential.userId).then(res => setUserInfo(res.data))
  }, [])

  const props = {
    name: 'file',
    action: 'http://localhost:8080/api/public/file/uploadFile',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info);
        // setImageId(info.file.response)
        api.postRequest('/user/update?avatarFileId=' + info.file.response).then(res => {
          setUserInfo({ ...userInfo, avatarUrl: res.data })
        })
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Row style={{ marginTop: '16px' }}>
      <Col span={7}></Col>
      <Col span={10}>
        <Card>

          <div style={{ display: 'flex', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Avatar shape="square" size={168} src={'http://localhost:8080/api/public/file/image/' + userInfo.avatarUrl} />
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>上传新的头像</Button>
              </Upload>

            </div>


            <div style={{ flex: '1 1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1>{userInfo.username}</h1>
                <a href={'/user/' + store.getState().userCredential.userId}>返回我的主页<RightOutlined /></a>
              </div>

              <List
                size="large"
                dataSource={data}
              >
                <List.Item style={{ padding: '32px 0px' }}>
                  <div style={{ display: 'flex', gap: '48px' }}>
                    <h3>性别</h3>
                    {/* {
                      genderCheck ?
                        <Form
                          // form={form}
                          layout="vertical"
                          // onFinish={onFinish}
                          // onFinishFailed={onFinishFailed}
                          autoComplete="off"
                        >
                          <Form.Item
                          >
                            <Input placeholder="input placeholder" />
                          </Form.Item>
                          <Form.Item>
                            <Space>
                              <Button type="primary" htmlType="submit">
                                确定
                              </Button>
                              <Button htmlType="button" onClick={setGenderCheck(false)}>
                                取消
                              </Button>
                            </Space>
                          </Form.Item>
                        </Form>
                        :
                        <div>
                          男
                          <Button type="link" icon={<EditOutlined />} onClick={setGenderCheck(true)}>修改</Button>
                        </div>
                    } */}


                  </div>

                </List.Item>
              </List>
            </div>
          </div>


          {/* <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <div>
            <img src={'http://localhost:8080/api/public/file/image/'+imageId}></img>
          </div> */}
        </Card>
      </Col>
      <Col span={7}></Col>
    </Row>
  )
}

export default EditProfile
