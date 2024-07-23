import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const ProducsDetailPage = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  return (
    <div style={{padding: '0 120px', backgroundColor: '#efefef', height:'1000px'}}>
        <h5><span style={{cursor:'pointer',color: 'rgb(26, 148, 255)'}} onClick={()=> navigate('/')}>Trang chủ</span> - chi tiết sản phẩm</h5>
        <ProductDetailsComponent idProduct= {id}/>
    </div>
  )
}

export default ProducsDetailPage