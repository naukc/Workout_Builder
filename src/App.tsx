import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Workout, SimpleStep, RepeatBlock, WorkoutBlock } from './core/types';
import WorkoutView from './components/WorkoutView';

function App() {
  const appStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  };

  const sidebarStyle: React.CSSProperties = {
    width: '200px',
    borderRight: '1px solid #ccc',
    padding: '10px',
  };

  const mainContentStyle: React.CSSProperties = {
    flex: 1,
    padding: '10px',
  };

  const initialWorkout: Workout = {
    id: 'workout-1',
    name: 'My First Workout',
    sport: 'cycling',
    blocks: [
      {
        id: 'step-1',
        type: 'step',
        duration_seconds: 600,
        target: { type: 'percent_ftp', range: [80, 90] },
      },
      {
        id: 'repeat-1',
        type: 'repeat',
        repetitions: 5,
        steps: [
          {
            id: 'step-2',
            type: 'step',
            duration_seconds: 180,
            target: { type: 'percent_ftp', range: [110, 120] },
          },
          {
            id: 'step-3',
            type: 'step',
            duration_seconds: 120,
            target: { type: 'rest' },
          },
        ],
      },
      {
        id: 'step-4',
        type: 'step',
        duration_seconds: 300,
        target: { type: 'percent_ftp', range: [50, 60] },
      },
    ],
  };

  const [workout, setWorkout] = useState<Workout>(initialWorkout);

  const addSimpleStep = () => {
    const newStep: SimpleStep = {
      id: `step-${Date.now()}`,
      type: 'step',
      duration_seconds: 60,
      target: { type: 'rest' },
    };
    setWorkout({
      ...workout,
      blocks: [...workout.blocks, newStep],
    });
  };

  const addRepeatBlock = () => {
    const newRepeat: RepeatBlock = {
      id: `repeat-${Date.now()}`,
      type: 'repeat',
      repetitions: 2,
      steps: [
        {
          id: `step-${Date.now()}-1`,
          type: 'step',
          duration_seconds: 60,
          target: { type: 'percent_ftp', range: [90, 100] },
        },
      ],
    };
    setWorkout({
      ...workout,
      blocks: [...workout.blocks, newRepeat],
    });
  };

  const updateBlock = (blockId: string, updatedBlock: WorkoutBlock) => {
    setWorkout({
      ...workout,
      blocks: workout.blocks.map((block) =>
        block.id === blockId ? updatedBlock : block
      ),
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = workout.blocks.findIndex((block) => block.id === active.id);
      const newIndex = workout.blocks.findIndex((block) => block.id === over.id);

      setWorkout((workout) => ({
        ...workout,
        blocks: arrayMove(workout.blocks, oldIndex, newIndex),
      }));
    }
  };

  return (
    <div style={appStyle}>
      <div style={sidebarStyle}>
        <h2>Blocks</h2>
        <button onClick={addSimpleStep}>Add Simple Step</button>
        <button onClick={addRepeatBlock}>Add Repeat Block</button>
      </div>
      <div style={mainContentStyle}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={workout.blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
            <WorkoutView workout={workout} onUpdateBlock={updateBlock} />
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
