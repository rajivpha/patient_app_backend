import { Injectable, HttpException } from '@nestjs/common';
import { CreateCloudinaryDto } from './dto/create-cloudinary.dto';
import { UpdateCloudinaryDto } from './dto/update-cloudinary.dto';
import { v2 } from 'cloudinary';
import DatauriParser from 'datauri/parser';

@Injectable()
export class CloudinaryService {
  create(createCloudinaryDto: CreateCloudinaryDto) {
    return 'This action adds a new cloudinary';
  }

  findAll() {
    return `This action returns all cloudinary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cloudinary`;
  }

  update(id: number, updateCloudinaryDto: UpdateCloudinaryDto) {
    return `This action updates a #${id} cloudinary`;
  }

  remove(id: number) {
    return `This action removes a #${id} cloudinary`;
  }

  async uploadImage(file: Express.Multer.File) {
    if (!file) throw new HttpException('File not Found', 400);

    const fileFormat = file.mimetype.split('/')[1];
    const parser = new DatauriParser();
    const { base64 } = parser.format(fileFormat, file.buffer);

    const res = await v2.uploader.upload(
      `data:image/${fileFormat};base64,${base64}`,
    );

    return res;
  }
}
