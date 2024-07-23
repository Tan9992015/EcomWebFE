import React from 'react'
import {WrapperLableText,WrapperTextValue,WrapperTextContent} from './style'
import { Checkbox, Rate } from 'antd'

const NavbarComponent = () => {
    const renderContent = (type,options) => {
        switch(type) {
            case 'text':
                return options.map((option)=> {
                    return <WrapperTextValue>{option}</WrapperTextValue>
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%' , display: 'flex', flexDirection: 'column', gap: '12px'}}>
                        {
                            options.map((option) => {
                                return (
                                     <Checkbox value={option.value}>{option.label}</Checkbox>
                                     )
                            })
                        }
                            
                     </Checkbox.Group>
                )
            case 'start':
                return  options.map((option) => {
                            return (
                                <div style={{gap: '8px', display: 'flex'}}>
                                    <Rate style={{fontSize: '12px'}} disabled defaultValue ={option}/>
                                    <span>{`tu ${option} sao`}</span>
                                </div>
                         
                                 )
                        })
            case 'price':
                return options.map((option) => {
                    return (
                        <div style={{padding: '4px', color:'rgb(56,56,61)', borderRadius: '10px', backgroundColor: '#ccc', width: 'fit-content'}}>{option}</div>
                    )
                })
        }
    }
  return (
    <div style={{backgroundColor: '#fff'}}>
        <WrapperLableText>label</WrapperLableText>
        <WrapperTextContent>
            {renderContent('text',['Tu lanh','TV','MAYGIAT'])}
            {renderContent('checkbox',[
                    {value: 'a', label: 'A'},
                    {value: 'b', label: 'B'}
                ])}
            {renderContent('start', [3,4,5])}
            {renderContent('price',['dưới 40.0000','trên 50.0000'])}
        </WrapperTextContent>
    </div>
  )
}

export default NavbarComponent