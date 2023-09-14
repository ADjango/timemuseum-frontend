import React, { useEffect, useState } from 'react'
import { AppstoreOutlined, MailOutlined, SearchOutlined, SettingOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Input, Space, Avatar, Badge, Dropdown, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../redux/store';
import { setUserId, setUsername, setJwtToken } from '../redux/actions';
import storage from 'redux-persist/lib/storage';
import url from '../http/url';

const menuItems = [
  {
    label: <Link hred='/'>首页</Link>,
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: '探索',
    key: 'app',
    icon: <AppstoreOutlined />,
  }
];

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}





const MenuItem = () => {

  const [login, setLogin] = useState(false)
  const [userId, setUserId] = useState('')

  const navigate = useNavigate()


  useEffect(() => {
    console.log("menu login status")
    if (store.getState().userCredential.jwtToken.length === 0) setLogin(false)
    else setLogin(true)
  }, [store.getState().userCredential.jwtToken])

  const onClick = ({ key }) => {
    console.log({ key })
    if (key === '1') {
      //退出登录
      // store.dispatch(setUserId(''))
      // store.dispatch(setUsername(''))
      // store.dispatch(setJwtToken(''))
      storage.removeItem('persist:root')
      setLogin(false)
      navigate('/')
    }
  }

  useEffect(() => {
    setUserId(store.getState().userCredential.userId)
  }, [login])

  const items = [
    {
      label: <a href={'/user/' + userId}>我的主页</a>,
      key: '0',
      icon: <UserOutlined />
    },
    {
      label: '退出登录',
      key: '1',
      icon: <PoweroffOutlined />
    }
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>

      <Menu mode="horizontal" items={menuItems} />

      <Input name='searchinput' placeholder="default size" suffix={<SearchOutlined />} size='large' style={{ height: 'fit-content', margin: '0 24px' }} />

      <div style={{ marginRight: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Dropdown
          dropdownRender={() => (<div>dd</div>)}
          trigger={['click']}
        >
          <Badge count={5}>
            <MailOutlined style={{ fontSize: '32px' }} onClick={(e) => e.preventDefault()} />
          </Badge>
        </Dropdown>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
          !login
            ?
            <Button href='/login'>login / sign up</Button>
            :
            <Dropdown
              menu={{
                items,
                onClick
              }}
              trigger={['click']}
              placement="bottom"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <Avatar size={40} shape='square' style={{ cursor: 'pointer' }} src={url.BASE_IMG_URL + store.getState().userCredential.avatarUrl}></Avatar>
            </Dropdown>
        }



      </div>


    </div>

  )
}

export default MenuItem
