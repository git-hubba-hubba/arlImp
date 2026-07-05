import { React, useEffect, useState } from "react";
import { apiRequest } from "../../api";
import Home from "../Home/Home";
import Modal from "../../components/Modal";
import PostMain from "../../components/PostMain";
import PostFormModal from "../../components/PostFormModal";
import NameSpace from "../../components/NameSpace";
import SocialBtn from "../../components/SocialBtn";

function FeedMain({ currentUser }) {
  const [currentFeed, setCurrentFeed] = useState("");
  const [dbPosts, setDbPosts] = useState([]);
  const [postForm, setPostForm] = useState({
    postTitle: "",
    postAuthor: currentUser?.username || "",
    postImage: "",
    postCategory: "General",
    postBody: "",
  });
  const [editingPostId, setEditingPostId] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [status, setStatus] = useState("");

  const loadPosts = async () => {
    try {
      const postsFromApi = await apiRequest("/posts");
      setDbPosts(postsFromApi);
    } catch (error) {
      setStatus("Backend posts unavailable; showing sample posts.");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (!editingPostId && currentUser?.username) {
      setPostForm((prevForm) => ({
        ...prevForm,
        postAuthor: currentUser.username,
      }));
    }
  }, [currentUser, editingPostId]);

  const handlePostChange = (e) => {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  };

  const resetPostForm = () => {
    setPostForm({
      postTitle: "",
      postAuthor: currentUser?.username || "",
      postImage: "",
      postCategory: "General",
      postBody: "",
    });
    setEditingPostId(null);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingPostId) {
        await apiRequest(`/posts/${editingPostId}`, {
          method: "PUT",
          body: JSON.stringify(postForm),
        });
      } else {
        await apiRequest("/posts", {
          method: "POST",
          body: JSON.stringify({
            ...postForm,
            user: currentUser?._id,
          }),
        });
      }

      await loadPosts();
      setStatus(editingPostId ? "Post updated." : "Post created.");
      resetPostForm();
      setIsPostModalOpen(false);
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleEditPost = (post) => {
    setEditingPostId(post._id);
    setPostForm({
      postTitle: post.postTitle || "",
      postAuthor: post.postAuthor || "",
      postImage: post.postImage || "",
      postCategory: post.postCategory || "General",
      postBody: post.postBody || "",
    });
    setIsPostModalOpen(true);
  };

  const handleDeletePost = async (postId) => {
    try {
      await apiRequest(`/posts/${postId}`, { method: "DELETE" });
      await loadPosts();
      setStatus("Post deleted.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  const posts = [
    {
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
      title: "Building Stronger Communities Through Technology",
      postAuthor: "Jordan Brooks",
    },
    {
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      title: "The Future of Digital Education Is Here",
      postAuthor: "Alicia Grant",
    },
    {
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      title: "5 Leadership Habits That Inspire Teams",
      postAuthor: "Marcus Ellis",
    },
    {
      img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      title: "How Innovation Starts With Curiosity",
      postAuthor: "Danielle Carter",
    },
    {
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      title: "Creating Opportunities Through Collaboration",
      postAuthor: "Kevin Mitchell",
    },
    {
      img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
      title: "Why Every Startup Needs a Clear Mission",
      postAuthor: "Tasha Reynolds",
    },
    {
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
      title: "From Ideas to Impact: A Practical Guide",
      postAuthor: "Christopher Young",
    },
    {
      img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
      title: "Empowering the Next Generation of Creators",
      postAuthor: "Monique Harris",
    },
    {
      img: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&q=80",
      title: "The Art of Meaningful Networking",
      postAuthor: "Brandon Foster",
    },
    {
      img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80",
      title: "Lessons Learned From Building a Remote Team",
      postAuthor: "Nia Thompson",
    },
    {
      img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80",
      title: "The Importance of Lifelong Learning",
      postAuthor: "Isaiah Coleman",
    },
    {
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      title: "Mastering the Modern Developer Mindset",
      postAuthor: "Sophia Bennett",
    },
  ];

  const buttonCluster = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/44/44386.png",
      name: "Global Issues",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Education%2C_Studying%2C_University%2C_Alumni_-_icon.png",
      name: "Education",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/4117/4117763.png",
      name: "Political",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/72/72762.png",
      name: "Finance",
    },
    {
      icon: "https://static.thenounproject.com/png/1679138-200.png",
      name: "Forum",
    },
  ];
  return (
    <>
      <div className="postNavigation">
        <div className="flexer2">
          <NameSpace name={"SocialFeed"} />
          <div
            style={{ margin: "1em",fontSize:"22px"}}
            className="btnsocialHolster fontdiner-swanky-regular"
          >
            {currentFeed}
          </div>
        </div>
        <div className="btnsocialHolster">
          {buttonCluster.map((obj,i) => {
            return (
              <div key={i}>
                <SocialBtn setCurrentFeed={setCurrentFeed} btnObj={obj} />
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        isOpen={isPostModalOpen}
        onClose={() => {
          setIsPostModalOpen(false);
          resetPostForm();
        }}
        title={editingPostId ? "Edit Post" : "Create Post"}
        component={PostFormModal}
        componentProps={{
          editingPostId,
          onCancel: () => {
            setIsPostModalOpen(false);
            resetPostForm();
          },
          onChange: handlePostChange,
          onSubmit: handlePostSubmit,
          postForm,
          status,
        }}
      />
      <div className="mainPostContainer">
        <div className="crudPanel">
          <button
            className="signUp formSubmit"
            type="button"
            onClick={() => {
              resetPostForm();
              setStatus("");
              setIsPostModalOpen(true);
            }}
          >
            Create Post
          </button>
          {status && !isPostModalOpen && <p className="formStatus">{status}</p>}
        </div>
        {dbPosts.map((postSm) => {
          return (
            <div key={postSm._id}>
              <PostMain
                postObj={postSm}
                onEdit={() => handleEditPost(postSm)}
                onDelete={() => handleDeletePost(postSm._id)}
              />
            </div>
          );
        })}
        {posts.map((postSm,i) => {
          return (
            <div key={i}>
              <PostMain postObj={postSm} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FeedMain;
