import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  insuredId!: string;

  @IsNumber()
  scheduleId!: number;

  @IsString()
  @IsNotEmpty()
  countryISO!: string;
}
