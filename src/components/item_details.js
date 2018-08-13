import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../config';
import axios from 'axios'

class ItemDetails extends Component {

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

    render(){
        const {itemDetails} = this.state;
        console.log('Item Details:', itemDetails);
        if(!itemDetails){
            return <h1 className="grey-text">Loading...</h1>
        }
        return(
            <div>
                <div className="center">Item Details</div>
                <div className="row">
                <div className="col s12 right-align">
                    <Link to="/" className = "btn purple darken-2">Back to List </Link>
                </div>
                </div>
                <h4><em>Title:</em>{itemDetails.title}</h4>
                <div className="row">
                <div className="col s6 center">
                    <button className = "btn blue darken-2">Toggle Complete</button>
                </div>
                <div className="col s6 cebter">
                <button onClick={this.handleDelete.bind(this)} className = "btn red darken-2">Delete</button>
                </div>
                </div>
            </div>
        )
    }
}

export default ItemDetails;