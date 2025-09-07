import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppointmentService } from '../application/appointment.service';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Post()
  async create(@Body() body: { insuredId: string; scheduleId: number; countryISO: string }) {
    return this.service.createAppointment(body.insuredId, body.scheduleId, body.countryISO);
  }

  @Get(':insuredId')
  async list(@Param('insuredId') insuredId: string) {
    return this.service.listAppointments(insuredId);
  }
}
