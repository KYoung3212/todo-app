import React, {Component} from 'react';
import listData from '../data/todo';
import TodoItem from './todo_item';

class TodoList extends Component{
    constructor(props){{
        super(props);
    }}
    render(){
        console.log(listData);
        // const listElements = listData.map((item, index) => {
        const listElements = this.props.list.map((item, index) => {

            // return <li className = 'collection-item' key = {item._id}>{item.title}</li>  
            return <TodoItem key = {item._id} id={item._id} title = {item.title}/>;
        });
        return (
                <ul className = "collection">{listElements}</ul>
        )
    }
}
export default TodoList;