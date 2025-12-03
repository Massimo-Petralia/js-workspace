import { Injectable } from '@nestjs/common';
import * as fsPromises from 'fs/promises';
import path from 'node:path';

export interface GoogleTaxonomy {
  name: string;
  children: GoogleTaxonomy[];
}

@Injectable()
export class FileService {
  helloWorld(): string {
    return 'File service work !';
  }

  async handleFile(dir: string): Promise<GoogleTaxonomy[]> {
    let data: GoogleTaxonomy[] = [];
    let isLoading = 'loading...';
    console.log(isLoading);
    const fsp = fsPromises;
    const npath = path;
    try {
      const raw = await fsp.readFile(dir, 'utf-8');
      const obj = JSON.parse(raw) as GoogleTaxonomy[];
      console.log(
        // 'data: ' +
        //   JSON.stringify(obj) +
        ' file name: ' +
          npath.basename(dir) +
          ' Directory name: ' +
          npath.dirname(dir),
      );
      data = obj;
      isLoading = 'finish !';
      console.log(isLoading);
    } catch (err) {
      console.error('Read file failed: ' + err);
    }
    return data;
  }
}
