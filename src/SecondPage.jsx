import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar,Page,Button,BackButton,Card} from 'react-onsenui';

export default class Item extends React.Component{
  constructor(props){
    super(props);
    this.state = {items:[]};
  }

  componentDidMount(){
    firestore
      .collection("data")
      .get()
      .then((snapshot) => {
        if(snapshot.empty){
          console.log("no matching document");
        }

        var items = [];
        snapshot.forEach((data) => {
          var item = data.data();
          items.push({data:item.data,time:item.time.toDate()
          });
        });
        const newitems = [...items].sort((a,b) => b.time - a.time);
        this.setState({items:newitems});
      });
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
      <Page renderToolbar={this.renderToolbar}>
        {this.state.items.map((item) => (
            <p className="List">{item.time.getFullYear()+"年"+(item.time.getMonth()+1)+"月"+item.time.getDate()+"日"+item.time.getHours()+"時"+item.time.getMinutes()+"分"+item.time.getSeconds()+"秒　　"+item.data+"℃"} </p>
        ))}
      </Page>
    )
  }
}
