import { Injectable } from '@nestjs/common';
import { CreateReporteInput } from './dto/create-reporte.input';
import { UpdateReporteInput } from './dto/update-reporte.input';

@Injectable()
export class ReporteService {
  create(createReporteInput: CreateReporteInput) {
    return 'This action adds a new reporte';
  }

  findAll() {
    return `This action returns all reporte`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reporte`;
  }

  update(id: number, updateReporteInput: UpdateReporteInput) {
    return `This action updates a #${id} reporte`;
  }

  remove(id: number) {
    return `This action removes a #${id} reporte`;
  }
}
