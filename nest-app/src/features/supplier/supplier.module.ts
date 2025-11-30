import { DynamicModule, Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';

export function createTestProvides(options?: { titolo: string }) {
  return [
    {
      provide: 'TEST_DATA',

      useValue: { message: 'ciao sono un provider dinamico', options },
    },
  ];
}

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  providers: [],
  controllers: [],
  exports: [],
})
export class SupplierModule {
  static forFeature(opt: { titolo: string }): DynamicModule {
    const providers = createTestProvides(opt);
    return {
      module: SupplierModule,
      providers: [SupplierService, ...providers],
      exports: [SupplierService, ...providers],
      controllers: [SupplierController],
    };
  }
}
