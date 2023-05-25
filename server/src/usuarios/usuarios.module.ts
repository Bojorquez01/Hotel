import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosResolver } from './usuarios.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Reservacion } from 'src/reservacion/entities/reservacion.entity';
import { AdminGuard } from 'src/roles/admin.guard';
import { TrabajadorAdminGuard } from 'src/roles/trabajador-admin.guard';
import { TrabajadorGuard } from 'src/roles/trabajador.guard';
import { ClienteGuard } from 'src/roles/cliente.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Reservacion])],
  providers: [UsuariosResolver, UsuariosService, AdminGuard, TrabajadorAdminGuard, TrabajadorGuard, ClienteGuard, JwtService],
  exports: [UsuariosService]
})
export class UsuariosModule {
}

/**
 * @Module({
  imports: [TypeOrmModule.forFeature([UserAccess]), UserAccessModule, UsuariosModule],
  providers: [UserAccessResolver, UserAccessService, AdminGuard, UserGuard],
  exports: [UserAccessService],
})
 */
