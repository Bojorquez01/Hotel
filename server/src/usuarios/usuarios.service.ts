import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { TipoUsuario } from '../tipo_usuarios/entities/tipo_usuario.entity';
import { TipoUsuariosService } from '../tipo_usuarios/tipo_usuarios.service';
import { Reservacion } from 'src/reservacion/entities/reservacion.entity';

@Injectable()
export class UsuariosService {

  constructor(
    
    @InjectRepository(Usuario)
    private usuarioRepositorio: Repository<Usuario>,

    private tipoUsuarioServicio: TipoUsuariosService,

    @InjectRepository(Reservacion)
    private reservacionRepository: Repository<Reservacion>,
  ){};

  //CREATE
  create(usuario: CreateUsuarioInput): Promise<Usuario>{
    const newUsuario = this.usuarioRepositorio.create(usuario)
    return this.usuarioRepositorio.save(newUsuario);
  }

  //READ

  //Muestra todos los usuarios
  findAll(): Promise<Usuario[]> {
    return this.usuarioRepositorio.find();
  }

  //Muestra solo uno (según el id dado) de los usuarios
  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepositorio.findOne({
      where:{
        id,
      }
    })
    if(usuario){
      return usuario;
    } else{
      throw new NotFoundException(`Usuario con el ID ${id} no fue econtrado o no existe`);
    }
  }

  findOneByCorreo(correo: string): Promise<Usuario | undefined>{
    return this.usuarioRepositorio.findOneBy({correo: correo});
  };

  //Invoca el servicio del repositorio de tipo de usuario para conseguir sus datos
  getTipoUsuario(tipoUsr_id: number): Promise<TipoUsuario>{
    return this.tipoUsuarioServicio.findOne(tipoUsr_id)
  };

  //Fin READ


  //UPDATE
  async update(id: number, updateUsuarioInput: UpdateUsuarioInput): Promise<Usuario> {
    const usuario = await this.usuarioRepositorio.findOne({
      where:{
        id,
      }
    })
    if(usuario){
      await this.usuarioRepositorio.update(id, updateUsuarioInput);
      return this.usuarioRepositorio.findOneBy({id: id})
    } else {
      throw new NotFoundException (`Usuario con el ID ${id} no fue econtrado o no existe`);
    }
  }

  //DELETE
  async remove(id: number): Promise<Boolean> {
    const usuario = await this.usuarioRepositorio.findOne({
      where: {id}
    })

    if (usuario){
      const resultado = await this.usuarioRepositorio.delete(id);
      
      if (resultado.affected !==0){
        return true;
      }
    } else {
      throw new NotFoundException(`Usuario con el ID ${id} no fue econtrado o no existe`);
    }

  }

  //fin DELETE

  async getReservaciones(id: number): Promise<Reservacion[]> {
    return this.reservacionRepository.find({
      where:{
        persona_id: id
      }
    })
  }
//FIN CRUD
}
