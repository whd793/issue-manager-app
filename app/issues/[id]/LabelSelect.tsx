// Create LabelSelect.tsx component
'use client';

import { Issue, Label } from '@prisma/client';
import { Badge, Box, Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  issue: Issue & { labels: Label[] };
}

const LabelSelect = ({ issue }: Props) => {
  const [selectedLabels, setSelectedLabels] = useState(issue.labels);
  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('#000000');

  const addLabel = async () => {
    try {
      const response = await axios.post('/api/labels', {
        name: newLabelName,
        color: newLabelColor,
        issueId: issue.id,
      });
      setSelectedLabels([...selectedLabels, response.data]);
      toast.success('Label added successfully');
    } catch (error) {
      toast.error('Error adding label');
    }
  };

  return (
    <Box>
      <Flex gap='2' wrap='wrap'>
        {selectedLabels.map((label) => (
          <Badge key={label.id} style={{ backgroundColor: label.color }}>
            {label.name}
          </Badge>
        ))}
      </Flex>

      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant='soft' mt='2'>
            Add Label
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Add New Label</Dialog.Title>
          <Flex direction='column' gap='2'>
            <TextField.Root>
              <TextField.Input
                placeholder='Label name'
                value={newLabelName}
                onChange={(e) => setNewLabelName(e.target.value)}
              />
            </TextField.Root>
            <TextField.Root>
              <TextField.Input
                type='color'
                value={newLabelColor}
                onChange={(e) => setNewLabelColor(e.target.value)}
              />
            </TextField.Root>
            <Button onClick={addLabel}>Add Label</Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
};

export default LabelSelect;
