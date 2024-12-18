// Create PrioritySelect.tsx component
'use client';

import { Issue, Priority } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const priorities: { label: string; value: Priority }[] = [
  { label: '🔴 Critical', value: 'CRITICAL' },
  { label: '🟡 High', value: 'HIGH' },
  { label: '🟢 Medium', value: 'MEDIUM' },
  { label: '⚪ Low', value: 'LOW' },
];

const PrioritySelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const changePriority = (priority: Priority) => {
    axios
      .patch('/api/issues/' + issue.id, { priority })
      .then(() => {
        toast.success('Priority has been updated.', {
          position: 'bottom-left',
        });
        router.refresh();
      })
      .catch(() => {
        toast.error('Changes could not be saved.');
      });
  };

  return (
    <Select.Root defaultValue={issue.priority} onValueChange={changePriority}>
      <Select.Trigger placeholder='Set priority...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Priority Level</Select.Label>
          {priorities.map((priority) => (
            <Select.Item key={priority.value} value={priority.value}>
              {priority.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default PrioritySelect;
