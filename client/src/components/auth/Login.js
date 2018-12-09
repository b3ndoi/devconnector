import React, { Component } from 'react'
import classnames from 'classnames'
export default class Login extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            password:'',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e){
      this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e){
        const {email, password} = this.state;
        const newUser = { email, password};
        e.preventDefault();
        console.log(newUser);
    }
    render() {
    const {errors} = this.state
    return (
      
        <div className="login">
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your DevConnector account</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <input 
                    type="email" 
                    value = {this.state.email}  
                    onChange={this.onChange}  
                    className={classnames("form-control form-control-lg", {
                        'is-invalid': errors.email
                      }) }
                    placeholder="Email Address" 
                    name="email" 
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                    <input 
                    type="password" 
                    value = {this.state.password}  
                    onChange={this.onChange} 
                    className={classnames("form-control form-control-lg", {
                        'is-invalid': errors.password
                      }) }
                    placeholder="Password" 
                    name="password" 
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
                </div>
            </div>
            </div>
      </div>
    )
  }
}
