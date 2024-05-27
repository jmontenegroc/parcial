/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class PropuestaDto {
  @IsString()
  @IsNotEmpty()
  readonly titulo: string;

  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @IsString()
  @IsNotEmpty()
  readonly palabraClaves: string;
}
