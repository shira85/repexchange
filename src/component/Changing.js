import React, { Component } from 'react'

export default class Changing extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    deleteExchange=()=>{
        this.props.delete(this.props.index)
    }
    
    render() {
        return (
            <div>
                <div style={{backgroundColor:'yellowgreen',borderRadius:'10px',borderStyle:'solid',width:'200px',height:'80px'}}>
                    # {this.props.index+1} <br/>
                    From {this.props.from} To {this.props.to}
                    <button onClick={this.deleteExchange}>X</button><br/>
                    {this.props.sum}= {this.props.calc}
                </div>
            </div>
        )
    }
}
