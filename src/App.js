import React, { Component } from 'react'
import './App.css';
import {HashRouter as Router,Switch,Route} from 'react-router-dom';
import Exchange from './component/Exchange.js';
import Coin from './component/Coin.js';

export default class App extends Component {
  state={
    listCoins:[{type:'Dollar',value:4},{type:'Euro', value: 5},{type:'Shekel',value:1}],
    exchange:[],
  }

  updateValue=(type,value,index)=>
  {
    this.state.listCoins[index].type=type;
    this.state.listCoins[index].value=value;
    this.setState({listCoins:[...this.state.listCoins]})
  }

  addType=(type,value)=>{
    this.setState({listCoins:[...this.state.listCoins,{type,value}]})
  }
  // הוספת המרה למערך ההמרות
  addExchange=(from,to,sum,calc)=>{
    this.setState({exchange:[...this.state.exchange,{from,to,sum,calc}]})
  }
  deleteExchange=(index)=>{
      let temp=this.state.exchange.filter((item,indx)=>(indx!=index)); //לא נשתמש באייטם אבל חייב לכתוב אותו על מנת לקבל את הערך השני
      this.setState({exchange:[...temp]});
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
          <Route exact path='/'component={()=>{return <Exchange coin={this.state.listCoins} addExchange={this.addExchange} exchange={this.state.exchange} delete={this.deleteExchange}/>}}/>
          <Route exact path='/coin'component={()=>{return <Coin coin={this.state.listCoins} update={this.updateValue} add={this.addType}/>}}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
