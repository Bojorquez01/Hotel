import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateTipoHabitacionInput } from './dto/create-tipo_habitacion.input';
import { UpdateTipoHabitacionInput } from './dto/update-tipo_habitacion.input';
import { Repository } from 'typeorm';
import { TipoHabitacion } from './entities/tipo_habitacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminGuard } from 'src/roles/admin.guard';

@Injectable()
export class TipoHabitacionService {

  constructor(
    @InjectRepository(TipoHabitacion)
    private tipoHabitacionRepository: Repository<TipoHabitacion>,
  ){}

  @UseGuards(AdminGuard)
  async create(createTipoHabitacionInput: CreateTipoHabitacionInput): Promise<TipoHabitacion> {
    const tipoHabitacion = await this.tipoHabitacionRepository.create(createTipoHabitacionInput);

    return this.tipoHabitacionRepository.save(tipoHabitacion);
  }

  @UseGuards(AdminGuard)
  findAll() {
    return this.tipoHabitacionRepository.find();
  }


  findOne(id: number) {
    
    return this.tipoHabitacionRepository.findOneBy({id: id});
  }

  @UseGuards(AdminGuard)
  async update(id: number, updateTipoHabitacionInput: UpdateTipoHabitacionInput): Promise<TipoHabitacion> {
    
    const tipoHab = await this.tipoHabitacionRepository.findOneBy({id: id});

    if (tipoHab){

      await this.tipoHabitacionRepository.update(id, updateTipoHabitacionInput);

      return this.tipoHabitacionRepository.findOneBy({id:id});
      
    }else{
      throw new NotFoundException('No encontrado');
    }

  }

  @UseGuards(AdminGuard)
  async remove(id: number): Promise<Boolean> {
    const tipoHabitacion = await this.tipoHabitacionRepository.findOne({
      where: {id}
    })

    if (tipoHabitacion){
      const resultado = await this.tipoHabitacionRepository.delete(id);
      
      if (resultado.affected !==0){
        return true;
      }
    } else {

      throw new NotFoundException(`Tipo de Habitacion con el ID ${id} no fue econtrado o no existe`);
    }
  }
  
}
