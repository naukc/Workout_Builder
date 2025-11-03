import React from 'react';
import { Workout, WorkoutBlock } from '../core/types';
import SimpleStepView from './SimpleStepView';
import RepeatBlockView from './RepeatBlockView';

interface WorkoutViewProps {
  workout: Workout;
  onUpdateBlock: (blockId: string, updatedBlock: WorkoutBlock) => void;
}

const WorkoutView: React.FC<WorkoutViewProps> = ({ workout, onUpdateBlock }) => {
  return (
    <div>
      <h1>{workout.name}</h1>
      <p>Sport: {workout.sport}</p>
      <div>
        {workout.blocks.map((block: WorkoutBlock) => {
          if (block.type === 'step') {
            return <SimpleStepView key={block.id} step={block} onUpdate={onUpdateBlock} />;
          } else if (block.type === 'repeat') {
            return <RepeatBlockView key={block.id} block={block} onUpdate={onUpdateBlock} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default WorkoutView;
