import React, { useState,useEffect } from 'react'
import {WrapperContainerRight, WrapperContainerLeft, WrapperTextLight} from './style'
import  InputFormComponent from '../../components/InputFormComponent/InputFormComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import auth from '../../assets/images/auth.png'
import {Image} from 'antd'
import { useNavigate } from 'react-router-dom'
import {EyeFilled, EyeInvisibleFilled} from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import * as Service from '../../service'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux'
import { updateUser } from '../../redux/userSlide'

const SignInPage = () => {
  const dispatch = useDispatch()

  const [isShowPassword,setIsShowPassword] = useState(false)
  const navigate = useNavigate()
  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnChangePassword = (value) => {
    setPassword(value)
  }
  const handleSiginIn =()=> {
    mutation.mutate({
      email,
      password
    })
    // console.log(email +' ' + password)
  }

  // call api
  const mutation = useMutation({
    mutationFn: (data) => {
      return Service.loginUser(data)
    },
  })
  
  const {data,isPending,isSuccess, isError} = mutation

  useEffect(()=>{
    if(isSuccess){
      navigate('/')
      localStorage.setItem('accessToken',JSON.stringify(data?.accessToken))
      if(data?.accessToken){
        const decode = jwtDecode(data?.accessToken)
        console.log('decode ', decode)
        if(decode?.id){
          handleGetDetaiUser(decode?.id, data?.accessToken)
        }
      }
    }
  },[isSuccess])

  console.log('mutation', mutation)

  const handleGetDetaiUser = async(id,token) => {
    const res = await Service.getDetailUser(id,token)
    dispatch(updateUser({...res?.data, accessToken: token}))
    console.log('res',res)
  }
  return (
   <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh'}}> 
       <div style={{width: '800px', height: '445px',borderRadius:'6px', background: '#fff', display:'flex'}}>
      <WrapperContainerLeft>
        <h1>Xin chào</h1>
        <p>đăng nhập vào tài khoản</p>
        <InputFormComponent  
          placeholder= 'tên đăng nhập' 
          style={{marginBottom: '10px'}}
          value={email}  
          handleOnChange={handleOnChangeEmail}
        />
        <div style={{position: 'relative'}}> 
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '8px',
              zIndex: '10',
              cursor: 'pointer'
            }}
              onClick = {() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? (<EyeFilled/>) : (<EyeInvisibleFilled/>)}
            </span>
        </div>
        <InputFormComponent 
          placeholder= 'mật khẩu' 
          type={isShowPassword ? "text" : "password"}
          value={password}
          handleOnChange={handleOnChangePassword}
        />
        {data?.err === 1 && <span style={{color: 'red'}}>{data?.mess}</span>} 
        {/* để ? vì lần đầu render chưa gọi api chưa có data */}
        <LoadingComponent isPending={isPending} >
          <ButtonComponent
          disabled = {!email.length||!password.length}
          onClick={handleSiginIn}
          size={40}
          textButton={'Đăng nhập'}
          style={{
          background: !email.length||!password.length ? '#ccc' : 'rgb(255,57,69)',
          height: '48px',
          width: '100%',
          border: 'none',
          borderRadius: '4px',
          color: '#fff',
          fontSize: '15px',
          fontWeight: '700',
          margin: '26px 0 10px'
              }}
          />
        </LoadingComponent>
        <p><WrapperTextLight>Quên mật khẩu ?</WrapperTextLight></p>
        <p>Chưa có tài khoản ? <WrapperTextLight onClick = {handleNavigateSignUp} style={{cursor:'pointer'}}>Tạo tài khoản</WrapperTextLight></p>
      </WrapperContainerLeft>
      <WrapperContainerRight>
        <Image src={auth} height="203px" width="203px"/>
        <h4>Mua sắm tại Chán học IT</h4>
      </WrapperContainerRight>
    </div>
   </div>
  )
}

export default SignInPage