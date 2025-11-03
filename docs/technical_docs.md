# WorkoutArchitect Technical Documentation

## Core Data Models

```typescript
export type Sport = 'cycling' | 'running';

export interface Workout {
  id: string;
  name: string;
  sport: Sport;
  blocks: WorkoutBlock[];
}

export type WorkoutBlock = SimpleStep | RepeatBlock;

export interface SimpleStep {
  id: string;
  type: 'step';
  duration_seconds: number;
  target: Target;
}

export interface RepeatBlock {
  id: string;
  type: 'repeat';
  repetitions: number;
  steps: SimpleStep[];
}

export type Target = PercentFTPTarget | PaceTarget | RestTarget;

export interface PercentFTPTarget {
  type: 'percent_ftp';
  range: [number, number];
}

export interface PaceTarget {
  type: 'pace_seconds_per_km';
  range: [number, number];
}

export interface RestTarget {
  type: 'rest';
}
```