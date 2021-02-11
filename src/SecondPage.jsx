import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar,Page,Button,BackButton,Card} from 'react-onsenui';

export default class Item extends React.Component{
  constructor(props){
    super(props);
    this.ChageData = this.ChangeData.bind(this);
  }

  ChangeData(){
    var s = this.state.items;
    if(s == 0){
      return;
    }
    for(var i=0;i < s.length-2;i++){
      for(var j=i+1;j < s.length-1;j++){
        if(s[i].time < s[j].time){
          box = s[i];
          s[i] = s[j];
          s[j] = s[i];
        }
      }
    }
    this.setState({items:s});
  }

  renderToolbar(){
    return(
      <Toolbar>
        <div className="left"><BackButton>戻る</BackButton></div>
        <div className="center">記録閲覧</div>
      </Toolbar>
    );
  }

  render(){
    return(
      <Page>
        <p>体温：{this.props.data+"℃"}</p>
        <p>記録日：{this.props.time.getFullYear()+"年"+(this.props.time.getMonth()+1)+"月"+this.props.time.getDate()+"日"+this.props.time.getHours()+"時"+this.props.time.getMinutes()+"分"+this.props.time.getSeconds()+"秒"}</p>
      </Page>
    )
  }
}
