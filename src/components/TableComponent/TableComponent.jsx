import { Table } from 'antd';
import React, { useState } from 'react';

const TableComponent = (props) => {
  const { selectionType = 'checkbox', data = [], columns = [], isLoading = false, handleDeleteManyProduct } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
      console.log(selectedRowKeys); // In ra các khóa dòng đã chọn để kiểm tra
    },
  };

  const handleDeleteAll = () => {
    console.log('Các id được chọn để xóa:', rowSelectedKeys); // In ra các id để kiểm tra
    handleDeleteManyProduct(rowSelectedKeys);
  };

  return (
    <div>
      {rowSelectedKeys.length > 0 && (
        <div
          style={{
            background: '#1d1ddd',
            color: '#fff',
            fontWeight: 'bold',
            padding: '10px',
            cursor: 'pointer',
          }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </div>
      )}
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        {...props}
      />
    </div>
  );
};

export default TableComponent;
