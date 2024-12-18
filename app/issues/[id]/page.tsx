import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import StatusSelect from './StatusSelect';

// import { cache } from 'react';
import PrioritySelect from './PrioritySelect';
import LabelSelect from './LabelSelect';
import CommentList from './comments/CommentList';
import CommentForm from './comments/CommentForm';
import { cache } from 'react';

import CommentsSection from './CommentsSection';

interface Props {
  params: { id: string };
}

// const fetchUser = cache((issueId: number) =>
//   prisma.issue.findUnique({ where: { id: issueId } })
// );

// const fetchIssue = cache((issueId: number) =>
//   prisma.issue.findUnique({
//     where: { id: issueId },
//     include: {
//       labels: true,
//       comments: {
//         include: {
//           user: true,
//         },
//         orderBy: {
//           createdAt: 'desc',
//         },
//       },
//     },
//   })
// );

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
    include: {
      labels: true,
      assignedToUser: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  // const issue = await fetchUser(parseInt(params.id));
  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
        <Box my='4'>
          <LabelSelect issue={issue} />
        </Box>

        {/* Comments section */}
        {/* <Box my='6'>
          <CommentList comments={issue.comments} />
          {session && (
            <Box mt='4'>
              <CommentForm issueId={issue.id} />
            </Box>
          )}
        </Box> */}
        {session && (
          <CommentsSection
            issueId={issue.id}
            initialComments={issue.comments}
          />
        )}
      </Box>
      {/* Labels section */}

      {session && (
        <Box>
          <Flex direction='column' gap='4'>
            <StatusSelect issue={issue} />
            <PrioritySelect issue={issue} />

            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props) {
  // const issue = await fetchUser(parseInt(params.id));
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  };
}

export default IssueDetailPage;
