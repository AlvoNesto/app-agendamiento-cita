// src/appointment/dto/create-appointment.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsString() @IsNotEmpty()
  id!: string;

  @IsString() @IsNotEmpty()
  insuredId!: string;

  @IsString() @IsNotEmpty()
  countryISO!: string;

  @IsString() @IsOptional()
  metadata?: string;
}
