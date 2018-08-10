
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import TodoList from './todo_list';
import 'materialize-css/dist/css/materialize.min.css';
import AddItem from './add_item';
import React, {Component} from 'react';
import listData from '../data/todo';
import axios from 'axios';

const BASE_URL = 'http://api.reactprototypes.com';
const API_KEY = '?key=c518_demouser'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: []
        };
    }

    async addItem(item){
        // item._id = new Date().getTime;
        // this.setState({
        //     items: [item, ...this.state.items]
        // });

        const resp = await axios.post(`${BASE_URL}/todos${API_KEY}`, item);
        this.getListData();
        console.log('Server Resp:', resp);

    //    try{ 
    //     if(!item.title){
    //      throw new Error('Missing Title');   
    //     }   
    //     if(!item.details){
    //         throw new Error('Missing Details');
    //     }
    //         await axios.post(`${BASE_URL}/todos${API_KEY}`, item);
    //     this.getListData();
    //     console.log('Server Resp:', resp);
    // } catch(err){
    //     console.log('Something went wrong!:', err.message);
    // }


    }
    
    componentDidMount(){
        this.getListData();
    }

    async getListData(){
        //This is where you would call the server for your data
        //http://api.reactprototypes.com/todos?key=c418_demouser
       const resp = await axios.get(`${BASE_URL}/todos${API_KEY}`);
            this.setState({
                // items: listData
                items: resp.data.todos
            });        
        
    }
    // getListData(){
    //     //This is where you would call the server for your data
    //     //http://api.reactprototypes.com/todos?key=c418_demouser
    //     axios.get(`${BASE_URL}/todos${API_KEY}`).then((resp) => {
    //         this.setState({
    //             // items: listData
    //             items: resp.data.todos
    //         });        
    //     }).catch((err) => {
    //         console.log('There was an error!:', err.message);
    //     });
        
    // }
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
