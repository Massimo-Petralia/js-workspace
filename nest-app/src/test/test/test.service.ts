import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//import { Supplier } from 'src/features/supplier/entities/supplier.entity';
import { SupplierService } from 'src/features/supplier/supplier.service';

// interface EnvironmentVariables {
//   host: string;
//   pass: string;
// }

@Injectable()
export class TestService implements OnModuleInit {
  titolo: string = '';
  message: string = '';
  supplier: string | undefined = '';
  constructor(
    private configService: ConfigService,
    private supplierService: SupplierService,
  ) {
    this.getWholeEnv();
  }

  async onModuleInit() {
    const id: number = 1;
    const res = await this.supplierService.findOne(id);
    this.supplier = res?.supplier;
    console.log('value from table db is: ' + JSON.stringify(res));
  }

  getWholeEnv() {
    console.log(
      'environment is: ' + this.configService.get<string>('http.host'),
    );
    this.titolo = this.supplierService.data.options!.titolo;
    this.message = this.supplierService.data.message;
    console.log('Provider value is: ' + this.titolo + ' ' + this.message);
  }
}
