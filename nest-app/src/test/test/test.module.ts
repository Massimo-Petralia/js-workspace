import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { ConfigModule } from '@nestjs/config';
import { SupplierModule } from 'src/features/supplier/supplier.module';

@Module({
  imports: [ConfigModule, SupplierModule.forFeature({ titolo: 'SupplierA !' })],
  providers: [
    {
      provide: 'MY-TOKEN',
      useClass: TestService,
    },
  ],
  controllers: [TestController],
  exports: ['MY-TOKEN', SupplierModule],
})
export class TestModule {}
