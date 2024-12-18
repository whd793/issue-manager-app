'use client';

import { Button, Flex, TextArea } from '@radix-ui/themes';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  issueId: number;
  onCommentSubmit: (newComment: any) => void;
}

const CommentForm = ({ issueId, onCommentSubmit }: Props) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setSubmitting(true);
      const response = await axios.post(`/api/issues/${issueId}/comments`, {
        content,
      });
      onCommentSubmit(response.data);
      setContent('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Error adding comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction='column' gap='2'>
        <TextArea
          placeholder='Add a comment...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button disabled={isSubmitting || !content.trim()}>
          {isSubmitting ? 'Adding...' : 'Add Comment'}
        </Button>
      </Flex>
    </form>
  );
};

export default CommentForm;

// 'use client';

// import { Button, Flex, Text, TextArea } from '@radix-ui/themes';
// import axios from 'axios';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// const CommentForm = ({ issueId }: { issueId: number }) => {
//   const [content, setContent] = useState('');
//   const [isSubmitting, setSubmitting] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setSubmitting(true);
//       await axios.post('/api/issues/' + issueId + '/comments', { content });
//       setContent('');
//       router.refresh();
//       toast.success('Comment added successfully');
//     } catch (error) {
//       toast.error('Error adding comment');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Flex direction='column' gap='2'>
//         <TextArea
//           placeholder='Add a comment...'
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <Button disabled={isSubmitting}>Add Comment</Button>
//       </Flex>
//     </form>
//   );
// };

// export default CommentForm;
