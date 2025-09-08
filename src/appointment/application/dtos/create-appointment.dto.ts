import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'Número de seguro médico',
  })
  @IsString()
  @IsNotEmpty()
  insuredId!: string;

  @ApiProperty({
    description: 'Número de orden de cita',
  })
  @IsNumber()
  scheduleId!: number;

  @ApiProperty({
    description: 'País en formato ISO (ejemplo: CL, PE)',
  })
  @IsString()
  @IsNotEmpty()
  countryISO!: string;
}
