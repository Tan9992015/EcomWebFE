import React, { useState } from 'react'
import { Menu} from "antd";
import { AppstoreOutlined,UserOutlined, SettingOutlined } from '@ant-design/icons';
import { getItem } from '../../ultis';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'user', <UserOutlined/>),
        getItem('sản phẩm', 'product', <AppstoreOutlined/>)
    ]
    const [keySelected,setKeySelected] = useState('')
    const handleOnClick = ({key})=> {
        setKeySelected(key)
    }
    // console.log(keySelected)
    const renderPage = (key)=> {
        if(key === 'user') return (<AdminUser/>)
        else if(key === 'product') return (<AdminProduct/>)
    }
  return (
   <>
   <HeaderComponent isHiddenSearch isHiddenCart/>
    <div style={{display:'flex'}}>
        <Menu
            mode="inline"
            style={{
                width: 256,
                boxShadow: '1px 1px 2px #ccc',
                height: '100vh'
            }}
            items={items}
            onClick={handleOnClick}
        />
        <div style={{flex: 1,padding: '15px'}}>
          {renderPage(keySelected)}
        </div>     
    </div>
   </>
  )
}

export default AdminPage