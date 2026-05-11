import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const eslintExtensions = new Set(['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx']);

const gitRepository = spawnSync('git', ['rev-parse', '--is-inside-work-tree'], {
  encoding: 'utf8',
});

if (gitRepository.status !== 0 || gitRepository.stdout.trim() !== 'true') {
  process.stdout.write('No git repository found, skipping staged eslint check.\n');
  process.exit(0);
}

const git = spawnSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR'], {
  encoding: 'utf8',
});

if (git.status !== 0) {
  process.stderr.write(git.stderr || 'Failed to read staged files.\n');
  process.exit(git.status ?? 1);
}

const files = git.stdout
  .split(/\r?\n/)
  .map((file) => file.trim())
  .filter(Boolean)
  .filter((file) => eslintExtensions.has(path.extname(file)))
  .filter((file) => existsSync(file));

if (files.length === 0) {
  process.stdout.write('No staged TS/JS files to lint.\n');
  process.exit(0);
}

const eslintBin = path.join(
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'eslint.cmd' : 'eslint',
);

const eslint = spawnSync(eslintBin, files, {
  shell: false,
  stdio: 'inherit',
});

process.exit(eslint.status ?? 1);
