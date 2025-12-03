import { Injectable, OnModuleInit } from '@nestjs/common';
import { FileService, GoogleTaxonomy } from '../file/file.service';

@Injectable()
export class CategoriesService implements OnModuleInit {
  supplier: string = 'google_taxonomy';
  constructor(private fileService: FileService) {}

  onModuleInit() {
    void this.saveCategory();
  }

  async getData(): Promise<GoogleTaxonomy[]> {
    const response = await this.fileService.handleFile(
      process.env.STORAGE_BASE_URL + '/' + this.supplier + '.json',
    );
    return response;
  }

  async saveCategory() {
    const categories = await this.getData();
    for (const category of categories) {
      console.log(category.name);
    }
  }
}
