import React, {Component} from 'react';
import listData from '../data/todo';

class TodoList extends Component{
    constructor(props){{
        super(props);
    }}
    render(){
        console.log(listData);
        // const listElements = listData.map((item, index) => {
        const listElements = this.props.list.map((item, index) => {

            return <li className = 'collection-item' key = {item._id}>{item.title}</li>  
        });
        return (
                <ul className = "collection">{listElements}</ul>
        )
    }
}
export default TodoList;