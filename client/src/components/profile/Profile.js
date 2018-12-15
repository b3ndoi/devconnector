import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropType from 'prop-types'

import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileCreds from './ProfileCreds'
import ProfileGithub from './ProfileGithub'
import Spinner from '../common/Spinner'

import {getProfileByHandle} from '../../actions/profileActions'

class Profile extends Component {


componentDidMount(){
    if(this.props.match.params.handle){
        this.props.getProfileByHandle(this.props.match.params.handle)
    }
}
componentWillReceiveProps(nextProps){
    if(nextProps.profile.profile === null && this.props.profile.loading)
    {
        this.props.history.push('/not-found')
    }
}
  render() {
      const {profile, loading} = this.props.profile;
      let profileContent;
      if(profile === null || loading === true){
          profileContent = <Spinner />
      }else{
        profileContent =<div>
              <div className="row">
                  <div className="col-md-6">
                    <Link to='/prfiles' className="btn btn-light mb-3 float-left">
                        Back to profiles
                    </Link>
                  </div>
                  <div className="col-md-6"></div>
              </div>
                <ProfileHeader profile = {profile}/>
                <ProfileAbout  profile = {profile} />
                <ProfileCreds profile = {profile} />
                {profile.github?(<ProfileGithub username={profile.github}/>):null}
                
          </div>
      }
    return (
      <div className="profile">
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                    {profileContent}
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

Profile.propTypes = {
    profile: PropType.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfileByHandle})(Profile)