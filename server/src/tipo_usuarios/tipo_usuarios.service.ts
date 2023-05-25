import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoUsuarioInput } from './dto/create-tipo_usuario.input';
import { UpdateTipoUsuarioInput } from './dto/update-tipo_usuario.input';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoUsuario } from './entities/tipo_usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoUsuariosService {

  constructor(
    @InjectRepository(TipoUsuario)
    private tipoUsuarioRepositorio: Repository<TipoUsuario>,
  ){};

  create(createTipoUsuarioInput: CreateTipoUsuarioInput): Promise<TipoUsuario> {
    const tipoUsuario = this.tipoUsuarioRepositorio.create(createTipoUsuarioInput);
    return this.tipoUsuarioRepositorio.save(tipoUsuario);
  }

  findAll(): Promise<TipoUsuario[]> {
    return this.tipoUsuarioRepositorio.find();
  }

  findOne(id: number): Promise<TipoUsuario> {
    return this.tipoUsuarioRepositorio.findOne({
      where:{id,}
    });
  }


  async update(id: number, updateTipoUsuarioInput: UpdateTipoUsuarioInput): Promise<TipoUsuario> {

    const tipoUsuario = this.tipoUsuarioRepositorio.findOne({
      where:{id,}
    });

    if(tipoUsuario){
      await this.tipoUsuarioRepositorio.update(id, updateTipoUsuarioInput);
      return this.tipoUsuarioRepositorio.findOneBy({id:id});

    } else {
      throw new NotFoundException(`Tipo de usuario con el id ${id} no fue encontrado o existe`);
    }
  }




  async remove(id: number): Promise<Boolean> {
    const tipoUsuario = await this.tipoUsuarioRepositorio.findOne({
      where: {id}
    })

    if (tipoUsuario){
      const resultado = await this.tipoUsuarioRepositorio.delete(id);
      
      if (resultado.affected !==0){
        return true;
      }
    } else {
      throw new NotFoundException(`Tipo de usuario con el ID ${id} no fue econtrado o no existe`);
    }
  }
}
