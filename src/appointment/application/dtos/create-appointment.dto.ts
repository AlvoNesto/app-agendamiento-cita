import { IsString, Matches, IsIn, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'Número de seguro médico',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5}$/, {
    message: 'El insuredId debe ser un código de 5 dígitos (incluyendo ceros a la izquierda)',
  })
  insuredId!: string;

  @ApiProperty({
    description: 'Espacio para agendar la cita',
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'El scheduleId debe ser un número' })
  scheduleId!: number;

  @ApiProperty({
    description: 'País en formato ISO (ejemplo: CL, PE)',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['PE', 'CL'], {
    message: 'El countryISO solo puede ser "PE" o "CL"',
  })
  countryISO!: string;
}
