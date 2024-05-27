/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EstudianteDto {
  @IsString()
  @IsNotEmpty()
  readonly codigo: string;

  @IsNumber()
  @IsNotEmpty()
  readonly creditosAprobados: number;

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsNumber()
  @IsNotEmpty()
  readonly numeroExtension: string;
}