/*
 * GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Author: eidng8
 */

import yargs from 'yargs';

export interface IArguments {
  /**
   * Path to input file
   */
  in?: string;

  /**
   * Path to patch file
   */
  patch?: string;

  /**
   * Path to output file
   */
  out?: string;

  verbose?: boolean;

  /**
   * From yargs
   */
  [x: string]: unknown;

  /**
   * From yargs
   */
  _: string[];

  /**
   * From yargs
   */
  $0: string;
}

export class Arguments {
  _args: IArguments;

  get args() {
    return this._args;
  }

  constructor() {
    const args = process.argv.slice(1);
    if (args[0].indexOf('index.js') > -1) args.shift();

    this._args = yargs
      .strict()
      .scriptName('xml-patch')
      .command(
        '$0 <in> [patch] [out]',
        'Patches the `in` file and output the patched version to `out` file',
        yargs => {
          yargs
            .positional('in', {
              describe: 'the XML file to be patched',
              type: 'string',
            })
            .positional('patch', {
              describe: 'the XML patch file',
              type: 'string',
            })
            .positional('out', {
              describe: 'the patched XML file',
              type: 'string',
            });
        },
      )
      .option('verbose', {
        alias: 'v',
        type: 'boolean',
        describe: 'also prints XML to console',
      })
      .demandCommand(1, '`in` file is required.')
      .help()
      .parse(args);
  }
}
