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
const AdminUser = () => {
  const user = useSelector(state => state?.user);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete,setIsModalOpenDelete] = useState(false)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [stateUser, setStateUser] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
  });
  const [stateUserDetail, setStateUserDetail] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    avatar:'',
    address:''
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUser({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    });
    form.resetFields();
  };

  const handleCancelDelete = ()=> {
    setIsModalOpenDelete(false)
  }


  const handleOnChange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value
    });
  };

  const handleOnChangeDetail = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
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
    setStateUser({
      ...stateUser,
      image: file.preview
    });
  };

  const handleAvatarOnChangeDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetail({
      ...stateUserDetail,
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

  const getAllUser = async () => {
    const res = await Service.getAllUser();
    return res;
  };

  const queryUser = useQuery({
    queryKey: ['users'],
    queryFn: getAllUser,
    retry: 3,
    retryDelay: 1000
  });
  const  { isLoading: isLoadingProducts, data: users } = queryUser
  // handle submit
  const onFinish = async () => {
    const { name, email, phone, isAdmin } = stateUser;
    mutation.mutate({
      name,
      email,
      phone,
      isAdmin,
    })
  };

  const { data, isSuccess, isLoading, isError } = mutation;

  const fetchGetDetailUser = async (id,token) => {
    const res = await Service.getDetailUser(id,token);
    setStateUserDetail({
      name: res?.data?.name,
      email: res?.data?.email,
      phone: res?.data?.phone,
      isAdmin: res?.data?.isAdmin,
      avatar: res?.data?.avatar,
      address: res?.data?.address,
    });
    return res;
  };

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailUser(rowSelected,user?.accessToken);
    }
  }, [rowSelected]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetail);
  }, [stateUserDetail]); // hiển thị giá trị trc thi thay đổi ở draw form

  const handleDetailsUser = () => {
    if (rowSelected) {
      fetchGetDetailUser(rowSelected,user?.accessToken);
    }
    setIsOpenDrawer(true);
  };

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ cursor: 'pointer' }} onClick={()=> {setIsModalOpenDelete(true)}}/>
        <EditOutlined style={{ cursor: 'pointer' }} onClick={handleDetailsUser} />
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
  });
  const dataTable = users?.data?.map(user => ({ ...user, key: user?.id, isAdmin: user?.isAdmin ? 'TRUE' : 'FALSE' }));
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter:(a,b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a,b)=> a.email - b.email, 
      ...getColumnSearchProps('name')
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      filters: [
        {
          text: 'True',
          value:true,
        },
        {
          text: 'False',
          value: false,
        }
      ],
      onFilter: (value, record) => record.isAdmin === value
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a,b)=> a.phone - b.phone, 
      ...getColumnSearchProps('name')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a,b)=> a.address - b.address, 
      ...getColumnSearchProps('address')
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

  const mutationUpdateUser = useMutation({
    mutationFn: (data) => {
      const { id, ...rest } = data;
      return Service.updateUser(id, rest);
    },
  });
  const mutationDeleteUser = useMutation({
    mutationFn: (data)=>{
      const {id} = data
      return Service.deleteUser(id)
    }
  })
  const { data: dataUpdateUser, isSuccess: isSuccessUpdateUser, isError: isErrorUpdateUser } = mutationUpdateUser
  const { data: datDeleteUser, isSuccess: isSuccessDeleteUser, isError: isErrorDeleteUser } = mutationDeleteUser;
  const onUpdateUser = () => {
    mutationUpdateUser.mutate({ id: rowSelected, ...stateUserDetail },{
      onSettled: ()=> {
          queryUser.refetch() // phải refetch lại thì nó mới hiển thị data sau update
      }
    });
  };

  const handleDeleteUser = ()=> {
      mutationDeleteUser.mutate({id: rowSelected}, {
        onSettled: ()=>{
          queryUser.refetch()
        }
      })
      handleCancelDelete()
  }
  return (
   <>
     <WrapperHeader>Quản lý người dùng</WrapperHeader>
     <div style={{marginTop: '10px'}}>
        <Button style={{height: '150px', width:'150px', borderRadius: '6px', borderStyle:'dashed'}}><PlusOutlined style={{fontSize:'60px'}}/></Button>
     </div>
     <div style={{ marginTop: '10px' }}>
        <TableComponent
          data={dataTable}
          columns={columns}
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
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
          >
            <InputComponent value={stateUser.name} name="name" onChange={handleOnChange} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Ảnh"
            rules={[{ required: true, message: 'Vui lòng nhập ảnh người dùng' }]}
          >
            <WrapperUploadFile onChange={handleAvatarOnChange} maxCount={1}>
              <Button>Chọn file</Button>
              {stateUser?.image && (
                <img
                  src={stateUser?.image}
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
            name="phone"
            label="số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập sđt người dùng' }]}
          >
            <InputComponent value={stateUser.phone} name="phone" onChange={handleOnChange} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Vui lòng nhập email người dùng' }]}
          >
            <InputComponent value={stateUser.email} name="email" onChange={handleOnChange} />
          </Form.Item>

          <Form.Item
            name="isAdmin"
            label="Admin"
            rules={[{ required: true, message: 'Vui lòng chọn admin' }]}
          >
            <InputComponent value={stateUser.isAdmin} name="isAdmin" onChange={handleOnChange} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 14, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Form
          name="basic"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
          onFinish={onUpdateUser}
          form={form}
          style={{ maxWidth: '400px', margin: 'auto' }}
        >
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
          >
            <InputComponent value={stateUserDetail.name} name="name" onChange={handleOnChangeDetail} />
          </Form.Item>

         

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại người dùng!' }]}
          >
            <InputComponent value={stateUserDetail.phone} name="phone" onChange={handleOnChangeDetail} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <InputComponent value={stateUserDetail.email} name="email" onChange={handleOnChangeDetail} />
          </Form.Item>

          <Form.Item
            name="isAdmin"
            label="Admin"
            rules={[{ required: true, message: 'Vui lòng nhập quyền admin!' }]}
          >
            <InputComponent value={stateUserDetail.isAdmin} name="isAdmin" onChange={handleOnChangeDetail} />
          </Form.Item>


            
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <InputComponent value={stateUserDetail.address} name="address" onChange={handleOnChangeDetail} />
          </Form.Item>

          <Form.Item
            name="avatar"
            label="Ảnh"
            rules={[{ required: true, message: 'Vui lòng nhập ảnh sản phẩm!' }]}
          >
          <WrapperUploadFile onChange={handleAvatarOnChange} maxCount={1}>
              <Button>Chọn file</Button>
              {stateUserDetail?.avatar && (
                <img
                  src={stateUserDetail?.avatar}
                  style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                  alt='avatar user'
                />
              )}
            </WrapperUploadFile>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 14, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          
        </Form>
      </DrawerComponent>
      <ModalComponent title="xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk= {handleDeleteUser}>
              <div style={{color:'black'}}>bạn có chắc muốn xóa người dùng này</div>
      </ModalComponent>
   </>
  )
}

export default AdminUser