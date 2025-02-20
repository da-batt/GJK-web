import * as migration_20250203_174729 from './20250203_174729';
import * as migration_20250214_190538 from './20250214_190538';
import * as migration_20250215_174447 from './20250215_174447';
import * as migration_20250216_132032 from './20250216_132032';
import * as migration_20250220_112008 from './20250220_112008';

export const migrations = [
  {
    up: migration_20250203_174729.up,
    down: migration_20250203_174729.down,
    name: '20250203_174729',
  },
  {
    up: migration_20250214_190538.up,
    down: migration_20250214_190538.down,
    name: '20250214_190538',
  },
  {
    up: migration_20250215_174447.up,
    down: migration_20250215_174447.down,
    name: '20250215_174447',
  },
  {
    up: migration_20250216_132032.up,
    down: migration_20250216_132032.down,
    name: '20250216_132032',
  },
  {
    up: migration_20250220_112008.up,
    down: migration_20250220_112008.down,
    name: '20250220_112008'
  },
];
