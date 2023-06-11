import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import './css/UpLoad.css'
import axios from "axios";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./Login/AuthContext"

const { Dragger } = Upload;

const App = () => {

  const loginAPIRes = JSON.parse(localStorage.getItem("myloginAPIRes"));

  const onFinish = async (file) => {
    let token = localStorage.getItem("login-react-management-token");

    const formData = new FormData();
    formData.append('fileupload', file);
    formData.append('userid', loginAPIRes.user.ID)
    formData.append('path', '/'+loginAPIRes.user.ID+file.webkitRelativePath || file.path || ''); // Get the file path
    formData.append('folderid', loginAPIRes.folder.ID);
    // console.log(file);
    // console.log(loginAPIRes.userid)

    axios.post('http://localhost:3000/api/v1/files/upload',formData,{
      headers:{
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        message.success(`${file.name} file uploaded successfully.`);
        console.log(loginAPIRes,response);
      })
      .catch(error => {
        message.error(`${file.name} file upload failed.`);
        console.log(error);
      })
  };

  return (
    <AuthProvider>
      <div className="center-container">
        <div className="small-dragger">
          <Dragger customRequest={({ file }) => onFinish(file)}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域以上传</p>
            <p className="ant-upload-hint">
              支持单次或批量上传。严格禁止上传公司数据或其他被禁止的文件。
            </p>
          </Dragger>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
// const props = {
//   name: 'file',
//   multiple: true,
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   data:{
//     'user_id':'loginAPIRes.user.ID',
//     'path':'',
//     'folder_id':'',
//   },

//   onChange(info) {
//     const { status, path} = info.file;
//     if (status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully.`);
//       console.log(loginAPIRes);
//     }
//     else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }

//     //更新路径信息
//     props.data.path = path;
//   },
//   onDrop(e) {
//     console.log('Dropped files', e.dataTransfer.files);
//   },
// };

// const App = () => (
//    <div  className="center-container">
//     <div className="small-dragger">
//     <Dragger {...props}>
//         <p className="ant-upload-drag-icon">
//         <InboxOutlined />
//         </p>
//         <p className="ant-upload-text">单击或拖动文件到此区域以上传</p>
//         <p className="ant-upload-hint">
//         支持单次或批量上传。严格禁止上传公司数据或其他被禁止的文件。
//         </p>
//     </Dragger>
//   </div>
//  </div>
// );
// export default App;