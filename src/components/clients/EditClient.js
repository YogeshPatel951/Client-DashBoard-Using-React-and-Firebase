import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import { connect } from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';


class EditClient extends Component {
    constructor(props){
        super(props);
        this.firstNameInput=React.createRef();
        this.lastNameInput=React.createRef();
        this.emailInput=React.createRef();
        this.phoneInput=React.createRef();
        this.balanceInput=React.createRef();

    }

    onSubmit=e=>{
        e.preventDefault();
        const {client, firestore, history}=this.props;
        const updClient={
            firstName:this.firstNameInput.current.value,
            lastName:this.lastNameInput.current.value,
            email:this.emailInput.current.value,
            phone:this.phoneInput.current.value,
            balance:this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value
        }
        firestore.update({collection:'clients',doc:client.id},updClient).then(history.push('/'));
    }
    render() {
        const {client} = this.props
        const {disableBalanceOnEdit} = this.props.settings;
        if(client){
            return (
                <div>
                <div className="row mb-3 mx-1">
                    <div className="cold-md-6">
                        <Link to='/' className="btn  btn-dark">
                            <i className="fas fa-arrow-circle-left"></i> Back to DashBoard
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">Edit Client</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input 
                                type="text" 
                                name="firstName" 
                                minLength="2"
                                className="form-control"
                                required
                                onChange={this.onChange}
                                ref={this.firstNameInput}
                                defaultValue={client.firstName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input 
                                type="text" 
                                name="lastName" 
                                minLength="2"
                                className="form-control"
                                required
                                ref={this.lastNameInput}
                                onChange={this.onChange}
                                defaultValue={client.lastName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                type="email" 
                                name="email" 
                                className="form-control"
                                required
                                ref={this.emailInput}
                                onChange={this.onChange}
                                defaultValue={client.email}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input 
                                type="tel" 
                                name="phone" 
                                minLength="10"
                                className="form-control"
                                required
                                ref={this.phoneInput}
                                onChange={this.onChange}
                                defaultValue={client.phone}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="balance">Balance</label>
                                <input 
                                type="tel" 
                                name="balance" 
                                className="form-control"
                                ref={this.balanceInput}
                                onChange={this.onChange}
                                defaultValue={client.balance}
                                disabled={disableBalanceOnEdit}
                                />
                            </div>
                            <input type="submit" value="Update" className="btn btn-dark btn-block"/>
                        </form>
                    </div>
                </div>
            </div>

            )
        }else{
            return <Spinner></Spinner>
        }
        
    }
}

EditClient.propTypes={
    firestore:PropTypes.object.isRequired
}


export default  compose(
    firestoreConnect( props=> [
        { collection:'clients' , storeAs:'client', doc:props.match.params.id}
    ]),
    connect(({ firestore:{ordered}, settings} ,props)=>({
      client : ordered.client && ordered.client[0],
      settings
    }))
)(EditClient);