'use client';

import { Comment, User } from '@prisma/client';
import { Avatar, Box, Flex, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

interface CommentWithUser extends Comment {
  user: User;
}

const CommentList = ({ comments }: { comments: CommentWithUser[] }) => {
  return (
    <Flex direction='column' gap='3'>
      {comments.map((comment) => (
        <Box key={comment.id} className='border rounded-md p-3'>
          <Flex gap='3'>
            <Avatar
              src={comment.user?.image || undefined}
              fallback={comment.user?.name?.[0]?.toUpperCase() || '?'}
              size='2'
              radius='full'
            />
            <Box>
              <Flex gap='3' align='center'>
                <Text size='2' weight='bold'>
                  {comment.user?.name || 'Anonymous User'}
                </Text>
                <Text size='1' color='gray'>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </Text>
              </Flex>
              <Box className='prose mt-2'>
                <ReactMarkdown>{comment.content}</ReactMarkdown>
              </Box>
            </Box>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default CommentList;

// 'use client';

// import { Comment, User } from '@prisma/client';
// import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes';
// import ReactMarkdown from 'react-markdown';

// interface CommentWithUser extends Comment {
//   user: User;
// }

// const CommentList = ({ comments }: { comments: CommentWithUser[] }) => {
//   return (
//     <Flex direction='column' gap='3'>
//       {comments.map((comment) => (
//         <Card key={comment.id}>
//           <Flex gap='3'>
//             <Avatar
//               src={comment.user.image!}
//               fallback='?'
//               size='2'
//               radius='full'
//             />
//             <Box>
//               <Flex gap='3' align='center'>
//                 <Text size='2' weight='bold'>
//                   {comment.user.name}
//                 </Text>
//                 <Text size='1' color='gray'>
//                   {new Date(comment.createdAt).toLocaleDateString()}
//                 </Text>
//               </Flex>
//               <Box className='prose mt-2'>
//                 <ReactMarkdown>{comment.content}</ReactMarkdown>
//               </Box>
//             </Box>
//           </Flex>
//         </Card>
//       ))}
//     </Flex>
//   );
// };

// export default CommentList;
