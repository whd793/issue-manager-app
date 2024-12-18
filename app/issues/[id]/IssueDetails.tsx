import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className='space-x-3' my='2'>
        <IssueStatusBadge status={issue.status} />
        {issue.priority && (
          <Text className={`text-${getPriorityColor(issue.priority)}`}>
            {issue.priority}
          </Text>
        )}
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose max-w-full' mt='4'>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

const getPriorityColor = (priority: string) => {
  const colors = {
    LOW: 'gray-500',
    MEDIUM: 'blue-500',
    HIGH: 'orange-500',
    CRITICAL: 'red-500',
  };
  return colors[priority as keyof typeof colors] || 'gray-500';
};

export default IssueDetails;
