import { Controller, Get, Param, Res } from '@nestjs/common';
import { join } from 'path';

const uploadDir = join(__dirname, '../../', 'upload_dist');

@Controller('api/static')
export class StaticController {
  @Get(':staticPath')
  render(@Param('staticPath') staticPath: string, @Res() res) {
    const filePath = join(uploadDir, staticPath);
    return res.sendFile(filePath);
  }
}
