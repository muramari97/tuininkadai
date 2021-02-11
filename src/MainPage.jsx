import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Button, Toolbar, Row, Col} from 'react-onsenui';
import {notification} from 'onsenui';

import SecondPage from './SecondPage.jsx';
import '../www/css/style.css';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:0,
      time:0,
      items:[],
    };
    this.addItem = this.addItem.bind(this);
    this.DisPlay = this.DisPlay.bind(this);
    this.pushPage = this.pushPage.bind(this);
  }

  pushPage(){
    this.props.navigator.pushPage({component:SecondPage});
  }

  componentDidMount(){
    document.addEventListener("DOMContentLoad",() => {
      firestore
        .collection("data")
        .get()
        .then((snapshot) => {
          if(snapshot.empty){
            console.log("no matching document");
          }

          var items = [];

          snapsshot.forEach((data) => {
            var item = data.data();

            items.push({data:item.data,time:item.data.toDate()
            });
          });
          this.setState({data:0,time:0,items:items});
        });
    });
  }

  addItem(){
    var s = this.state.data;
    if(s == 0){
      notification.alert('体温が入力されてないよ！');
      return;
    }
    var newitems = this.state.items;
    var d = new Date();
    newitems.push({data:this.state.data,time:d});
    this.setState({data:0,time:0,items:newitems});

    firestore
      .collection("data")
      .add({
        data:this.state.data,
        time:d
      })
      .then((docRef) => {
        console.log("Document written with ID:",docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document:",error);
      })
  }

  DisPlay(val){
    var s = this.state;
    if(this.state.data > 9){
      s.data = this.state.data + val/10;
    }
    else if(this.state.data > 0){
      s.data = this.state.data*10 + val;
    }
    else{
      s.data = val;
    }
    this.setState(s);
  }

  render() {
    return (
      <Page>
        <div className = "null"></div>
        <div className = "title">今日の体温</div>
        <div className = "display">{this.state.data}℃</div>
        <Row>
          <Col className = "box" onClick={() => this.DisPlay(7)}>7</Col>
          <Col className = "box" onClick={() => this.DisPlay(8)}>8</Col>
          <Col className = "box" onClick={() => this.DisPlay(9)}>9</Col>
        </Row>
        <Row>
          <Col className = "box" onClick={() => this.DisPlay(4)}>4</Col>
          <Col className = "box" onClick={() => this.DisPlay(5)}>5</Col>
          <Col className = "box" onClick={() => this.DisPlay(6)}>6</Col>
        </Row>
        <Row>
          <Col className = "box" onClick={() => this.DisPlay(1)}>1</Col>
          <Col className = "box" onClick={() => this.DisPlay(2)}>2</Col>
          <Col className = "box" onClick={() => this.DisPlay(3)}>3</Col>
        </Row>
        <Row>
          <Col></Col>
          <Col className = "box" onClick={() => this.DisPlay(0)}>0</Col>
          <Col></Col>
        </Row>
        <div className = "null"></div>
        <div className = "btn" onClick={this.addItem}>記録</div>
        <div className = "null"></div>
        <div className = "btn2" onClick={this.pushPage}>記録閲覧</div>
      </Page>
    );
  }
}