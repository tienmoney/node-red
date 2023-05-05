import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from './entities/upload.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}
  async saveLocalFile(file: Express.Multer.File) {
    const upload = new Upload();
    upload.filename = file.filename;
    upload.path = file.path;
    upload.mimetype = file.mimetype;
    await this.uploadRepository.save(upload);
    return upload;
  }

  async getFilesById(id: number) {
    const file = await this.uploadRepository.findOne({ where: { id } });
    if (!file) {
      return null;
    }
    return file;
  }
}
