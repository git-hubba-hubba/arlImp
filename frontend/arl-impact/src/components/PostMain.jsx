function PostMain({
  postObj,
  likeCount = 0,
  commentCount = 0,
  onComment,
  onDelete,
  onEdit,
  onLike,
}) {
  const postImage = postObj.postImage || postObj.img;
  const postTitle = postObj.postTitle || postObj.title;

  return (
    <>
      <div className="singlePost">
        <div className="spScreen">
          {postImage && (
            <img
              src={postImage}
              alt=""
              className="postImgContent"
            />
          )}
        </div>
        <div className="btnPostContainer">
          <h3 className="postTitle fontdiner-swanky-regular">
            {postTitle}
          </h3>
          <p className="postAuthor">{postObj.postAuthor}</p>
          {postObj.postBody && <p className="topicPost">{postObj.postBody}</p>}
          {postObj.postCategory && <p className="modalEyebrow">{postObj.postCategory}</p>}
        </div>
        <div className="btnEveryPost">
          <div className="btnCol">
            <button className="postActionButton" type="button" onClick={onLike}>
              <img
                src="https://www.freepnglogos.com/uploads/like-png/file-like-svg-wikimedia-commons-22.png"
                alt=""
                className="postButton"
              />
            </button>
            <p className="colName">Like {likeCount}</p>
          </div>
          <div className="btnCol">
            <button className="postActionButton" type="button" onClick={onComment}>
              <img
                src="https://www.freeiconspng.com/thumbs/comment-png/comment-png-1.png"
                alt=""
                className="postButton"
              />
            </button>
            <p className="colName">Comment {commentCount}</p>
          </div>
          <div className="btnCol">
            <img
              src="https://www.freeiconspng.com/uploads/share-icon-png-31.png"
              alt=""
              className="postButton"
            />
            <p className="colName">Share</p>
          </div>
          <div className="btnCol">
            <img
              src="https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png"
              alt=""
              className="postButton"
            />
            <p className="colName">Report</p>
          </div>
          {onEdit && (
            <button className="signUp profileAction" type="button" onClick={onEdit}>
              Edit
            </button>
          )}
          {onDelete && (
            <button className="signUp profileAction" type="button" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default PostMain;
