import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@UseGuards(LocalAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':patientId')
  findOne(@Param('patientId') patientId: string) {
    return this.patientsService.findOne(patientId);
  }

  @Put(':patientId')
  update(
    @Param('patientId') patientId: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientsService.update(patientId, updatePatientDto);
  }

  @Delete(':patientId')
  remove(@Param('patientId') patientId: string) {
    return this.patientsService.remove(patientId);
  }
}
