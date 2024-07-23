import React, {useState} from 'react'
import {Row, Col, Image, InputNumber} from 'antd'
import {WrapperStyleImageSall,
        WrapperStyleColImage,
        WrapperStyleNameProduct,
        WrapperStyleTextSell,
        WrapperPriceProduct,
        WrapperPriceTextProduct
        ,WrapperAddressProduct,
        WrapperQuantityProduct,
        WrapperInputNumber
    } from './style'
import {PlusOutlined, MinusOutlined} from '@ant-design/icons'
import {StarFilled} from '@ant-design/icons'
import imageProduct from '../../assets/images/conan1.webp'
import imageProductDetails1 from '../../assets/images/conan2.webp'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as Service from '../../service'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
const ProductDetailsComponent = ({idProduct}) => {
    const user = useSelector(state=> state.user)
    const [numProduct,setNumProduct] = useState(1)
    const onChange = (value) => {
        setNumProduct(Number(value))
    }
    const handleChangeCount = (type)=> {
        if(type==='increase'){
            setNumProduct(numProduct +1)
        }else {
            setNumProduct(numProduct-1)
        }
    }
    const renderStar = (num)=> {
        const stars = []
        for(let i = 0; i< num ;i++){
                stars.push(<StarFilled key={i} style={{fontSize: '10px', color:'yellow'}}/>)
        }
        return stars
    }
    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        const res = await Service.getDetailsProduct(id)
        return res.data
      }
      const { isLoading, data: productDetails } = useQuery({
        queryKey: ['product-details',idProduct],
        queryFn: fetchGetDetailsProduct,
        retry: 3,
        retryDelay: 1000,
        keepPreviousData : true,
        enabled: !!idProduct
      })
      console.log('productdetails',productDetails)
  return (
    <Row style={{padding: '16px', background: '#fff', borderRadius: '4px'}}>
        <Col span={10} style={{borderRight: '1px solid #e5e5e5', paddingRight:'8px'}}>
            <Image src={productDetails?.image} alt='nothing' preview = {false} />
            <Row style={{paddingTop: '10px', justifyContent: 'space-between'}}>
                <WrapperStyleColImage span={4} >
                    <WrapperStyleImageSall src={imageProductDetails1} alt='nothing' preview = {false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSall src={imageProductDetails1} alt='nothing' preview = {false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSall src={imageProductDetails1} alt='nothing' preview = {false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSall src={imageProductDetails1} alt='nothing' preview = {false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSall src={imageProductDetails1} alt='nothing' preview = {false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSall src={imageProductDetails1} alt='nothing' preview = {false}/>
                </WrapperStyleColImage>
            </Row>
        </Col>
        <Col span={14} style={{paddingLeft:'10px'}}>
                <WrapperStyleNameProduct>
                     {productDetails?.name}
                </WrapperStyleNameProduct>
                <div>
                    {renderStar(productDetails?.rating)}
               
                <WrapperStyleTextSell> | {productDetails?.countInStock} </WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>{productDetails?.price}</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao đến</span>
                    <span className='address'> {user?.address}</span>   
                    <span className='change-address'> đổi địa chỉ</span>   
                </WrapperAddressProduct>
                <div style={{margin: '10px 0 20px', padding: '10px 0'}}>
                    <div style={{marginBottom: '6px'}}>số lượng</div>
                    <WrapperQuantityProduct>
                       <button style={{border: 'none', background:'transparent', cursor: 'pointer'}} onClick={()=>handleChangeCount('increase')}>
                            <PlusOutlined style={{color: '#000', fontSize: '20px'}} />
                       </button>
                        <WrapperInputNumber  onChange={onChange} defaultValue = {1} value={numProduct} size="small"/>
                       <button style={{border: 'none', background:'transparent', cursor: 'pointer'}}  onClick={()=>handleChangeCount('decrease')}> 
                            <MinusOutlined style={{color: '#000', fontSize: '20px'}}/>
                       </button>
                    </WrapperQuantityProduct>
                </div>
                <div style={{display:'flex', alignItems:'center', gap: '10px'}}>
                    <ButtonComponent
                        size={40}
                        textButton={'chọn mua'}
                        style={{
                            background: 'rgb(255,57,69)',
                            height: '48px',
                            width: '220px',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#fff',
                            fontSize: '15px',
                            fontWeight: '700'
                        }}
                    />
                    <ButtonComponent
                        size={40}
                        textButton={'Mua trả sau'}
                        style={{
                            background: '#fff',
                            height: '48px',
                            width: '220px',
                            border: '1px solid rgb(13,92,182)',
                            borderRadius: '4px',
                            color: 'rgb(13,92,182)',
                            fontSize: '15px',
                            fontWeight: '700'
                        }}
                    />
                </div>
        </Col>
    </Row>
  )
}

export default ProductDetailsComponent