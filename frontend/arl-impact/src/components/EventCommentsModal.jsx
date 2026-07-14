import { useMemo, useState } from "react";
import CommentThreadModal from "./CommentThreadModal";

const getEventCommentKey = (event) =>
  `arlImpactEventComments:${event?._id || event?.eventKey || event?.eventName || "event"}`;

function getStoredEventComments(event) {
  try {
    const rawComments = localStorage.getItem(getEventCommentKey(event));
    return rawComments ? JSON.parse(rawComments) : [];
  } catch {
    return [];
  }
}

function setStoredEventComments(event, comments) {
  localStorage.setItem(getEventCommentKey(event), JSON.stringify(comments));
}

function EventCommentsModal({ currentUser, event }) {
  const eventName = event?.eventName || "this event";
  const initialComments = useMemo(() => getStoredEventComments(event), [event]);
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedComment = commentText.trim();
    if (!trimmedComment) return;

    const nextComment = {
      id: `${getEventCommentKey(event)}:${Date.now()}`,
      author: currentUser?.username || "Community Member",
      text: trimmedComment,
    };
    const nextComments = [...comments, nextComment];

    setComments(nextComments);
    setStoredEventComments(event, nextComments);
    setCommentText("");
  };

  return (
    <CommentThreadModal
      comments={comments}
      commentText={commentText}
      emptyMessage="No one has commented on this event yet."
      onCommentChange={setCommentText}
      onSubmit={handleSubmit}
      placeholder="Add a comment about this event..."
      subjectLabel="Event Conversation"
      subjectTitle={eventName}
    />
  );
}

export default EventCommentsModal;
