import axios from 'axios'
export const getAllProducts = async(search,limit)=> {
    let res = {}
    // console.log('search', !!search, search)
    if(search?.length > 0){
         res = await axios.get(`http://localhost:3000/api/product/get-all?filter=name&filter=${search}&${limit}`)
    }else {
        res = await axios.get(`http://localhost:3000/api/product/get-all?limit=${limit}`)
    }
   
    return res.data
}


export const createProducts = async (data) => {
    const response = await axios.post('http://localhost:3000/api/product/create', data);
    return response.data;

}

export const getDetailsProduct = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/product/get-detail/${id}`);
    return response.data;

}

export const updateProduct = async(id,data)=> {
    const response = await axios.put(`http://localhost:3000/api/product/update/${id}`, data )
    return response.data
}

export const deleteProduct = async(id)=> {
    const response = await axios.delete(`http://localhost:3000/api/product/delete/${id}`)
    return response.data
}

export const deleteManyProduct = async(data)=>{
    const res = await axios.delete('http://localhost:3000/api/product/deleteAll', data)
    return res.data
}