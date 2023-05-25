import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGastoInput } from './dto/create-gasto.input';
import { UpdateGastoInput } from './dto/update-gasto.input';
import { Repository } from 'typeorm';
import { Gasto } from './entities/gasto.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GastosService {
   
  constructor(

    @InjectRepository(Gasto)
    private gastosRepository: Repository<Gasto>,
  ){
    
  }


  async create(createGastoInput: CreateGastoInput) {
    const existGasto = await this.gastosRepository.findOneBy({nombre: createGastoInput.nombre});

    if (existGasto){
      throw new ConflictException('Este gasto ya ha sido registrado');

    }else{
      const pre_gasto = this.gastosRepository.create(createGastoInput);

      const fecha_hoy = new Date();
      fecha_hoy.setHours(0,0,0,0);


      const gasto = new Gasto()
      gasto.empleado = 'empleado x'
      gasto.id = pre_gasto.id;
      gasto.monto = pre_gasto.monto;
      gasto.fecha = fecha_hoy;
      gasto.nombre = pre_gasto.nombre
      
      const gasto_hecho = await this.gastosRepository.save(gasto);
      return gasto_hecho;
    }

  }

  findAll() {
    return this.gastosRepository.find();
  }

  async findOne(nombre: string) {
    const gasto = await this.gastosRepository.findOneBy({nombre: nombre});

    if (gasto){
      return gasto;
    }else{
      throw new NotFoundException('No existe este gasto o no coinciden los nombres')
    }
  }


  async findOneById(id: number) {
    const gasto = await this.gastosRepository.findOneBy({id: id});

    if (gasto){
      return gasto;
    }else{
      throw new NotFoundException('No existe este gasto o no el id no existe');
    }
  }

  async update(id: number, updateGastoInput: UpdateGastoInput) {
    const gasto = await this.findOneById(id);

    if (gasto){

      return this.gastosRepository.update(id, updateGastoInput);

    }else{

      throw new NotFoundException('No existe este gasto o su id es incorrecto')
    }
  }

  //Pendiente
  remove(id: number) {
    return `This action removes a #${id} gasto`;
  }
}
