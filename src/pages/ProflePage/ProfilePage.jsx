import React, { useEffect } from 'react'
import { WrapperContentProfile,WrapperInput,WrapperLabel,WrappperHeader,WrapperUploadFile } from './style'
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent'
import { useState } from 'react'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as Service from '../../service'
import { useMutation } from '@tanstack/react-query'
import * as message  from '../../components/Message/Message'
import { updateUser } from '../../redux/userSlide'
import {Button, Upload} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import { getBase64 } from '../../ultis'
const ProfilePage = () => {
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.user )
    const [email,setEmail] = useState(user?.email)
    const [phone,setPhone] = useState(user?.phone)
    const [address, setAddress] = useState(user?.address)
    const [avatar, setAvatar] = useState(user?.avatar)
    const [name,setName] = useState(user?.name)

    const mutation = useMutation({
        mutationFn: ({id,data}) => {
          return Service.updateUser(id,data)
        },
      })
    const {data,isLoading,isSuccess,isError} = mutation
    console.log(mutation)
     const handleGetDetaiUser = async(id,token)=> {
        const res = await Service.getDetailUser(id,token)
        dispatch(updateUser({...res?.data, accessToken: token}))
    }

    // console.log(data)
    // set ở input giá trị đã thay đổi
    useEffect(()=> {
        setName(user.name);
        setAvatar(user?.avatar);
        setPhone(user?.phone);
        setAddress(user?.address);
        setEmail(user?.email);
    },[user])
    

    // status 
    useEffect(()=> {
        if(isSuccess){
            message.success()
            handleGetDetaiUser(user?.id,user?.accessToken)
        } else if(isError){
            message.error()
        }
    },[isSuccess,isError])
   

   
    const handleEmailOnChange = (value)=> {
        setEmail(value)
    }
    const handlePhoneOnChange = (value)=> {
        setPhone(value)
    }
    const handleNameOnChange = (value) => {
        setName(value)
    }
    const handleAvatarOnChange = async({fileList})=> {
        const file = fileList[0]
        if(!file.url && !file.preview){
            file.preview = await getBase64(file.originFileObj)
        }
        setAvatar(file.preview)
    }
    const handleAddressOnChange = (value)=> {
        setAddress(value)
    }
    const handleUpdate = ()=> {
        mutation.mutate({id: user?.id, data: {name, email, phone, address, avatar}})
        console.log('update', name, email, phone, address, avatar )
    }
  return (
    <div style={{width: '1270px', margin: '0 auto', height:'500px'}}>
        <WrappperHeader>Thông tin người dùng</WrappperHeader>
        <WrapperContentProfile>
            <WrapperInput>
                <WrapperLabel htmlFor='name'>Tên</WrapperLabel>
                <InputFormComponent id='name' style={{width: '300px'}} value={name} handleOnChange={handleNameOnChange}></InputFormComponent>
                <ButtonComponent
                        // disabled = {!email.length||!password.length}
                        onClick={handleUpdate}
                        size={40}
                        textButton={'cập nhật'}
                        style={{
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        color: 'rgb(26,148,255)',
                        fontSize: '15px',
                        fontWeight: '700',
                        padding: '2px 6px 6px'
              }}
          />
            </WrapperInput>

            <WrapperInput>
                <WrapperLabel htmlFor='email'>Emai</WrapperLabel>
                <InputFormComponent id='email' style={{width: '300px'}} value={email} handleOnChange={handleEmailOnChange}></InputFormComponent>
                <ButtonComponent
                        // disabled = {!email.length||!password.length}
                        onClick={handleUpdate}
                        size={40}
                        textButton={'cập nhật'}
                        style={{
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        color: 'rgb(26,148,255)',
                        fontSize: '15px',
                        fontWeight: '700',
                        padding: '2px 6px 6px'
              }}
          />
            </WrapperInput>

            <WrapperInput>
                <WrapperLabel htmlFor='phone'>Sđt</WrapperLabel>
                <InputFormComponent id='phone' style={{width: '300px'}} value={phone} handleOnChange={handlePhoneOnChange}></InputFormComponent>
                <ButtonComponent
                        // disabled = {!email.length||!password.length}
                        onClick={handleUpdate}
                        size={40}
                        textButton={'cập nhật'}
                        style={{
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        color: 'rgb(26,148,255)',
                        fontSize: '15px',
                        fontWeight: '700',
                        padding: '2px 6px 6px'
              }}
          />
            </WrapperInput>

            <WrapperInput>
                <WrapperLabel htmlFor='avatar'>Ảnh đại diện</WrapperLabel>
                <WrapperUploadFile onChange={handleAvatarOnChange} maxCount={1}>
                    <Button icon={<UploadOutlined/>}>selected file</Button>
                </WrapperUploadFile>
                {
                    avatar &&  <img src={avatar} style={{
                            height:'60px',
                            width: '60px',
                            borderRadius: '50%',
                            objectFit:'cover'
                        }} alt='avatar user'/>
                }
                <ButtonComponent
                        // disabled = {!email.length||!password.length}
                        onClick={handleUpdate}
                        size={40}
                        textButton={'cập nhật'}
                        style={{
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        color: 'rgb(26,148,255)',
                        fontSize: '15px',
                        fontWeight: '700',
                        padding: '2px 6px 6px'
              }}
          />
            </WrapperInput>

            <WrapperInput>
                <WrapperLabel htmlFor='address'>Địa chỉ</WrapperLabel>
                <InputFormComponent id='address' style={{width: '300px'}} value={address} handleOnChange={handleAddressOnChange}></InputFormComponent>
                <ButtonComponent
                        // disabled = {!email.length||!password.length}
                        onClick={handleUpdate}
                        size={40}
                        textButton={'cập nhật'}
                        style={{
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        color: 'rgb(26,148,255)',
                        fontSize: '15px',
                        fontWeight: '700',
                        padding: '2px 6px 6px'
              }}
          />
            </WrapperInput>
        </WrapperContentProfile>
    </div>
  )
}

export default ProfilePage