import React, { Fragment } from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes/router';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import axios from 'axios'
import { useEffect } from 'react';
import { isJsonString } from './ultis';
import { jwtDecode } from "jwt-decode";
import * as Service from './service'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/userSlide';
import { instance } from './service';
function App() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(()=>{
       const {storageData, decoded} = handelDecode()
      if(decoded?.id){
        // vẫn sẽ decode được kể cả khi token hết hạn
        handleGetDetailUser(decoded?.id,storageData)
      }
    },[])

    const handelDecode = ()=> {
      let storageData = localStorage?.getItem('accessToken')
      let decoded = {}
      console.log(isJsonString(storageData))
      if(storageData && isJsonString(storageData)){
        storageData = JSON.parse(storageData)
        decoded = jwtDecode(storageData)
      }
      console.log(storageData)
      console.log(decoded)
      return {decoded, storageData}
    }

    const handleGetDetailUser = async(id,token)=> {
      const res = await Service.getDetailUser(id,token)
      dispatch(updateUser({...res?.data, accessToken: localStorage.getItem('accessToken')}))
    }

    // handelDecode()
    instance.interceptors.request.use(async (config) => {
      const {decoded} = handelDecode()
      // trc khi gọi đến getDetailuser check 
      if(decoded?.exp < new Date().getTime() /  1000){
        const response = await Service.refreshToken()
        const newAccessToken = response.new_access_token
        localStorage.setItem('accessToken',JSON.stringify(`Beare ${newAccessToken}`))
        config.headers['token'] = `Beare ${newAccessToken}`
      }
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

  return (
    <>
    <Router>
          <Routes>
            {routes.map(route => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            const isCheckAuth = !route.isPrivate || user?.isAdmin
             return( <Route path={isCheckAuth ? route.path : undefined} element = {
                      <Layout>
                        <Page/>
                      </Layout>
                    } /> )
            }
             )}
           </Routes>
    </Router>
    </>
    
      )
}
export default App;