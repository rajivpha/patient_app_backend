import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { Patient } from './modules/patients/entities/patient.entity';
import { PatientsModule } from './modules/patients/patients.module';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';

const defaultOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  synchronize: false,
  logging: true,
};

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRoot({
      name: 'primary',
      ...defaultOptions,
      database: 'test',
      entities: [Patient, User],
    }),
    // TypeOrmModule.forRoot({
    //   name: 'secondary',
    //   ...defaultOptions,
    //   database: 'test1',
    //   entities: [],
    // }),
    AuthModule,
    PatientsModule,
    UsersModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
