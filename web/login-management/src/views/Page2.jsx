// const View= () =>{
//     return(
//         <div className='home'>
//             <p>这是Page2页面内容</p>
//         </div>
//     )
// }


import { Table,Space } from 'antd';
import React, { Component } from 'react';
import axios from 'axios';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export default class View extends Component {
  constructor() {
    super();

    this.state = {
      cinemaList: [],
    };
  }

  componentDidMount() {
    axios({
      url: "https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=9284834",
      method: "get",
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16799188762138610245566465"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      console.log(res.data.data.cinemas);

      this.setState({
        cinemaList: res.data.data.cinemas,
      });
    });
  }

  render() {
    const { cinemaList } = this.state;

    return (
      <Table columns={columns} dataSource={cinemaList} />
    );
  }
}
