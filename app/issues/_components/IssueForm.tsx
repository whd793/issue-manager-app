'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue, Priority } from '@prisma/client';
import { Button, Callout, Select, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';

type IssueFormData = z.infer<typeof issueSchema>;

const priorities = [
  { label: '🔴 Critical', value: 'CRITICAL' },
  { label: '🟡 High', value: 'HIGH' },
  { label: '🟢 Medium', value: 'MEDIUM' },
  { label: '⚪ Low', value: 'LOW' },
];

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.patch('/api/issues/' + issue.id, data);
      else await axios.post('/api/issues', data);
      router.push('/issues/list');
      router.refresh();

      toast.success('Status has been changed.', {
        position: 'bottom-left',
      });
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
      toast.error('Changes could not be saved.');
    }
  });

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder='Title'
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='priority'
          control={control}
          defaultValue={issue?.priority || 'MEDIUM'}
          render={({ field }) => (
            <Select.Root
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <Select.Trigger placeholder='Select priority...' />
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
          )}
        />
        <ErrorMessage>{errors.priority?.message}</ErrorMessage>

        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default IssueForm;
