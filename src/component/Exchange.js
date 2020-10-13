import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Changing from './Changing.js';

export default class Exchange extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             fromType:'',
             toType:'',
             sumToExchange:'',
             showExchangeList:false,
        }
    }

    fromType=(e)=>{
        this.setState({fromType:e.target.value})
    }
    toType=(e)=>{
        this.setState({toType:e.target.value})

    }
    sumToExchange=(e)=>{
        this.setState({sumToExchange:e.target.value})
    }

    showList=()=>{
        if(this.state.showExchangeList==true)
        //debugger
        {
           
            return(<div>
                {this.props.exchange.map((e,i)=>{
                return(
                    <Changing index={i} from={e.from} to={e.to} sum={e.sum} calc={e.calc} delete={this.props.delete}/>
                )
            })}
            </div>
            )
        }
    }

    exchangeCoin=()=>{
        //debugger
        let calc;
        let valFrom=this.props.coin.filter(e=>e.type==this.state.fromType);
        let valTo=this.props.coin.filter(e=>e.type==this.state.toType);
        //נחלק את סוג המטבע שממנו נמיר לסוג המטבע שאליו נמיר לפי הערכים בטבלה ואז נכפיל בכמות המטבעות
        calc=((valFrom[0].value/valTo[0].value)*this.state.sumToExchange);
        //console.log(calc);
        this.props.addExchange(this.state.fromType,this.state.toType,this.state.sumToExchange,calc)
       
    }
    viewExchange=()=>{
        this.setState({showExchangeList:!this.state.showExchangeList})
    }
    
    render() {
        
        return (
            <div style={{backgroundColor:'yellow', width:'30%',marginLeft:'20%',height:'300px'}}>
                <h1 style={{textAlign:'center'}}>Exchange</h1>
                <div >
                    From:<div style={{width:'20px',height:'20px', float:'left'}}></div>
                    <select onChange={this.fromType}>
                        <option selected disabled hidden>type</option>
                        {this.props.coin.map((e)=><option value={e.type}>{e.type}</option>)}
                    </select>
                    <input onChange={this.sumToExchange} type='number' placeholder='Enter sum exchange'/>
                </div>
                <br/>
                <div>
                    To: <div style={{width:'20px',height:'20px', float:'left'}}></div>
                    <select  onChange={this.toType}>
                        <option selected disabled hidden>type</option>
                        {this.props.coin.map((e)=><option value={e.type}>{e.type}</option>)}
                    </select>
                </div>
                <br/>
                <br/>
                {/**אם שלושת הערכים או אפילו אחד מהם ריק, הכפתור לא פעיל */}
                <button onClick={this.exchangeCoin} disabled={!(this.state.toType && this.state.fromType && this.state.sumToExchange)} style={{position:'relative', left:'100px'}}>start</button>
                <br/>
                <Link to='/coin' ><button>Update</button></Link><button><a href="http://facebook.com">Share on facebook</a></button><button onClick={this.viewExchange}>View your Exchange list</button>
            <div>
            {this.showList()}
            </div>
            </div>
        )
    }
}
