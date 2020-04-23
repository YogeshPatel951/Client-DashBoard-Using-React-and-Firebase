import React, { Component } from 'react';
import {compose} from 'redux';
import { connect } from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types'

import {notifyUser , clearNotifyState} from '../../actions/notifyAction';

import Alert from '../layout/Alert';
class Login extends Component {
    state={
        email:'',
        password:''
    };

    onChange = e => this.setState({[e.target.name] : e.target.value}) ;
    onSubmit = e => {
        e.preventDefault();
        const {firebase , notifyUser, clearNotifyState} = this.props;
        const {email, password} = this.state;
        firebase.login({
            email,
            password
        }).catch(err => notifyUser('Invalid Email or Password! ','error'));
        
        
    }


    render() {
        const {message, messageType} = this.props.notify;
        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            {message ? (
                                <Alert message={message} messageType={messageType}></Alert>
                            ): null}
                            <h1 className="text-center pb-4 pt-3">
                                <span className="text-dark">
                                    <i className="fas fa-lock"></i>{' '}
                                    Login
                                </span>
                            </h1>

                            <form className="form" onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                    type="email" 
                                    required 
                                    name="email" 
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input 
                                    type="password" 
                                    required 
                                    name="password" 
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    className="form-control"/>
                                </div>
                                <input type="submit" value="Login" className="btn btn-outline-dark btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser:PropTypes.func.isRequired
}

export default  compose( 
    firebaseConnect(),
    connect ((state, props)=>({
        notify : state.notify
    }) , {notifyUser,clearNotifyState})
    )(Login);