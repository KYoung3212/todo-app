import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../config';
import axios from 'axios';
import Modal from 'react-modal';

// import DeleteToggle from './delete_toggle_buttons'
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


class ItemDetails extends Component {

    constructor() {
        super();
     
    this.state = {
        modalIsOpen: false,
        itemDetails: null
      };
   
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
   
    openModal() {
      this.setState({modalIsOpen: true});
    }
   
    afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = '#f00';
    }
   
    closeModal() {
      this.setState({modalIsOpen: false});
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

    async handleToggleComplete(){
        // console.log('Toggle Complete:', this.state.itemDetails._id);
        const todoItem = await this.props.toggleComplete(this.state.itemDetails._id);
        console.log('Item details Toggle Complete resp:', todoItem);
        this.setState({
            itemDetails: todoItem
        })

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
                <h4><em>Title: </em>{itemDetails.title}</h4>
                <h5>
                    {
                        itemDetails.complete
                        ? (<div>
                            <div className= 'card-panel blue'>Item Complete</div>
                        <h4><em>Name of todo item: </em>{itemDetails.title}</h4>
                        <h4><em>Item ID: </em>{itemDetails._id}</h4>
                        <h4><em>Item Complete: </em>{itemDetails.completed}</h4>
                        <h4><em>Name of userID: </em>{itemDetails.userId}</h4>

                        </div>
                    )
                        :
                        (<div>
                            <div className= 'card-panel red'>Item Not Yet Complete</div>
                        <h4><em>Name of todo item: </em>{itemDetails.title}</h4>
                        <h4><em>Item ID: </em>{itemDetails._id}</h4>
                        <h4><em>Item Complete: </em>{itemDetails.completed}</h4>
                        <h4><em>Name of userID: </em>{itemDetails.userId}</h4>

                        </div>
                    )
                    }
                </h5>
                <div className="row">
                <div className="col s6 center">
                    <button onClick = {this.handleToggleComplete.bind(this)} className = "btn blue darken-2">Toggle Complete</button>
                </div>
                <div className="col s6 center">
                {/* <button onClick={this.handleDelete.bind(this)} className = "btn red darken-2">Delete</button> */}
                <button onClick={this.openModal} className = "btn red darken-2">Delete</button>
                
                
                </div>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
            
                    <h2 ref={subtitle => this.subtitle = subtitle}>Are you sure you want to delete?</h2>
                    <button onClick={this.closeModal}>NO</button>
                    <button onClick={this.handleDelete.bind(this)}>YES</button>
                </Modal>


                </div>
                {/* <DeleteToggle/> */}
            </div>
        )
    }
}

export default ItemDetails;