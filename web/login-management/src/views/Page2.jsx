import { Button, Space, Table } from 'antd';
import { FileTextOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

const columns = [
  {
    title: '文件名',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: '文件修改时间',
    dataIndex: 'mtime',
    key: 'mtime',
    sorter: (a, b) => a.mtime.localeCompare(b.mtime),
    sortDirections: ['ascend', 'descend'],
  },
];

const App = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cinemaList, setCinemaList] = useState([]);

  const deleteFiles = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed:', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleSelectAll = (selected, selectedRows, changeRows) => {
    const keys = selectedRows.map((item) => item.key);
    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelectAll: handleSelectAll,
  };

  const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    axios({
      url: "https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=9284834",
      method: "get",
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16799188762138610245566465"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      console.log(res.data.data.cinemas);

      setCinemaList(res.data.data.cinemas.map((cinema, index) => ({
        ...cinema,
        key: index.toString(),
      })));
    });
  }, []);

  return (
    <div>
      <div style={{ background: '#acc4ea', padding: '16px', marginBottom: '16px' }}>
        <Space wrap>
          <Button type="primary" ghost>
            上传文件
          </Button>
          
          <Button type="dashed" ghost>
           新建文件夹
          </Button>
          
          <FileTextOutlined />
          <FolderOpenOutlined />
        </Space>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Button onClick={deleteFiles} disabled={!hasSelected} loading={loading}>
          删除文件
        </Button>
        <span style={{ marginLeft: '8px' }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={cinemaList}
        onChange={(_, __, sorter) => {
          console.log('sorter', sorter);
        }}
      />
    </div>
  );
};


export default App;
