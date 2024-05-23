/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaEntity } from './propuesta';
import { PropuestaController } from './propuesta.controller';
import { PropuestaService } from './propuesta.service';

@Module({
  providers: [PropuestaService],
  controllers: [PropuestaController],
  imports: [TypeOrmModule.forFeature([PropuestaEntity])],

})
export class PropuestaModule {}
