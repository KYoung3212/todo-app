
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import TodoList from './todo_list';
import 'materialize-css/dist/css/materialize.min.css';
import AddItem from './add_item';
import React, {Component} from 'react';
import listData from '../data/todo';
import axios from 'axios';
import {Route, Switch} from 'react-router-dom';
import Home from './home';
import NotFound from './404';

import ItemDetails from './item_details';
import config from '../config';

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

        const {BASE_URL, API_KEY} = config.api;
        try{
        await axios.post(`${BASE_URL}/todos${API_KEY}`, item);
        this.getListData();
        } catch(err){
            console.log('Something went wrong!:', err.message)
        }

        // const resp = await axios.post(`${BASE_URL}/todos${API_KEY}`, item);
        // this.getListData();
        // console.log('Server Resp:', resp);

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
    
async deleteItem(id){
    const { BASE_URL, API_KEY} = config.api;
    try{
        const resp= await axios.delete(`${BASE_URL}/todos/${id + API_KEY}`)
        console.log('Delete Resp:', resp);
    }   catch(err){
        console.log('Delete Error:', err.message);
    }
}

    componentDidMount(){
        this.getListData();
    }

    async getListData(){

        const {BASE_URL, API_KEY} = config.api;

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
        console.log('To Do List:', this.state.items);
        return (
            <div className = 'container'>
                {/* <h1 className = 'center'>
                    To Do List 
                </h1> */}
                {/* <AddItem add = {this.addItem.bind(this)}/>
                <TodoList list = {this.state.items}/> */}
                {/* <Route exact path = "/" component = {Home add={this.addItem.bind(this)}/>} */}
                {/* <Route exact path = "/" component = {Home} add={this.addItem.bind(this)}/> */}
                <Switch>
                <Route exact path = "/" render = {(props)=>{
                    // return <Home add = {this.addItem.bind(this)} list = {this.state.items} {...props}/>}}/>
                    return <Home getList = {this.getListData.bind(this)} add={this.addItem.bind(this)} list = {this.state.items} {...props}/>}}/>
                <Route path = "/item-details/:item_id" render = {routeProps => {
                return <ItemDetails delete = {this.deleteItem.bind(this)}{...routeProps}/>}}/>
                <Route component = {NotFound}/>
                </Switch>
            </div>
        );
    }
}

export default App
