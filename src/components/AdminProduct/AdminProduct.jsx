import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Space } from 'antd';
import { PlusOutlined,SearchOutlined } from '@ant-design/icons';
import { WrapperHeader } from './style';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import { getBase64 } from '../../ultis';
import { WrapperUploadFile } from '../../pages/ProflePage/style';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as Service from '../../service';
import * as message from '../../components/Message/Message';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useDispatch, useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

const AdminProduct = () => {
  const user = useSelector(state => state?.user);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete,setIsModalOpenDelete] = useState(false)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    description: '',
    countInStock: '',
    price: '',
    type: '',
    rating: '',
    image: ''
  });
  const [stateProductDetail, setStateProductDetail] = useState({
    name: '',
    description: '',
    countInStock: '',
    price: '',
    type: '',
    rating: '',
    image: ''
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      description: '',
      countInStock: '',
      price: '',
      type: '',
      rating: '',
      image: ''
    });
    form.resetFields();
  };

  const handleCancelDelete = ()=> {
    setIsModalOpenDelete(false)
  }


  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleOnChangeDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      [e.target.name]: e.target.value
    });
    form.setFieldsValue({
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarOnChange = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    });
  };

  const handleAvatarOnChangeDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetail({
      ...stateProductDetail,
      image: file.preview
    });
    form.setFieldsValue({
      image: file.preview
    });
  };

  const mutation = useMutation({
    mutationFn: (data) => {
      return Service.createProducts(data);
    },
  });

  const getAllProducts = async () => {
    const res = await Service.getAllProducts();
    return res;
  };

  const queryProduct = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    retry: 3,
    retryDelay: 1000
  });
  const  { isLoading: isLoadingProducts, data: products } = queryProduct
  // handle submit
  const onFinish = async () => {
    const { name, price, description, rating, image, type, countInStock } = stateProduct;
    mutation.mutate({
      name,
      price: Number(price),
      description,
      rating: Number(rating),
      image,
      type,
      countInStock: Number(countInStock)
    })
  };

  const { data, isSuccess, isLoading, isError } = mutation;

  const fetchGetDetailsProduct = async (id) => {
    const res = await Service.getDetailsProduct(id);
    setStateProductDetail({
      name: res?.data?.name,
      description: res?.data?.description,
      countInStock: res?.data?.countInStock,
      price: res?.data?.price,
      type: res?.data?.type,
      rating: res?.data?.rating,
      image: res?.data?.image
    });
    return res;
  };

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected]);

  useEffect(() => {
    form.setFieldsValue(stateProductDetail);
  }, [stateProductDetail]); // hiển thị giá trị trc thi thay đổi ở draw form

  const handleDetailsProduct = () => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected);
    }
    setIsOpenDrawer(true);
  };

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ cursor: 'pointer' }} onClick={()=> {setIsModalOpenDelete(true)}}/>
        <EditOutlined style={{ cursor: 'pointer' }} onClick={handleDetailsProduct} />
      </div>
    );
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  }); 
  const dataTable = products?.data?.map(product => ({ ...product, key: product?.id }));
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter:(a,b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a,b)=> a.price - b.price, 
      filters: [
        {
          text: '>= 50',
          value: '>=',
        },
        {
          text: '<= 50',
          value: '<=',
        },
       
      ],
      onFilter: (value, record) => {
        if(value === '>='){
          return record.price >= 50
        }
        return record.price <=50
      }
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a,b) => a.rating - b.rating,
      filters: [
        {
          text: '>= 3',
          value: '>=',
        },
        {
          text: '<= 3',
          value: '<=',
        },
       
      ],
      onFilter: (value, record) => {
        if(value === '>='){
          return Number(record.rating >= 3)
        }
        return Number(record.rating <= 3)
      }
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },
  ];

  useEffect(() => {
    if (isSuccess && data.err === 0) {
      message.success();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const mutationUpdateProduct = useMutation({
    mutationFn: (data) => {
      const { id, ...rest } = data;
      return Service.updateProduct(id, rest);
    },
  });
  const mutationDeleteProduct = useMutation({
    mutationFn: (data)=>{
      const {id} = data
      return Service.deleteProduct(id)
    }
  })
  const mutationDeleteManyProduct = useMutation({
    mutationFn: (data)=>{
      const {ids} = data
      return Service.deleteProduct(ids)
    }
  })
  const { data: dataUpdateProduct, isSuccess: isSuccessUpdateProduct, isError: isErrorUpdateProduct } = mutationUpdateProduct
  const { data: datDeleteProduct, isSuccess: isSuccessDeleteProduct, isError: isErrorDeleteProduct } = mutationDeleteProduct;

  const onUpdateProduct = () => {
    mutationUpdateProduct.mutate({ id: rowSelected, ...stateProductDetail },{
      onSettled: ()=> {
          queryProduct.refetch() // phải refetch lại thì nó mới hiển thị data sau update
      }
    });
  };

  const handleDeleteProduct = ()=> {
      mutationDeleteProduct.mutate({id: rowSelected}, {
        onSettled: ()=>{
          queryProduct.refetch()
        }
      })
      handleCancelDelete()
  }

  const handleDeleteManyProduct = (_id)=> {
    console.log('_id',_id)
  }
  return (
    <>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button onClick={() => setIsModalOpen(true)} style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}>
          <PlusOutlined style={{ fontSize: '60px' }} />
        </Button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TableComponent
          handleDeleteManyProduct={handleDeleteManyProduct}
          data={dataTable}
          columns={columns}
          isLoading={isLoadingProducts}
          onRow={(record) => ({
            onClick: () => setRowSelected(record._id)
          })}
        />
      </div>
      <Modal title="Thêm sản phẩm" open={isModalOpen} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          form={form}
          style={{ maxWidth: '400px', margin: 'auto' }}
        >
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <InputComponent value={stateProduct.name} name="name" onChange={handleOnChange} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Ảnh"
            rules={[{ required: true, message: 'Vui lòng nhập ảnh sản phẩm!' }]}
          >
            <WrapperUploadFile onChange={handleAvatarOnChange} maxCount={1}>
              <Button>Chọn file</Button>
              {stateProduct?.image && (
                <img
                  src={stateProduct?.image}
                  style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                  alt='avatar product'
                />
              )}
            </WrapperUploadFile>
          </Form.Item>

          <Form.Item
            name="type"
            label="Thể loại"
            rules={[{ required: true, message: 'Vui lòng nhập thể loại sản phẩm!' }]}
          >
            <InputComponent value={stateProduct.type} name="type" onChange={handleOnChange} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
          >
            <InputComponent value={stateProduct.description} name="description" onChange={handleOnChange} />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Sao"
            rules={[{ required: true, message: 'Vui lòng nhập sao sản phẩm!' }]}
          >
            <InputComponent value={stateProduct.rating} name="rating" onChange={handleOnChange} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
          >
            <InputComponent value={stateProduct.price} name="price" onChange={handleOnChange} />
          </Form.Item>

          <Form.Item
            name="countInStock"
            label="Còn hàng"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm còn trong kho!' }]}
          >
            <InputComponent value={stateProduct.countInStock} name="countInStock" onChange={handleOnChange} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 14, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Form
          name="basic"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
          onFinish={onUpdateProduct}
          form={form}
          style={{ maxWidth: '400px', margin: 'auto' }}
        >
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <InputComponent value={stateProductDetail.name} name="name" onChange={handleOnChangeDetail} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Ảnh"
            rules={[{ required: true, message: 'Vui lòng nhập ảnh sản phẩm!' }]}
          >
            <WrapperUploadFile onChange={handleAvatarOnChangeDetail} maxCount={1}>
              <Button>Chọn file</Button>
              {stateProductDetail?.image && (
                <img
                  src={stateProductDetail?.image}
                  style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                  alt='avatar product'
                />
              )}
            </WrapperUploadFile>
          </Form.Item>

          <Form.Item
            name="type"
            label="Thể loại"
            rules={[{ required: true, message: 'Vui lòng nhập thể loại sản phẩm!' }]}
          >
            <InputComponent value={stateProductDetail.type} name="type" onChange={handleOnChangeDetail} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
          >
            <InputComponent value={stateProductDetail.description} name="description" onChange={handleOnChangeDetail} />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Sao"
            rules={[{ required: true, message: 'Vui lòng nhập sao sản phẩm!' }]}
          >
            <InputComponent value={stateProductDetail.rating} name="rating" onChange={handleOnChangeDetail} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
          >
            <InputComponent value={stateProductDetail.price} name="price" onChange={handleOnChangeDetail} />
          </Form.Item>

          <Form.Item
            name="countInStock"
            label="Còn hàng"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm còn trong kho!' }]}
          >
            <InputComponent value={stateProductDetail.countInStock} name="countInStock" onChange={handleOnChangeDetail} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 14, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>
      <ModalComponent title="xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk= {handleDeleteProduct}>
              <div style={{color:'black'}}>bạn có chắc muốn xóa sản phẩm này</div>
      </ModalComponent>
    </>
  );
};

export default AdminProduct;
