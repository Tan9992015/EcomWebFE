import React from 'react'
import { Input } from 'antd'
const InputComponent = ({size, placeholder,bordered, style, ...res}) => {
  return (
    <Input 
        size={size}
        placeholder={placeholder}
        bordered = {bordered}
        style={style}
        {...res}
    />
  )
}

export default InputComponent