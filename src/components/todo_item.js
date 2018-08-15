import React from 'react';
import {Link} from 'react-router-dom';

export default (props) => {
    return (
        <li className = "collection-item">
            <Link to ={`/item-details/${props.id}`}>{props.title}</Link>
            <button className={!props.complete ? 'btn blue darken-2 col s2 right' : 'btn green darken-2 col s2 right'}>{!props.complete ? "Not Completed" : "Completed"}</button>

            <button className = "btn red darken-2 right">Delete</button>

        </li>
    );
}