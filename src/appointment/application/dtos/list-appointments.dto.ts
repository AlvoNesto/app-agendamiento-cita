import { IsString, IsNotEmpty } from 'class-validator';

export class ListAppointmentsDto {
  @IsString()
  @IsNotEmpty()
  insuredId!: string;
}
