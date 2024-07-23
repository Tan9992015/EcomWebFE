import React from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import {Row, Col, Pagination } from 'antd'
import { WrapperProducts, WrapperNavbar } from './style'
const TypeProductPage = () => {
  const onChange = () => {}
  return (
   <>
     <Row style={{ padding: '0 120px', backgroundColor: '#efefef', paddingTop:'10px', flexWrap:'nowrap'}}>
        <WrapperNavbar span={4}>
            <NavbarComponent/> 
        </WrapperNavbar>
        <Col span={20}>
          <WrapperProducts>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
          </WrapperProducts>
          <Pagination showQuickJumper  defaultCurrent={3} total={100} onChange={onChange} style={{textAlign: 'center', marginTop: '10px'}}/>
        </Col>
     </Row>
    
   </>
  )
}

export default TypeProductPage