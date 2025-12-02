import { Injectable } from '@nestjs/common';
import * as fsPromises from 'fs/promises';
import path from 'node:path';

@Injectable()
export class FileService {
  helloWorld(): string {
    return 'File service work !';
  }

  async handleFile(dir: string) {
    let isLoading = 'loading...';
    console.log(isLoading);
    const fsp = fsPromises;
    const npath = path;
    try {
      const raw = await fsp.readFile(dir, 'utf-8');
      const obj = JSON.parse(raw) as { data: string };
      console.log(
        'data: ' +
          JSON.stringify(obj) +
          ' file name: ' +
          npath.basename(dir) +
          ' Directory name: ' +
          npath.dirname(dir),
      );
      isLoading = 'finish !';
      console.log(isLoading);
    } catch (err) {
      console.error('Read file failed: ' + err);
    }
  }
}
