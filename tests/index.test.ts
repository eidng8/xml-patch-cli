import { exec } from 'child_process';
import { join, resolve } from 'path';
import { existsSync, unlinkSync } from 'fs';

describe('CLI', () => {
  beforeEach(() => {
    const file = resolve(join(__dirname, '1A.out.xml'));
    if (existsSync(file)) {
      unlinkSync(file);
    }
  });

  it('patches XML file', done => {
    expect.assertions(1);
    const xml = resolve(join(__dirname, '1A.xml'));
    const patch = resolve(join(__dirname, '1A.patch.xml'));
    const out = resolve(join(__dirname, '1A.out.xml'));
    exec(`node ./bin/index.js --verbose ${xml}`, (err, stdout, stderr) => {
      if (err) {
        throw new Error(
          `Expected 'err' to be null, but got ${err}.\n\nSTDERR:\n${stderr}`,
        );
      }
      expect(stdout).toBe(`
${xml}:
<?xml version="1.0"?>
<a>x
  <b>y</b>z
</a>

${patch}:
<?xml version="1.0" encoding="utf-8"?>
<diff>
  <replace sel="/a/b">
    <c>y</c>
  </replace>
</diff>

${out}:
<?xml version="1.0"?>
<a>x
  <c>y</c>z
</a>
`);
      done();
    });
  });
});
