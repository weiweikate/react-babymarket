/**
 * Created by coin on 4/14/17.
 */
import React, {Component} from 'react';

export default class TCSeparationLine extends Component {
    constructor(props){
        super(props);
        this.state = {
            height:props.height !== undefined ? props.height : 1,
            color:props.color !== undefined ? props.color : "#f0f0f0"
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            height:nextProps.height !== undefined ? nextProps.height : 1,
            color:nextProps.color !== undefined ? nextProps.color : "#f0f0f0"
        });
    }

    render(){
        return <div style={{
                height:this.state.height,
                backgroundColor:this.state.color
            }}>
        </div>
    }
}