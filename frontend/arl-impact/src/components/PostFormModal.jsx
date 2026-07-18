import React from "react";
import MediaUploadButton from "./MediaUploadButton";

function PostFormModal({
  editingPostId,
  onCancel,
  onChange,
  onSubmit,
  postForm,
  status,
}) {
  return (
    <div className="crudPanel modalCrudPanel">
      <form className="crudForm" onSubmit={onSubmit}>
        <input className="frmSU" name="postTitle" value={postForm.postTitle} onChange={onChange} placeholder="Post Title" required />
        <input className="frmSU" name="postAuthor" value={postForm.postAuthor} onChange={onChange} placeholder="Author" required />
        <MediaUploadButton
          accept="image/*,video/*"
          label="Upload Post Media"
          name="postImage"
          onChange={onChange}
          value={postForm.postImage}
        />
        <input className="frmSU" name="postCategory" value={postForm.postCategory} onChange={onChange} placeholder="Category" />
        <textarea className="frmSU crudTextarea" name="postBody" value={postForm.postBody} onChange={onChange} placeholder="Post body" />
        <button className="signUp formSubmit" type="submit">{editingPostId ? "Update Post" : "Add Post"}</button>
        {editingPostId && <button className="signUp formSubmit" type="button" onClick={onCancel}>Cancel</button>}
      </form>
      {status && <p className="formStatus">{status}</p>}
    </div>
  );
}

export default PostFormModal;
