import { Module } from '@nestjs/common';
import { TipoUsuariosResolver } from './tipo_usuarios.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUsuario } from './entities/tipo_usuario.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { TipoUsuariosService } from './tipo_usuarios.service';


@Module({
  imports: [TypeOrmModule.forFeature([TipoUsuario, Usuario])],
  providers: [TipoUsuariosResolver, TipoUsuariosService],
  exports: [TipoUsuariosService],
})
export class TipoUsuariosModule {}
