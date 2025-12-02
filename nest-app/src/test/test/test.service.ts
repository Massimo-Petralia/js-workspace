import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupplierService } from 'src/features/supplier/supplier.service';
import { FileService } from 'src/features/file/file.service';

@Injectable()
export class TestService implements OnModuleInit {
  titolo: string = '';
  message: string = '';
  supplier: string | undefined = '';
  fileHandler: any;
  constructor(
    private configService: ConfigService,
    private supplierService: SupplierService,
    private fileService: FileService,
  ) {
    this.getWholeEnv();
  }

  async onModuleInit() {
    const id: number = 1;
    const res = await this.supplierService.findOne(id);
    this.supplier = res?.supplier;
    console.log('value from table db is: ' + JSON.stringify(res));
    void this.getLocalData();
  }

  getWholeEnv() {
    console.log(
      'environment is: ' + this.configService.get<string>('http.host'),
    );
    this.titolo = this.supplierService.data.options!.titolo;
    this.message = this.supplierService.data.message;
    console.log('Provider value is: ' + this.titolo + ' ' + this.message);
  }

  async getLocalData() {
    await this.fileService.handleFile(
      process.env.STORAGE_BASE_URL + '/' + 'test-data.json',
    );
  }
}
