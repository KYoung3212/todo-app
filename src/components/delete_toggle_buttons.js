import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../config';
import axios from 'axios';

class DeleteToggle extends Component {

    state = {
        itemDetails: null
    }
    async componentDidMount(){
        console.log('Item Details Props', this.props.match.params);
        const {item_id} = this.props.match.params;
        const {BASE_URL, API_KEY} = config.api;
        const resp = await axios.get(`${BASE_URL}/todos/${item_id + API_KEY}`);
        // console.log('Item Details Resp:', resp);
        this.setState({
            itemDetails: resp.data.todo
        });
    }

    async handleDelete(){
        console.log('Delete Item:', this.state.itemDetails._id);
        await this.props.delete(this.state.itemDetails._id);
        this.props.history.push('/');
    }

    async handleToggleComplete(){
        // console.log('Toggle Complete:', this.state.itemDetails._id);
        const todoItem = await this.props.toggleComplete(this.state.itemDetails._id);
        console.log('Item details Toggle Complete resp:', todoItem);
        this.setState({
            itemDetails: todoItem
        })

    }
    render(){
        const {itemDetails} = this.state;
        return(
        <div className="row">
        <div className="col s6 center">
            <button onClick = {this.handleToggleComplete.bind(this)} className = "btn blue darken-2">Toggle Complete</button>
        </div>
        <div className="col s6 cebter">
        <button onClick={this.handleDelete.bind(this)} className = "btn red darken-2">Delete</button>
        </div>
        </div>
    )
}
}
export default DeleteToggle;