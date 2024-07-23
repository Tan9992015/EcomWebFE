import axios from 'axios'

export const instance = axios.create(); // phút 17 55 vid #30

export const loginUser = async(data) => {
    const response = await axios.post('http://localhost:3000/api/user/login', data)
    console.log(response.data)
    return response.data
}

export const registerUser = async(data) => {
    const response = await axios.post('http://localhost:3000/api/user/register', data)
    console.log(response.data)
    return response.data
}

export const getDetailUser = async(id, accessToken) => {
    const response = await instance.get(`http://localhost:3000/api/user/get-detail-user/${id}`, {
        headers: {
            token: accessToken
        }
    })
    return response.data
}

export const refreshToken = async () => {
    // withCredentials tự động chuyền cookie xuống be nếu có
    const res = await axios.post('http://localhost:3000/api/user/refreshToken', {
        withCredentials: true
    })
    return res.data
}

export const logOut = async()=>{
    const res = await axios.post('http://localhost:3000/api/user/logout')
    return res.data
}

export const updateUser = async(id,payload) => {
    const res = await axios.put(`http://localhost:3000/api/user/update-user/${id}`, payload)
    return res.data
}

export const getAllUser = async() => {
    const res = await axios.get('http://localhost:3000/api/user/getAllUser')
    return res.data
}

export const deleteUser = async(id) => {
    const res = await axios.delete(`http://localhost:3000/api/user/delete-user/${id}`)
    return res.data
}

export const deleteManyUser = async(data)=>{
    const res = await axios.delete('http://localhost:3000/api/user/deleteAll', data)
    return res.data
}