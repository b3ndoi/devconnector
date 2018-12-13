import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import  { connect } from 'react-redux'
import {registerUser} from '../../actions/authActions'


import TextFieldGroup from '../common/TextFieldGroup'

class Register extends Component {
  constructor(){
      super()
      this.state = {
          name:'',
          email:'',
          password:'',
          password2:'',
          errors: {}
      }
      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }

  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard')
    }
  }
  onSubmit(e){
      const {name, email, password,  password2} = this.state;
      const newUser = {name, email, password,  password2};
      e.preventDefault();

      this.props.registerUser(newUser, this.props.history)
      console.log(newUser);
  }
  render() {
    const {errors} = this.state;

    return (
        <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form  onSubmit={this.onSubmit}>
                
                <TextFieldGroup
                  type="text" 
                  value={this.state.name}
                  onChange={this.onChange}  
                  placeholder="Name" 
                  name="name"
                  error = {errors.name}
                />
                <TextFieldGroup
                  type="email"
                  value = {this.state.email}
                  onChange={this.onChange}  
                  placeholder="Email Address" 
                  name="email" 
                  error = {errors.email}
                  info = "This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                
                <TextFieldGroup
                  type="password" 
                  value = {this.state.password}  
                  onChange={this.onChange}  
                  placeholder="Password" 
                  name="password"
                  error = {errors.password}
                />
                <TextFieldGroup
                  type="password" 
                  value = {this.state.password2}  
                  onChange={this.onChange}  
                  placeholder="Password" 
                  name="password2"
                  error = {errors.password2}
                />
                
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})
export default connect(mapStateToProps, { registerUser })(withRouter(Register))