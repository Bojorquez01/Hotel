import { Injectable, UseGuards } from '@nestjs/common';
import { CreateReporteInput } from './dto/create-reporte.input';
import { UpdateReporteInput } from './dto/update-reporte.input';
import { Reporte } from './entities/reporte.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GastosService } from 'src/gastos/gastos.service';
import { Reservacion } from 'src/reservacion/entities/reservacion.entity';
import { ReservacionService } from 'src/reservacion/reservacion.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Context } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { TrabajadorAdminGuard } from 'src/roles/trabajador-admin.guard';
import { TrabajadorGuard } from 'src/roles/trabajador.guard';

@Injectable()
export class ReporteService {

  constructor(


    @InjectRepository(Reporte)
    private reporteRepository: Repository<Reporte>,

    private gastosService: GastosService,

    private reservasService: ReservacionService,

    private usuariosService: UsuariosService,

    private readonly jwtService: JwtService,
  ){

  }


@UseGuards(TrabajadorGuard)
  async create(@Context() context) {

    const token = context.req.headers.authorization.replace('Bearer ', '');
    const payload: any = this.jwtService.decode(token);

    const nombreUser = payload.nombre;
    const apPaterno = payload.apPaterno;
    const apMaterno = payload.apMaterno;


    const fecha_hoy = new Date();
    fecha_hoy.setHours(0,0,0,0);

    //obtiene gastos
    const gastosT = await this.gastosService.totalGastos();

    //Total reservas
    const reservasT = (await this.reservasService.findAll()).length;

    const usuariosT = (await this.usuariosService.findAll()).length;

    const totalGananciasReservas = await this.reservasService.totalGananciasReservas();

        //Obtiene la hora
        const hora = new Date();
        const hora_actual = `${hora.getHours()}:${hora.getMinutes()}:${hora.getSeconds()}`;
    

    const reporte = new Reporte();
    reporte.fecha = fecha_hoy;
    reporte.total_gastos = gastosT;
    reporte.total_reservas = reservasT;
    reporte.total_usuarios = usuariosT;
    reporte.total_ingresos_reservas = totalGananciasReservas;
    reporte.hora_reporte = hora_actual;
    reporte.nombre_autor = nombreUser + " " + apPaterno + " " + apMaterno;


    const reporteDone = await this.reporteRepository.save(reporte);
    return reporteDone;


  }

  @UseGuards(TrabajadorAdminGuard)
  findAll() {
    return this.reporteRepository.find();
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
