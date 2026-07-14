function CommentThreadModal({
  comments = [],
  commentText = "",
  emptyMessage = "No comments yet.",
  onCommentChange,
  onSubmit,
  placeholder = "Add a comment...",
  subjectLabel = "Community Thread",
  subjectTitle = "Comments",
  submitLabel = "Add Comment",
}) {
  const commentCount = comments.length;

  return (
    <section className="commentThreadModal">
      <header className="commentThreadHero">
        <div>
          <p className="commentThreadEyebrow">{subjectLabel}</p>
          <h2 className="commentThreadTitle fontdiner-swanky-regular">{subjectTitle}</h2>
        </div>
        <div className="commentThreadCount">
          <span>{commentCount}</span>
          <strong>{commentCount === 1 ? "Comment" : "Comments"}</strong>
        </div>
      </header>

      <div className="commentThreadBody">
        <div className="commentList">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <article className="commentItem" key={comment.id}>
                <div className="commentAvatar">
                  {(comment.author || "C").charAt(0)}
                </div>
                <div>
                  <p className="commentAuthor">{comment.author || "Community Member"}</p>
                  <p className="commentText">{comment.text}</p>
                </div>
              </article>
            ))
          ) : (
            <div className="emptyComments">
              <p className="commentAuthor">Start the conversation</p>
              <p>{emptyMessage}</p>
            </div>
          )}
        </div>

        <form className="commentForm" onSubmit={onSubmit}>
          <label className="commentComposerLabel" htmlFor="comment-thread-textarea">
            Add your voice
          </label>
          <textarea
            id="comment-thread-textarea"
            className="frmSU commentTextarea"
            value={commentText}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder={placeholder}
            required
          />
          <div className="commentComposerFooter">
            <span>{commentText.trim().length} characters</span>
            <button className="signUp formSubmit commentSubmitButton" type="submit">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CommentThreadModal;
