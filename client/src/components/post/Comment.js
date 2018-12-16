import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {deleteComment} from '../../actions/postActions'
 class Comment extends Component {
    onDeleteClick(postId, id){
        this.props.deleteComment(postId, id);
    }
  render() {

    const {comment, auth, postId} = this.props
    return (
    <div className="card card-body mb-3" >
        <div className="row">
            <div className="col-md-2">
            <a href="profile.html">
                <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
            </a>
            <br />
                <p className="text-center">{comment.name}</p>
            </div>
            <div className="col-md-10">
                <p className="lead">{comment.text}</p>
            </div>
            {comment.user === auth.user.id? (
                <button 
                    onClick={this.onDeleteClick.bind(this, postId, comment._id)} 
                    className="btn btn-danger mr-1"
                >
                    <i className="fas fa-times"></i>
                </button>
            ):null}
        </div>
    </div>
    )
  }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(Comment)