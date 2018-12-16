import React from 'react'

export default function PostBody(props) {
  const {post} = props
  return (
    <div className="card card-body mb-3">
        <div className="row">
        <div className="col-md-2">
            <a href="profile.html">
            <img className="rounded-circle d-none d-md-block" src={post.avatar}
                alt="" />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
            <p className="lead">{post.text}</p>
        </div>
        </div>
    </div>
  )
}
