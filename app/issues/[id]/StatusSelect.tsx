'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  // issue.status

  //   const assignIssue = (userId: string) => {
  //     axios
  //       .patch('/api/issues/' + issue.id, {
  //         STATUS: userId || 'OPEN',
  //       })
  //       .catch(() => {
  //         toast.error('Changes could not be saved.');
  //       });
  //   };
  const assignIssue = (status: Status) => {
    axios
      .patch('/api/issues/' + issue.id, { status })
      .then(() => {
        // Show success toast on the bottom-left
        toast.success('Status has been changed.', {
          position: 'bottom-left',
        });
      })
      .catch(() => {
        toast.error('Changes could not be saved.');
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.status || ''}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value=''>Unassigned</Select.Item>
            {statuses.map((status) => (
              <Select.Item key={status.value} value={status.value || ''}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};
export const dynamic = 'force-dynamic';

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 5 * 1000, //60s
    retry: 3,
  });

export default StatusSelect;
