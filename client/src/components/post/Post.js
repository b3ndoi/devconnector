import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner'
import PostBody from './PostBody'
import CommentForm from './CommentForm'
import Comments from './Comments'
import {getPost} from '../../actions/postActions'
class Post extends Component {

  componentDidMount(){
      if(this.props.match.params.post_id){
          this.props.getPost(this.props.match.params.post_id)
      }
  }
  render() {
    let postContent;
    const {post, loading} = this.props.posts;
    if(post === null || Object.keys(post).length === 0 || loading === true){
        postContent = <Spinner />
    }else{
        postContent = (
            <div>
                <PostBody post = {post} />
                <CommentForm  postId={post._id}/>
                <Comments postId={post._id} comments={post.comments}/>
            </div>
        )
    }  
    return (
      <div>
         <div className="post">
            <div className="container">
            <div className="row">
                <div className="col-md-12">
                <Link to="/feed" className="btn btn-light mb-3">Back to feed</Link>
                {postContent}
                </div>
            </div>
            </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    posts: state.posts,
})

export default connect(mapStateToProps, {getPost})(Post)