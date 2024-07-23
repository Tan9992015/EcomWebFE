import React, { useState } from 'react'
import {Input} from 'antd'
import { WrapperInputStyle } from './style'
const InputFormComponent = (props) => {
    const {placeholder,value,...res} = props
    const handleInputOnchange =(e) => {
      props.handleOnChange(e.target.value)
      // console.log(e.target.value)
    }
  return (
    <WrapperInputStyle placeholder={placeholder} value = {value} onChange={handleInputOnchange} {...res}/>
  )
}

export default InputFormComponent