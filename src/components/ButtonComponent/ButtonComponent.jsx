import React from 'react'
import {Button} from 'antd'
const ButtonComponent = ({style,textButton,icon,size,...res}) => {
  return (
    <Button
        size={size}
        style={style}
        icon = {icon}
        {...res}
        >
      {textButton}</Button>
   
  )
}

export default ButtonComponent