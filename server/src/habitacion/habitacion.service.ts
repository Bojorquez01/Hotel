import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitacionInput } from './dto/create-habitacion.input';
import { UpdateHabitacionInput } from './dto/update-habitacion.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Habitacion } from './entities/habitacion.entity';
import { Repository } from 'typeorm';
import { TipoHabitacion } from '../tipo_habitacion/entities/tipo_habitacion.entity';
import { TipoHabitacionService } from '../tipo_habitacion/tipo_habitacion.service';

@Injectable()
export class HabitacionService {

  constructor(
    
    @InjectRepository(Habitacion)
    private habitacionRepositorio: Repository<Habitacion>,

    private tipoHabitacionServicio: TipoHabitacionService,
  ){};

  //CREATE
  create(habitacion: CreateHabitacionInput): Promise<Habitacion>{
    const newHabitacion =  this.habitacionRepositorio.create(habitacion)
    return this.habitacionRepositorio.save(newHabitacion);
  }


  //READ

  //Muestra todos los usuarios
  findAll(): Promise<Habitacion[]> {
    return this.habitacionRepositorio.find();
  }

  //Muestra solo uno (según el id dado) de los usuarios
  async findOne(id: number): Promise<Habitacion> {
    const usuario = await this.habitacionRepositorio.findOneBy({id: id})

    if(usuario){
      return usuario;
    } else{
      throw new NotFoundException(`La habitación  ${id} no fue econtrada o no existe`);
    }
  }

  //Invoca el servicio del repositorio de tipo de usuario para conseguir sus datos
  getTipoHabitacion(tipo_habitacion_id: number): Promise<TipoHabitacion>{
    return this.tipoHabitacionServicio.findOne(tipo_habitacion_id);

  };

  //Fin READ


  //UPDATE
  async update(id: number, updateHabitacionInput: UpdateHabitacionInput): Promise<Habitacion> {
    const habitacion = await this.habitacionRepositorio.findOneBy({id: id})

    if(habitacion){
      await this.habitacionRepositorio.update(id, updateHabitacionInput);
      return this.habitacionRepositorio.findOneBy({id: id})
    } else {
      throw new NotFoundException (`La habitacion ${id} no fue econtrada o no existe`);
    }
  }

  //DELETE
  async remove(id: number): Promise<Boolean> {
    const habitacion = await this.habitacionRepositorio.findOne({
      where: {id}
    })

    if (habitacion){
      const resultado = await this.habitacionRepositorio.delete(id);
      
      if (resultado.affected !==0){
        return true;
      }
    } else {
      throw new NotFoundException(`Habitacion con el ID ${id} no fue econtrado o no existe`);
    }

  }
}
