import { Injectable } from '@nestjs/common';
import * as fsPromises from 'fs/promises';
import path from 'node:path';

export interface CategoryTaxonomy {
  name: string;
  children: CategoryTaxonomy[];
}

@Injectable()
export class FileService {
  async handleFile(dir: string): Promise<CategoryTaxonomy[]> {
    const fsp = fsPromises;
    const npath = path;
    const fileName: string = npath.basename(dir);
    let data: CategoryTaxonomy[] = [];
    let isLoading = 'Loading file: ';
    console.log(isLoading + fileName);
    try {
      const raw = await fsp.readFile(dir, 'utf-8');
      const obj = JSON.parse(raw) as CategoryTaxonomy[];
      data = obj;
      isLoading = 'loaded !';
      console.log('File: ' + npath.basename(dir) + ' ' + isLoading);
    } catch (err) {
      console.error('Read file failed: ' + err);
    }
    return data;
  }
}
