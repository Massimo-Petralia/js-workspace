import { Injectable, OnModuleInit } from '@nestjs/common';
import { FileService } from '../file/file.service';

@Injectable()
export class CategoriesService implements OnModuleInit {
  supplier: string = 'google_taxonomy';
  constructor(private fileService: FileService) {}

  onModuleInit() {
    void this.getData();
  }

  async getData() {
    await this.fileService.handleFile(
      process.env.STORAGE_BASE_URL + '/' + this.supplier + '.json',
    );
  }
}
