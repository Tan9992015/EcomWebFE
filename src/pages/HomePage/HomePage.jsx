import React, { useEffect, useRef,useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButton, WrapperTypeProduct,WrapperProducts } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.png'
import slider3 from '../../assets/images/slider3.png'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import { Flex } from 'antd'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import * as Service from '../../service'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
const HomePage = () => {
  const productSearch = useSelector(state=> state?.product?.search)
  const arr = ['TV','Lap top', 'Tu lanh']
  const [limit,setLimit] = useState(6)
  const fetchAllProducts = async(context)=>{
    console.log('contetx',context)
    const search = context?.queryKey && context?.queryKey[2]
    const limit  = context?.queryKey && context?.queryKey[1]
    const  res = await Service.getAllProducts(search,limit)
    return res
  }
  // gọi getAll sản phẩm
  const { isLoading, data: products } = useQuery({
    queryKey: ['products',limit,productSearch],
    queryFn: fetchAllProducts,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData : true
  })
  // retry chính là số lần thử lại khi truy vấn gặp lỗi 
  // retry delay chính là khoảng thời gian chờ giữa các truy vấn
  // data = res

  return (
    <>
      <div style={{padding: '0 120px'}}>
      <WrapperTypeProduct>
      {arr.map((ar,index) => {
          return (
            <TypeProduct name={ar} key={index}/>
          )
        })}
      </WrapperTypeProduct>
      </div>  
      <div style={{backgroundColor: '#efefef', padding: '0 120px', height: '1000px'}}>
        <SliderComponent arrImages = {[slider1,slider2,slider3]}/>  
        <WrapperProducts>
          {products?.data?.map((product)=>{
            return (
              <CardComponent key={product?._id} 
                             countInStock={product?.countInStock} 
                             description ={product?.description} 
                             image={product?.image} 
                             name = {product?.name}
                             rating = {product?.rating} 
                             price = {product?.price}
                             type = {product?.type}
                             sold = {product?.sold}
                             discount = {product?.discount}
                             id = {product?._id}
              />
            )
          })}
        </WrapperProducts>
        {/* <NavbarComponent/> */}
        <div style={{width: '100%',display:'flex', justifyContent:'center', marginTop: '20px'}}>
         <WrapperButton textButton="Xem Thêm" type = "outline" style={{
          border: '1px solid rgb(11,116,229)', color: 'rgb(11,116,229)', width: '240px',
          height: '30px', borderRadius: '4px', fontWeight: '500'
        }}
        onClick={()=> setLimit(prev=> prev+6)}
        disabled = {products?.totalProduts === products?.data?.lenght}
        >
        </WrapperButton>
        </div>
      </div>
    </>
  )
}

export default HomePage