import { Injectable, Inject } from '@nestjs/common';
//import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SupplierService {
  data: {
    message: string;
    options:
      | {
          titolo: string;
        }
      | undefined;
  } = { message: '', options: { titolo: '' } };

  constructor(
    @Inject('TEST_DATA')
    private testData: { message: string; options: { titolo: string } },
    //private dataSource: DataSource,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {
    this.data = {
      message: testData.message,
      options: { titolo: testData.options.titolo },
    };
  }
  findOne(id: number): Promise<Supplier | null> {
    return this.supplierRepository.findOneBy({ id });
  }
}
