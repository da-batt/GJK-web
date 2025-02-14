import * as migration_20250203_174729 from './20250203_174729';
import * as migration_20250214_190538 from './20250214_190538';

export const migrations = [
  {
    up: migration_20250203_174729.up,
    down: migration_20250203_174729.down,
    name: '20250203_174729',
  },
  {
    up: migration_20250214_190538.up,
    down: migration_20250214_190538.down,
    name: '20250214_190538'
  },
];
