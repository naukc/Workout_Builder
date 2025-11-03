import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SimpleStep, WorkoutBlock } from '../core/types';

interface SimpleStepViewProps {
  step: SimpleStep;
  onUpdate: (stepId: string, updatedStep: WorkoutBlock) => void;
  onDelete: (stepId: string) => void;
}

const SimpleStepView: React.FC<SimpleStepViewProps> = ({ step, onUpdate, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: 'white',
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(step.id, { ...step, duration_seconds: parseInt(e.target.value, 10) });
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (step.target.type === 'percent_ftp' || step.target.type === 'pace_seconds_per_km') {
      const newRange = [...step.target.range];
      newRange[index] = parseInt(e.target.value, 10);
      onUpdate(step.id, {
        ...step,
        target: { ...step.target, range: [newRange[0], newRange[1]] },
      });
    }
  };

  const renderTargetInputs = () => {
    switch (step.target.type) {
      case 'percent_ftp':
        return (
          <div>
            <input
              type="number"
              value={step.target.range[0]}
              onChange={(e) => handleTargetChange(e, 0)}
            />
            -
            <input
              type="number"
              value={step.target.range[1]}
              onChange={(e) => handleTargetChange(e, 1)}
            />
            % FTP
          </div>
        );
      case 'pace_seconds_per_km':
        return (
          <div>
            <input
              type="number"
              value={step.target.range[0]}
              onChange={(e) => handleTargetChange(e, 0)}
            />
            -
            <input
              type="number"
              value={step.target.range[1]}
              onChange={(e) => handleTargetChange(e, 1)}
            />
            s/km
          </div>
        );
      case 'rest':
        return <p>Rest</p>;
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>
        Duration:
        <input
          type="number"
          value={step.duration_seconds}
          onChange={handleDurationChange}
        />
        seconds
      </div>
      <div>
        Target: {renderTargetInputs()}
      </div>
      <button onClick={() => onDelete(step.id)}>Delete</button>
    </div>
  );
};

export default SimpleStepView;
