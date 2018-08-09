
import React from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import TodoList from './todo_list';
import 'materialize-css/dist/css/materialize.min.css'

const App = () => (
    <div className = 'container'>
        <h1 className = 'center'>
            To Do List 
        </h1>
        <TodoList />
    </div>
);

export default App;
