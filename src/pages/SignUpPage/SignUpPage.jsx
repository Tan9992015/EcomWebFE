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
import * as message from '../../components/Message/Message'
const SignUpPage = () => {
  const [isShowPassword,setIsShowPassword] = useState(false)
  const [isShowConfirmPassword,setIsShowConfirmPassword] = useState(false)
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [email,setEmail] = useState('')
  const navigate = useNavigate()
  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnChangePassword = (value) => {
    setPassword(value)
  }
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }
  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }
  const handleRegister =()=> {
    mutation.mutate({
      email,
      password,
      confirmPassword
    })
    // console.log(email +' ' + password + ' ' + confirmPassword)
  }
  const mutation  = useMutation({
    mutationFn: (data)=> {
      return Service.registerUser(data)
    }
  })
  
  const {data,isPending, isSuccess, isError} = mutation
  
  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleNavigateSignIn();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);
  console.log(mutation)
  return (
   <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh'}}> 
       <div style={{width: '800px', height: '445px',borderRadius:'6px', background: '#fff', display:'flex'}}>
      <WrapperContainerLeft>
        <h1>Xin chào</h1>
        <p>đăng nhập vào tài khoản</p>
        <InputFormComponent  placeholder= 'tên đăng nhập' 
                        style={{marginBottom: '10px'}} 
                        value={email}  
                        handleOnChange={handleOnChangeEmail}/>
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
        <InputFormComponent placeholder= 'mật khẩu' 
        style={{marginBottom: '10px'}} 
        type={isShowPassword ? "text" : "password"} 
        value={password}
        handleOnChange={handleOnChangePassword}
        />
        <div style={{position: 'relative'}}> 
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '8px',
              zIndex: '10',
              cursor: 'pointer'
            }}
              onClick = {() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            >
              {isShowConfirmPassword ? (<EyeFilled/>) : (<EyeInvisibleFilled/>)}
            </span>
        </div>
        <InputFormComponent 
        placeholder= 'nhập lại mật khẩu' 
        type={isShowConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        handleOnChange={handleOnChangeConfirmPassword}
        />
        {data?.err === 1 && <span style={{color: 'red'}}>{data?.mess}</span>} 
        <ButtonComponent
          disabled = {!email.length||!password.length||!confirmPassword.length}
          onClick = {handleRegister}
          size={40}
          textButton={'Đăng ký'}
          style={{
          background: !email.length||!password.length||!confirmPassword.length ? '#ccc' : 'rgb(255,57,69)',
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
        <p>Đã có tài khoản ? <WrapperTextLight onClick={handleNavigateSignIn} style={{cursor: 'pointer'}}>Đăng nhập</WrapperTextLight></p>
      </WrapperContainerLeft>
      <WrapperContainerRight>
        <Image src={auth} height="203px" width="203px"/>
        <h4>Mua sắm tại Chán học IT</h4>
      </WrapperContainerRight>
    </div>
   </div>
  )
}

export default SignUpPage