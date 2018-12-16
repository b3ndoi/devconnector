import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Comment from './Comment';
 class Comments extends Component {
  render() {
    const {comments, postId} = this.props
    
    const commentList = comments.map(comment => {
            return <Comment comment = {comment} postId={postId} key={comment._id}/>
        }
    );
    return (
      <div  className="comments">
        {commentList.length > 0 ? commentList:(<h3 className="mt-2">No comments</h3>)}
      </div>
    )
  }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired,
}

export default connect()(Comments)