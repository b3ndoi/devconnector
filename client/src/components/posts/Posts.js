import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';

import {getPosts} from '../../actions/postActions';
import PostItem from './PostItem';

class Posts extends Component {
 

    componentDidMount(){
        this.props.getPosts();
    }
  render() {
    let postsContent;
    const {posts, loading} = this.props.posts;
    if(posts === null || Object.keys(posts).length === 0 || loading === true){
        postsContent = <Spinner />
    }else{
        postsContent = posts.map((post, index) => {
            return <PostItem post= {post} key={index}/>
        })
    }  
    return (
      <div className="feed">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <PostForm />

                    <div className="posts">
                        {postsContent}
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    posts: state.posts
})

export default connect(mapStateToProps, {getPosts})(Posts)