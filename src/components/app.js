
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import TodoList from './todo_list';
import 'materialize-css/dist/css/materialize.min.css';
import AddItem from './add_item';
import React, {Component} from 'react';
import listData from '../data/todo'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: []
        };
    }

    addItem(item){
        item._id = new Date().getTime;
        this.setState({
            items: [item, ...this.state.items]
        });
    }
    componentDidMount(){
        this.getListData();
    }
    getListData(){
        //This is where you would call the server for your data
        this.setState({
            items: listData
        });
    }
    render(){
        console.log('App State: ', this.state);
        return (
            <div className = 'container'>
                <h1 className = 'center'>
                    To Do List 
                </h1>
                <AddItem add = {this.addItem.bind(this)}/>
                <TodoList list = {this.state.items}/>
            </div>
        );
    }
}

export default App
