/*
 * GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Author: eidng8
 */

import { writeFile } from 'fs';
import { Arguments } from './Arguments';
import { Patch, XmlFile } from 'g8-xml-patch';
import { basename, dirname, join } from 'path';

export default class Cli {
  private arguments: Arguments;

  private readonly inFile: string;

  private readonly patchFile: string;

  private readonly outFile: string;

  private readonly verbose: boolean;

  private patch!: Patch;

  private xml!: XmlFile;

  constructor() {
    this.arguments = new Arguments();
    this.inFile = this.arguments.args.in!;
    this.patchFile = this.arguments.args.patch || this.fileName('patch');
    this.outFile = this.arguments.args.out || this.fileName('out');
    this.verbose = !!this.arguments.args.verbose;
  }

  async run(): Promise<this> {
    this.patch = new Patch();
    await this.loadXml();
    await this.loadPatch();
    const out = this.patch.apply(this.xml).toString();
    if (this.verbose) console.log(`\n${this.outFile}:\n${out}`);
    return this.write(out);
  }

  private async loadXml() {
    this.xml = await new XmlFile().fromFile(this.inFile);
    if (this.verbose) console.log(`\n${this.inFile}:\n${this.xml.toString()}`);
  }

  private async loadPatch() {
    const patch = await new XmlFile().fromFile(this.patchFile);
    if (this.verbose) console.log(`\n${this.patchFile}:\n${patch.toString()}`);
    this.patch.load(patch);
  }

  private fileName(type: string) {
    const dir = dirname(this.inFile);
    const base = basename(this.inFile, '.xml');
    return join(dir, `${base}.${type}.xml`);
  }

  private write(data: string): Promise<this> {
    return new Promise((resolve, reject) => {
      writeFile(this.outFile, data, { encoding: this.patch.encoding }, err =>
        err ? reject(err) : resolve(this),
      );
    });
  }
}
