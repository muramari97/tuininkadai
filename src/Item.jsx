import React from 'react';
import ReactDOM from 'react-dom';
import {Card} from 'react-onsenui';

export default class Item extends React.Component{
  constructor(props){
    super(props);

  }

  renderToolbar(){
    return(
      <Toolbar>
      </Toolbar>
    );
  }

  render(){
    return(
      <Card>
        <p>体温：{this.props.data+"℃"}</p>
        <p>記録日：{this.props.time.getFullYear()+"年"+(this.props.time.getMonth()+1)+"月"+this.props.time.getDate()+"日"+this.props.time.getHours()+"時"+this.props.time.getMinutes()+"分"+this.props.time.getSeconds()+"秒"}</p>
      </Card>
    )
  }
}