import { useEffect, useState } from "react";
import { apiRequest } from "../../api";
import Modal from "../../components/Modal";
import PostMain from "../../components/PostMain";
import PostFormModal from "../../components/PostFormModal";
import NameSpace from "../../components/NameSpace";
import SocialBtn from "../../components/SocialBtn";

const categoryPostData = {
  "Global Issues": {
    images: [
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80",
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
    ],
    titles: [
      "Grassroots Leaders Respond to Climate Displacement",
      "How Local Coalitions Are Tackling Food Insecurity",
      "Water Access Projects Bring New Momentum to Rural Regions",
      "Youth Advocates Push for Cleaner Public Spaces",
      "Community Health Workers Close Critical Care Gaps",
    ],
    bodies: [
      "A quick briefing on civic action, practical partnerships, and the people moving the work forward.",
      "Local organizers are sharing lessons that can help smaller communities scale impact without losing trust.",
      "The story centers on resource access, public voice, and the next steps residents are asking leaders to take.",
      "A field note on how volunteers, nonprofits, and neighborhood groups are coordinating support.",
    ],
  },
  Education: {
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80",
    ],
    titles: [
      "Mentorship Circles Help Students Plan Their Next Step",
      "Digital Classrooms Expand Access Beyond City Centers",
      "Scholarship Programs Focus on First-Generation Learners",
      "Teachers Share New Approaches to Project-Based Learning",
      "After-School Labs Turn Curiosity Into Career Skills",
    ],
    bodies: [
      "A snapshot of tools, programs, and classroom strategies shaping student success.",
      "Educators are pairing technology with hands-on support to keep learners connected.",
      "The latest conversation highlights access, affordability, and pathways into meaningful work.",
      "Students and instructors are building stronger networks around practical learning goals.",
    ],
  },
  Political: {
    images: [
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
      "https://images.unsplash.com/photo-1541872705-1f73c6400ec9?w=800&q=80",
      "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=800&q=80",
      "https://images.unsplash.com/photo-1575320181282-9afab399332c?w=800&q=80",
    ],
    titles: [
      "Town Hall Questions Center Housing and Public Safety",
      "Voter Education Groups Prepare for Registration Drives",
      "Local Policy Debate Draws New Community Voices",
      "Civic Workshops Explain How Budget Decisions Are Made",
      "Neighborhood Councils Call for More Transparent Planning",
    ],
    bodies: [
      "A nonpartisan look at civic participation, public meetings, and community priorities.",
      "Residents are asking sharper questions and organizing around local decision points.",
      "This update follows the process, the stakeholders, and the practical impact of policy choices.",
      "Organizers are focusing on turnout, accessible information, and accountability.",
    ],
  },
  Finance: {
    images: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&q=80",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80",
    ],
    titles: [
      "Small Business Owners Compare Funding Options",
      "Budgeting Basics Workshop Helps Families Reset Goals",
      "Community Credit Programs Open Doors for New Founders",
      "Financial Coaches Explain Emergency Savings Strategies",
      "Entrepreneurs Track Cash Flow Before Expansion Season",
    ],
    bodies: [
      "Practical finance notes for households, founders, and community builders.",
      "The discussion focuses on planning, access to capital, and habits that reduce stress.",
      "Local experts are translating financial concepts into steps people can use this week.",
      "A look at how stronger money systems can support long-term opportunity.",
    ],
  },
  Forum: {
    images: [
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&q=80",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    ],
    titles: [
      "Open Thread: What Should the Community Build Next?",
      "Members Share Wins From This Week's Collaboration",
      "New Introductions Spark Cross-City Partnerships",
      "Resource Swap Highlights Tools Worth Bookmarking",
      "Question of the Day: Where Do You Need Support?",
    ],
    bodies: [
      "A conversation starter for members to trade ideas, updates, and useful resources.",
      "The thread is designed for quick replies, warm introductions, and practical next steps.",
      "Community members are comparing notes and inviting others into active projects.",
      "Use this space to surface needs, offers, and opportunities worth sharing.",
    ],
  },
};

const authors = [
  "Jordan Brooks",
  "Alicia Grant",
  "Marcus Ellis",
  "Danielle Carter",
  "Kevin Mitchell",
  "Tasha Reynolds",
  "Christopher Young",
  "Monique Harris",
  "Brandon Foster",
  "Nia Thompson",
];

const generateCategoryPosts = (category) => {
  const categoryData = categoryPostData[category] || categoryPostData.Forum;

  return Array.from({ length: 20 }, (_, index) => ({
    _id: `generated-${category}-${index}`,
    postTitle: categoryData.titles[index % categoryData.titles.length],
    postAuthor: authors[index % authors.length],
    postImage: categoryData.images[index % categoryData.images.length],
    postCategory: category,
    postBody: categoryData.bodies[index % categoryData.bodies.length],
  }));
};

const getPostKey = (post, index = 0) =>
  post._id || post.id || post.postTitle || post.title || `post-${index}`;

function PostCommentsModal({
  comments,
  commentText,
  onCommentChange,
  onSubmit,
  post,
}) {
  const postTitle = post?.postTitle || post?.title || "this post";

  return (
    <div className="commentModalPanel">
      <p className="modalEyebrow">{postTitle}</p>
      <div className="commentList">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div className="commentItem" key={comment.id}>
              <p className="commentAuthor">{comment.author}</p>
              <p className="commentText">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="emptyComments">No comments yet.</p>
        )}
      </div>
      <form className="commentForm" onSubmit={onSubmit}>
        <textarea
          className="frmSU commentTextarea"
          value={commentText}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button className="signUp formSubmit" type="submit">
          Add Comment
        </button>
      </form>
    </div>
  );
}

function FeedMain({ currentUser }) {
  const [currentFeed, setCurrentFeed] = useState("");
  const [dbPosts, setDbPosts] = useState([]);
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [generatedPosts, setGeneratedPosts] = useState([]);
  const [postEngagement, setPostEngagement] = useState({});
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
    } catch {
      setStatus("Backend posts unavailable; showing sample posts.");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      await loadPosts();
    };

    fetchPosts();
  }, []);

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

  const handleFeedSelect = (category) => {
    setCurrentFeed(category);
    setGeneratedPosts(generateCategoryPosts(category));
    setStatus("");
  };

  const handleLikePost = (post, index) => {
    const postKey = getPostKey(post, index);

    setPostEngagement((currentEngagement) => ({
      ...currentEngagement,
      [postKey]: {
        likes: (currentEngagement[postKey]?.likes || 0) + 1,
        comments: currentEngagement[postKey]?.comments || [],
      },
    }));
  };

  const handleOpenComments = (post, index) => {
    setActiveCommentPost({ ...post, _commentKey: getPostKey(post, index) });
    setCommentText("");
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const trimmedComment = commentText.trim();

    if (!activeCommentPost || !trimmedComment) return;

    const postKey = activeCommentPost._commentKey;
    const nextComment = {
      id: `${postKey}-comment-${Date.now()}`,
      author: currentUser?.username || "Anonymous",
      text: trimmedComment,
    };

    setPostEngagement((currentEngagement) => ({
      ...currentEngagement,
      [postKey]: {
        likes: currentEngagement[postKey]?.likes || 0,
        comments: [...(currentEngagement[postKey]?.comments || []), nextComment],
      },
    }));
    setCommentText("");
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
                <SocialBtn onSelect={handleFeedSelect} btnObj={obj} />
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
      <Modal
        isOpen={Boolean(activeCommentPost)}
        onClose={() => {
          setActiveCommentPost(null);
          setCommentText("");
        }}
        title="Comments"
        component={PostCommentsModal}
        componentProps={{
          comments: postEngagement[activeCommentPost?._commentKey]?.comments || [],
          commentText,
          onCommentChange: setCommentText,
          onSubmit: handleSubmitComment,
          post: activeCommentPost,
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
        {generatedPosts.length === 0 && dbPosts.map((postSm) => {
          const postKey = getPostKey(postSm);
          const engagement = postEngagement[postKey] || {};

          return (
            <div key={postSm._id}>
              <PostMain
                commentCount={(engagement.comments || []).length}
                likeCount={engagement.likes || 0}
                onComment={() => handleOpenComments(postSm)}
                postObj={postSm}
                onEdit={() => handleEditPost(postSm)}
                onDelete={() => handleDeletePost(postSm._id)}
                onLike={() => handleLikePost(postSm)}
              />
            </div>
          );
        })}
        {(generatedPosts.length > 0 ? generatedPosts : posts).map((postSm,i) => {
          const postKey = getPostKey(postSm, i);
          const engagement = postEngagement[postKey] || {};

          return (
            <div key={postSm._id || i}>
              <PostMain
                commentCount={(engagement.comments || []).length}
                likeCount={engagement.likes || 0}
                onComment={() => handleOpenComments(postSm, i)}
                onLike={() => handleLikePost(postSm, i)}
                postObj={postSm}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FeedMain;
