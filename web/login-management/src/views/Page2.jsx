import { Button, Space, Table, Input } from 'antd';
import { FileTextOutlined, FolderOpenOutlined, AudioOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;
const onSearch = (value) => console.log(value);

const App = () => {
  let token = localStorage.getItem("login-react-management-token");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [folderData, setFolderData] = useState(null);
  const [newFolderName, setNewFolderName] = useState('');
  const navigateto = useNavigate();

  const deleteFiles = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const uploadFile = () => {
    navigateto("/page5");
  };

  const handleNewFolder = () => {
    const folder = {
      name: newFolderName,
      path: `/8/${newFolderName}`,
      user_id: 3,
      parent_id: 3,
    };

    const payload = {
      folder: folder,
      user: { id: 3 },
    };

    axios.post("http://localhost:3000/api/v1/folders/create", payload, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
      .then((response) => {
        console.log("Folder created successfully:", response.data);
        // 获取返回的文件夹 ID
        const folderId = response.data.folder.ID;
        // 通过请求获取文件夹数据
        axios
          .get(`http://localhost:3000/api/v1/folders/${folderId}`, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then((response) => {
            const folder = response.data.folder;
            const children = folder.Children || [];
            const files = folder.Files || [];

            const updatedChildren = children.map((child) => ({
              key: child.ID + 1000,
              name: child.name,
              mtime: formatDate(child.UpdatedAt),
            }));

            const updatedFiles = files.map((file) => ({
              key: file.ID,
              name: file.filename,
              mtime: formatDate(file.UpdatedAt),
              path: file.path,
            }));

            const updatedData = {
              folder: {
                ...folder,
                Children: updatedChildren,
                Files: updatedFiles,
              },
              status: response.data.status,
            };

            setFolderData(updatedData);
            setNewFolderName(''); // 清空输入框的值
          })
          .catch((error) => {
            console.error('Error fetching folder data:', error);
          });
      })
      .catch((error) => {
        console.error("Error creating folder:", error);
        // Handle the error
      });
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

  const handleFolderClick = (record) => {
    let folderId = record.key - 1000;
    axios
      .get(`http://localhost:3000/api/v1/folders/${folderId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        const folder = response.data.folder;
        const children = folder.Children || [];
        const files = folder.Files || [];

        const updatedChildren = children.map((child) => ({
          key: child.ID + 1000,
          name: child.name,
          mtime: formatDate(child.UpdatedAt),
        }));

        const updatedFiles = files.map((file) => ({
          key: file.ID,
          name: file.filename,
          mtime: formatDate(file.UpdatedAt),
          path: file.path,
        }));

        const updatedData = {
          folder: {
            ...folder,
            Children: updatedChildren,
            Files: updatedFiles,
          },
          status: response.data.status,
        };

        setFolderData(updatedData);
      })
      .catch((error) => {
        console.error('Error fetching folder data:', error);
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/folders/3', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        const folder = response.data.folder;
        const children = folder.Children || [];
        const files = folder.Files || [];

        const updatedChildren = children.map((child) => ({
          key: child.ID + 1000,
          name: child.name,
          mtime: formatDate(child.UpdatedAt),
        }));

        const updatedFiles = files.map((file) => ({
          key: file.ID,
          name: file.filename,
          mtime: formatDate(file.UpdatedAt),
          path: file.path,
        }));

        const updatedData = {
          folder: {
            ...folder,
            Children: updatedChildren,
            Files: updatedFiles,
          },
          status: response.data.status,
        };

        setFolderData(updatedData);
      })
      .catch((error) => {
        console.error('Error fetching folder data:', error);
      });
  }, []);

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return formattedDate;
  };

  const columns = [
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
      render: (text, record) => {
        if (record.path) {
          return (
            <>
              <FileTextOutlined />
              <a href={record.path}>{text}</a>
            </>
          );
        } else {
          return (
            <>
              <FolderOpenOutlined />
              <a onClick={() => handleFolderClick(record)}>{text}</a>
            </>
          );
        }
      },
    },
    {
      title: '文件修改时间',
      dataIndex: 'mtime',
      key: 'mtime',
      sorter: (a, b) => a.mtime.localeCompare(b.mtime),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleSharedAction(record)}>
          共享
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ background: '#acc4ea', padding: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Button onClick={uploadFile} type="primary" ghost size="small">
            上传文件
          </Button>
          <Button onClick={deleteFiles} disabled={!selectedRowKeys.length} loading={loading} size="small" style={{ marginLeft: '8px' }}>
            删除文件
          </Button>
          <Input
            placeholder="输入"
            style={{ height: '25px', width: '100px', marginLeft: '8px' }}
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <Button type="dashed" ghost size="small" onClick={handleNewFolder}>
            新建文件夹
          </Button>
        </div>
        <div>
          <Search placeholder="搜索" onSearch={onSearch} enterButton style={{ marginLeft: '8px' }} />
        </div>
      </div>

      {folderData && (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={[...folderData.folder.Children, ...folderData.folder.Files]}
          onChange={(_, __, sorter) => {
            console.log('sorter', sorter);
          }}
        />
      )}
    </div>
  );
};

export default App;







