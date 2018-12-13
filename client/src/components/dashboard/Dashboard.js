import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile, deleteAccount, clearCurrentProfile} from '../../actions/profileActions'
import {Link} from 'react-router-dom'
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions'
import {logoutUser} from '../../actions/authActions'

import Experience from './Experience';
import Education from './Education';

 class Dashboard extends Component {
  componentDidMount(){
      this.props.getCurrentProfile();
  }
  onDeleteClick(e){
      e.preventDefault();
      this.props.deleteAccount();
      this.props.logoutUser();
      this.props.clearCurrentProfile();
  }
  render() {
    const {user} = this.props.auth;
    const {profile, loading} = this.props.profile
    let dashboardContent;
    // let test = Object.keys(profile);
    // console.log(test)
    if(profile === null || loading){
        dashboardContent = <Spinner />;
    }else{
        if(Object.keys(profile).length > 0){
            
            dashboardContent = (
                <div>
                    <p className="lead text-muted">Welcom <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                    <ProfileActions/>
                    <Experience experience={profile.expirience}/>
                    <Education  education =  {profile.education}/>
                    <div style={{marginBottom: '60px'}}>
                        <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Accoun</button>
                    </div>
                </div>
            )
        }else{
            dashboardContent =(
                <div>
                    <p className="lead text-muted">Welcom {user.name}</p>
                    <p>You have not setup a profile, please add some info.</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                </div>
            )
        }
        
    }

    return (
      <div className="dashboard">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4">Dashboard</h1>
                    {dashboardContent}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    profile: state.profile,
    auth: state.auth,
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount,clearCurrentProfile,logoutUser})(Dashboard)
