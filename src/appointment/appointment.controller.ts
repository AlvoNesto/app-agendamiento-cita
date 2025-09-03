// src/appointment/appointment.controller.ts
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() dto: CreateAppointmentDto) {
    return await this.service.create(dto);
  }

  @Get(':insuredId')
  async findByInsured(@Param('insuredId') insuredId: string) {
    return await this.service.findByInsured(insuredId);
  }
}
