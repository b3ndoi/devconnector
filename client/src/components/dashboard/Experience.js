import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment'
import {deleteExperience} from '../../actions/profileActions';
class Experience extends Component {
    
    onDelete(id){
        this.props.deleteExperience(id);
    }
  render() {
      const experience_list = this.props.experience.map(exp => (
          <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format="DD.MM.YYYY.">{exp.from}</Moment>
                 -  
                {exp.current?'Current':<Moment format="DD.MM.YYYY.">{exp.to}</Moment>}</td>
            <td><button className="btn btn-danger " onClick={this.onDelete.bind(this,exp._id)}>Delete</button></td>
          </tr>
      ));
    return (
      <div >
        <h4 className="mb-2">Experience Credentials</h4>
    <table className="table">
        <thead>
            <tr>
                <th>Company</th>
                <th>Title</th>
                <th>Years</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {experience_list}
        </tbody>
    </table>
      </div>
    )
  }
}
Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    // deleteExperience: PropTypes.funk.isRequired,
}


export default connect(null, {deleteExperience})(Experience)