import React from 'react';

export default function CommentList({ comments }) {
  const renderedPosts = comments.map(({ id, content, status }) => {
    switch (status) {
      case 'pending':
        return <li key={id}>This comment is awaiting moderation.</li>;
      case 'rejected':
        return <li key={id}>This comment has been rejected.</li>;
      default:
        return <li key={id}>{content}</li>;
    }
  });

  return <ul>{renderedPosts}</ul>;
}
