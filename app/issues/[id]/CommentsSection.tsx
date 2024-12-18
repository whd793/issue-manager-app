// app/issues/[id]/CommentsSection.tsx
'use client';

import { useState } from 'react';
import CommentList from './comments/CommentList';
import CommentForm from './comments/CommentForm';
import { Comment, User } from '@prisma/client';

interface CommentWithUser extends Comment {
  user: User;
}

interface Props {
  issueId: number;
  initialComments: CommentWithUser[];
}

const CommentsSection = ({ issueId, initialComments }: Props) => {
  const [comments, setComments] = useState<CommentWithUser[]>(initialComments);

  const handleNewComment = (newComment: CommentWithUser) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <div className='mt-8'>
      <CommentForm issueId={issueId} onCommentSubmit={handleNewComment} />
      <div className='mt-4'>
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default CommentsSection;
