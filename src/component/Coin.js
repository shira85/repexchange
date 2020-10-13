import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class Coin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             type:'',
             newValue:'',
        }
    }
    validType=(e)=>{
        //משתנה שמכיל את התו האחרון שהוקלד ע"מ לבדוק אם הוזן תו תקין
        let char=e.target.value.slice(e.target.value.length-1,e.target.value.length);
        //משתנה שמכיל את מיקום התו , במידה ואינו תקין לא יהיה ניתן להקלידו
        let index=e.target.value.indexOf(char);
        //אם התו לא בטווח התווים שבתנאי- הוא לא יוקלד
        if(char>='A'&& char<='Z'||char>='a'&& char<='z')
        {
            this.setState({type:e.target.value})
        }
        else
        {
            e.target.value = (e.target.value.slice(0,index));
            this.setState({type:e.target.value})
        }
    }
    validNewValue=(e)=>{
        this.setState({newValue:e.target.value})
    }
    updateCoinList=()=>{
        let index='';
        //מיון על אברי המערך, עד שנמצא מטבע שנרצה לעדכן
        this.props.coin.filter((e,i)=>
        //המרת 2 הערכים לאותיות קטנות, כאשר יכנס ערך הוא לא יכנס כפול בגלל חוסר התאמה בין אותיות קטנות לגדולות
        {if(e.type.toLowerCase()===this.state.type.toLowerCase()){
            //אם המטבע קיים במערך המטבעות, נשמור את האינדקס שלו ונשלח עם פרופס
            index=i;
            this.props.update(this.state.type,this.state.newValue,index)
        }
        if(index==='')
        {
            // אם המטבע לא קיים- ניצור מטבע חדש ונוסיף לרשימת המטבעות
            this.props.add(this.state.type,this.state.newValue)
        }
         })
        
    }
    
    render() {
        return (
            <div>
                <h1>UPDATE</h1>
                <div>
                    <table style={{border:'solid',borderCollapse:'collapse'}}>
                        <th style={{border:'solid'}}>Type</th>
                        <th style={{border:'solid'}}>Value</th>
                        {this.props.coin.map((e)=><tr style={{border:'solid'}}><td style={{border:'solid'}}>{e.type}</td><td style={{border:'solid'}}>{e.value}</td></tr>)}
                    </table>
                </div>
                
                type: <input onChange={this.validType} type='text'/><br/>
                new value: <input onChange={this.validNewValue} type='number'/>
                <div>
                    <Link to='/'><button>Back</button></Link> <button onClick={this.updateCoinList} disabled={!(this.state.type && this.state.newValue)}>Update</button>
                </div>
            </div>
        )
    }
}
