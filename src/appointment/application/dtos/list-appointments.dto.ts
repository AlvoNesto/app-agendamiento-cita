import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ListAppointmentsDto {
  @ApiProperty({
    description: 'Número de seguro médico (5 dígitos)',
  })
  @IsString()
  @IsNotEmpty()
  insuredId!: string;
}
