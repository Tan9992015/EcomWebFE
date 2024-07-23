import React, { useEffect } from 'react'
import {Row, Col, Badge,Popover, Button } from 'antd'
import { WrapperHeader,WrapperTextHeader,WrapperHeaderAccount,WrapperHeaderCart,WrapperContentPopup } from './style'
import Search from 'antd/lib/transfer/search'
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as Service from '../../service'
import { useDispatch } from 'react-redux';
import { resetUser } from '../../redux/userSlide';
import { useState } from 'react';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { searchProduct } from '../../redux/counterSlide';
const HeaderComponent = ({isHiddenSearch = false, isHiddenCart = false}) => {
  const [isLoading,setIsLoading] = useState(false)
  const [search,setSeatchValue] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const handleNavigate = ()=> {
    navigate('/sign-in')
  }

  // xử lý đăng xuất
  const handleLogOut = async()=> {
    setIsLoading(true)
      localStorage.removeItem('accessToken');
      await Service.logOut()
      dispatch(resetUser())
      setIsLoading(false) 
  }
  const content = (
    <div>
      <WrapperContentPopup onClick ={handleLogOut}>Đăng xuất</WrapperContentPopup>
      <WrapperContentPopup onClick={()=>navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (<WrapperContentPopup onClick={()=>navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>) }
      
    </div>
  )

  const onSearch = (e) => {
    setSeatchValue(e.target.value)
    dispatch(searchProduct(e.target.value))
  }
  return (
    <div>
      <WrapperHeader>
      <Col span={5}>
        <WrapperTextHeader>Chan hoc it</WrapperTextHeader>
      </Col>

      {!isHiddenSearch && (
        <Col span={13}>
        <ButtonInputSearch
          size = "large"
          placeholder = "Tìm kiếm sản phẩm..."
          textButton = "Tìm kiếm"
          bordered = {false}
          borderadius = '0px'
          onChange = {onSearch}
        />
      </Col>
      )}

      <Col span={6} style={{display: 'flex', gap: '30px', alignItems: 'center'}}>
        <LoadingComponent  isPending={isLoading}>
          <WrapperHeaderAccount  >
            {user?.avatar ? (<img src={user?.avatar} alt='avatar user' style={{
                            height:'30px',
                            width: '30px',
                            borderRadius: '50%',
                            objectFit:'cover'
                          }}/>) :<UserOutlined style={{ fontSize: '30px' }} />}
            {
              user?.accessToken ? (
                <>
                
                  <Popover content={content} trigger="click">
                    <div style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>{user.name || user.email || 'User'}</div>
                  </Popover>
                </>
              
            
            ) 
              :(
                <div onClick={handleNavigate} style={{cursor: 'pointer'}}>
                <span style={{fontSize: '12px'}}>Đăng nhập/ Đăng ký</span>
                <div>
                  <span style={{fontSize:'12px'}}>Tài khoản</span>
                  <CaretDownOutlined />
                </div>
              </div>
              )
            }
          </WrapperHeaderAccount>
        </LoadingComponent>
        {!isHiddenCart && (
          <WrapperHeaderCart>
          <Badge count={4} size='small'>
            <ShoppingCartOutlined style={{fontSize:'30px', color: '#fff'}}/>
          </Badge>
          <span style={{fontSize:'12px'}}>Giỏ hàng</span>
        </WrapperHeaderCart>
        )}
      </Col>
    </WrapperHeader>
    </div>
  )
}

export default HeaderComponent