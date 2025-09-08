import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ListAppointmentsDto {
  @ApiProperty({
    description: 'Número de seguro médico',
  })
  @IsString()
  @IsNotEmpty()
  insuredId!: string;
}
