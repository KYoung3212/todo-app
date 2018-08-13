import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../config';
import axios from 'axios'

class ItemDetails extends Component {

    state = {
        itemDetails: {}
    }
    async componentDidMount(){
        console.log('Item Details Props', this.props.match.params);
        const {item_id} = this.props.match.params;
        const {BASE_URL, API_KEY} = config.api;
        const resp = await axios.get(`${BASE_URL}/todos/${item_id + API_KEY}`);
        // console.log('Item Details Resp:', resp);
        this.setState({
            itemDetails: resp.data.todo
        })
    }

    render(){
        const {itemDetails} = this.state;
        console.log('Item Details:', itemDetails);
        return(
            <div>
                <div className="center">Item Details</div>
                <div className="row">
                <div className="col s12 right-align">
                    <Link to="/" className = "brn purple darken-2">Back to List </Link>
                </div>
                </div>
                <h4><em>Title:</em>{itemDetails.title}</h4>
            </div>
        )
    }
}

export default ItemDetails;