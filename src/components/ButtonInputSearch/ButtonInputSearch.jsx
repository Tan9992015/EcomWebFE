import React from 'react'
import {
    SearchOutlined,
}  from '@ant-design/icons'
import {Button, Input} from 'antd'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
const ButtonInputSearch = (props) => {
    const {
        size,
        placeholder,
        textButton, 
        backgroundColorButton = 'rgb(13,92,182)', 
        backgroundColorInput = '#fff',
        colorTextButton = "#fff",
        bordered, 
        borderadius
    } = props
  return (
    <div style={{backgroundColor: "#fff", display: "flex"}}>
        <InputComponent 
        size = {size} 
        placeholder={placeholder} 
        style={{backgroundColor: backgroundColorInput}}
        bordered = {bordered}
        {...props}
        />
        <ButtonComponent 
        size={size} 
        icon={<SearchOutlined/>} 
        style={{border: !bordered && 'none',borderRadius: borderadius, backgroundColor: backgroundColorButton, color: colorTextButton}}
        textButton={textButton}
        />
    </div>
  )
}

export default ButtonInputSearch