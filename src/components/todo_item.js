import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import axios from 'axios';
import config from '../config';

class Item extends Component {
    constructor(props){
        super(props);
        console.log(this.props);

    }
    async handleDelete(){
        await this.props.delete(this.props.id);
        // this.props.history.push('/');
        this.props.getList();
    }


    render(){
    
    return (
        <li className = "collection-item">
            <Link to ={`/item-details/${this.props.id}`}>{this.props.title}</Link>
            <button className={!this.props.complete ? 'btn blue darken-2 col s2 right' : 'btn green darken-2 col s2 right'}>{!this.props.complete ? "Not Completed" : "Completed"}</button>

            <button onClick = {this.handleDelete.bind(this)}  className = "btn red darken-2 right">Delete</button>

        </li>
    );
}
}

export default Item;