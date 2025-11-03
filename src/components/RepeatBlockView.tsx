import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { RepeatBlock, WorkoutBlock, SimpleStep } from '../core/types';
import SimpleStepView from './SimpleStepView';

interface RepeatBlockViewProps {
  block: RepeatBlock;
  onUpdate: (blockId: string, updatedBlock: WorkoutBlock) => void;
}

const RepeatBlockView: React.FC<RepeatBlockViewProps> = ({ block, onUpdate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #999',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#f0f0f0',
  };

  const handleRepetitionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(block.id, { ...block, repetitions: parseInt(e.target.value, 10) });
  };

  const handleStepUpdate = (stepId: string, updatedStep: WorkoutBlock) => {
    const updatedSteps = block.steps.map((step) =>
      step.id === stepId ? (updatedStep as SimpleStep) : step
    );
    onUpdate(block.id, { ...block, steps: updatedSteps });
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>
        <input
          type="number"
          value={block.repetitions}
          onChange={handleRepetitionsChange}
        />
        x
      </div>
      <div>
        {block.steps.map((step) => (
          <SimpleStepView key={step.id} step={step} onUpdate={handleStepUpdate} />
        ))}
      </div>
    </div>
  );
};

export default RepeatBlockView;
