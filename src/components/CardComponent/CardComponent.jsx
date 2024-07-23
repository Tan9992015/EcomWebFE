import React from 'react'
import { Card } from 'antd';
import {StarFilled} from '@ant-design/icons'
import { StyleNameProduct,WrapperReportText,WrapperPriceText, WrapperDiscountText } from './style';
import { useNavigate } from 'react-router-dom';
const CardComponent = (props) => {
  const {  id,countInStock, description, image, name, price, type, rating, sold, discount} = props
  const navigate = useNavigate()
  const handleDetailProduct = (id) => {
    navigate(`/products-detail/${id}`)
  }
  return (
    <Card
    hoverable
    style={{ width: 200}}
    bodyStyle={{padding: '10px'}}
    headStyle={{ width: '200px', height: '200px'}}
    cover={<img alt="example" src={image} />}
    onClick={()=> handleDetailProduct(id)}
  >
   <StyleNameProduct>{name}</StyleNameProduct>
   <WrapperReportText>
    <span>
        <span>{rating}</span><StarFilled style={{fontSize: '10px', color:'yellow'}}/>
    </span>
    <span> | Da ban {sold || 10000}</span>
    </WrapperReportText>
    <WrapperPriceText>
        <span style={{marginRight: '8px'}}>{price.toLocaleString()}</span>
        <WrapperDiscountText> -{discount || 5}%</WrapperDiscountText>
    </WrapperPriceText>
  </Card>
  )
}

export default CardComponent