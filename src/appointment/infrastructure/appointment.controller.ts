import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppointmentService } from '../application/appointment.service';
import { CreateAppointmentDto } from '../application/dtos/create-appointment.dto';
import { ListAppointmentsDto } from '../application/dtos/list-appointments.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Post()
  async create(@Body() body: CreateAppointmentDto) {
    return this.service.createAppointment(body.insuredId, body.scheduleId, body.countryISO);
  }

  @Get(':insuredId')
  async list(@Param() params: ListAppointmentsDto) {
    return this.service.listAppointments(params.insuredId);
  }
}
