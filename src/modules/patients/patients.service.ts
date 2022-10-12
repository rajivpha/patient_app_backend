import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient, 'primary')
    private readonly patientRepository: Repository<Patient>,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    try {
      if (
        await this.patientRepository.findOne({
          where: { email: createPatientDto.email },
        })
      )
        throw new BadRequestException('Duplicate Email');

      return await this.patientRepository.save({ ...createPatientDto });
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }

  async findAll() {
    return await this.patientRepository.find({
      order: { isSpecial: 'ASC', fullName: 'ASC' },
    });
  }

  async findOne(id: string) {
    return await this.patientRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    try {
      if (
        updatePatientDto.email &&
        (await this.patientRepository.findOne({
          where: { id: Not(id), email: updatePatientDto.email },
        }))
      )
        throw new BadRequestException('Duplicate Email');

      await this.patientRepository.update({ id: id }, { ...updatePatientDto });
      return await this.findOne(id);
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }

  async remove(id: string) {
    return await this.patientRepository.delete({ id: id });
  }
}
