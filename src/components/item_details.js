import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ItemDetails extends Component {
    render(){
        return(
            <div>
                <div className="center">Item Details</div>
                <div className="row">
                <div className="col s12 right-align">
                    <Link to="/" className = "brn purple darken-2">Back to List </Link>
                </div>
                </div>
            </div>
        )
    }
}

export default ItemDetails;