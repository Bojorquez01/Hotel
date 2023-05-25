import { ConflictException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateReservacionInput } from './dto/create-reservacion.input';
import { UpdateReservacionInput } from './dto/update-reservacion.input';
import { MoreThan, Repository } from 'typeorm';
import { Reservacion } from './entities/reservacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { differenceInDays } from 'date-fns';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';
import { HabitacionService } from 'src/habitacion/habitacion.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Context } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ClienteGuard } from 'src/roles/cliente.guard';
import { CreateReservacionRecepcionistaInput } from './dto/create-reservacion-recepcionista.input';
import { TrabajadorGuard } from 'src/roles/trabajador.guard';

@Injectable()
export class ReservacionService {

  constructor(

    @InjectRepository(Reservacion)
    private reservacionRepositorio: Repository<Reservacion>,

    @InjectRepository(Habitacion)
    private habitacionRepository: Repository<Habitacion>,

    private habitacionService: HabitacionService,

    private usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
  ){

  }



  async create(createReservacionInput: CreateReservacionInput,  @Context() context) {

    const token = context.req.headers.authorization.replace('Bearer ', '');
    const payload: any = this.jwtService.decode(token);
    const usuarioId = payload.id;

    const pre_reserva = this.reservacionRepositorio.create(createReservacionInput);
    
    //Obtiene el dia
    const fecha_hoy = new Date();
    fecha_hoy.setHours(0,0,0,0);

    //Obtiene la hora
    const hora = new Date();
    const hora_actual = `${hora.getHours()}:${hora.getMinutes()}:${hora.getSeconds()}`;


    //Para valor absoluto Math.abs
    //Retorna en entero y en días la diferencia de fechas
    const periodo =  Math.abs(differenceInDays(pre_reserva.fecha_inicio, pre_reserva.fecha_final));

        //Asignar habitacion

        // Asignar habitacion
const num_huespedes = pre_reserva.num_huespedes;

let habitacionCupo = await this.habitacionRepository.findOne({
  where: {
    capacidad: num_huespedes,
    estado: 'libre'
  }
});

if (!habitacionCupo) {
  habitacionCupo = await this.habitacionRepository.findOne({
    where: {
      capacidad: MoreThan(num_huespedes),
      estado: 'libre'
    }
  });

}

if (habitacionCupo) {
  habitacionCupo.estado = 'reservada';
  await this.habitacionRepository.update(habitacionCupo.id, { estado: 'reservada' });
  pre_reserva.habitacion_id = habitacionCupo.id;
} else {
  throw new ConflictException('No hay habitaciones disponibles para el número de huéspedes especificado.');
}

        


    //Calcular el monto
    const habitacion = this.getHabitacion(pre_reserva.habitacion_id);
    const monto = (await habitacion).precio * periodo;



    //calcular habitaciones

    const habitacionNum = this.usuarioService.getReservaciones(pre_reserva.id)
    const number_cuartos = (await habitacionNum).length; 

  const reservacion = new Reservacion();

  reservacion.fecha_reserva = fecha_hoy;
  reservacion.hora_registro = hora_actual;
  reservacion.fecha_inicio = pre_reserva.fecha_inicio;
  reservacion.fecha_final = pre_reserva.fecha_final;
  reservacion.num_huespedes = pre_reserva.num_huespedes;
  reservacion.habitacion_id = pre_reserva.habitacion_id;
  reservacion.persona_id = usuarioId; //pre_reserva.persona_id;
  reservacion.num_cuartos = number_cuartos + 1;//pre_reserva.num_cuartos; //SOn el total de cuartos asociados a la persona
  reservacion.monto = monto; //Es lo que costaría en total segun el precio de la habitacion y los dias de instancia periodo
  reservacion.periodo = periodo;
  reservacion.id = pre_reserva.id;
  reservacion.nombre_cliente = null;

  //Espera para asi obtener el id
 const reservaDOne = await this.reservacionRepositorio.save(reservacion);

  return reservaDOne;
  }

  
   
    async createRecepcion(createReservacionRecepcionistaInput: CreateReservacionRecepcionistaInput,  @Context() context) {

    const token = context.req.headers.authorization.replace('Bearer ', '');
    const payload: any = this.jwtService.decode(token);
    const usuarioId = payload.id;

    const pre_reserva = this.reservacionRepositorio.create(createReservacionRecepcionistaInput);
    
    //Obtiene el dia
    const fecha_hoy = new Date();
    fecha_hoy.setHours(0,0,0,0);

    //Obtiene la hora
    const hora = new Date();
    const hora_actual = `${hora.getHours()}:${hora.getMinutes()}:${hora.getSeconds()}`;


    //Para valor absoluto Math.abs
    //Retorna en entero y en días la diferencia de fechas
    const periodo =  Math.abs(differenceInDays(pre_reserva.fecha_inicio, pre_reserva.fecha_final));

        //Asignar habitacion

        // Asignar habitacion
const num_huespedes = pre_reserva.num_huespedes;

let habitacionCupo = await this.habitacionRepository.findOne({
  where: {
    capacidad: num_huespedes,
    estado: 'libre'
  }
});

if (!habitacionCupo) {
  habitacionCupo = await this.habitacionRepository.findOne({
    where: {
      capacidad: MoreThan(num_huespedes),
      estado: 'libre'
    }
  });

}

if (habitacionCupo) {
  habitacionCupo.estado = 'reservada';
  await this.habitacionRepository.update(habitacionCupo.id, { estado: 'reservada' });
  pre_reserva.habitacion_id = habitacionCupo.id;
} else {
  throw new ConflictException('No hay habitaciones disponibles para el número de huéspedes especificado.');
}

        


    //Calcular el monto
    const habitacion = this.getHabitacion(pre_reserva.habitacion_id);
    const monto = (await habitacion).precio * periodo;



    //calcular habitaciones

    const habitacionNum = this.usuarioService.getReservaciones(pre_reserva.id)
    const number_cuartos = (await habitacionNum).length; 

  const reservacion = new Reservacion();

  reservacion.fecha_reserva = fecha_hoy;
  reservacion.hora_registro = hora_actual;
  reservacion.fecha_inicio = pre_reserva.fecha_inicio;
  reservacion.fecha_final = pre_reserva.fecha_final;
  reservacion.num_huespedes = pre_reserva.num_huespedes;
  reservacion.habitacion_id = pre_reserva.habitacion_id;
  reservacion.persona_id = usuarioId; //pre_reserva.persona_id;
  reservacion.num_cuartos = number_cuartos + 1;//pre_reserva.num_cuartos; //SOn el total de cuartos asociados a la persona
  reservacion.monto = monto; //Es lo que costaría en total segun el precio de la habitacion y los dias de instancia periodo
  reservacion.periodo = periodo;
  reservacion.id = pre_reserva.id;
  reservacion.nombre_cliente = pre_reserva.nombre_cliente;

  //Espera para asi obtener el id
 const reservaDOne = await this.reservacionRepositorio.save(reservacion);

  return reservaDOne;
  }
   

  findAll() {
    return this.reservacionRepositorio.find();
  }

  findOne(id: number) {
    return this.reservacionRepositorio.findOne({
      where: {id},
    });
  }

  update(id: number, updateReservacionInput: UpdateReservacionInput) {
    return `This action updates a #${id} reservacion`;
  }

  async remove(id: number): Promise<Boolean> {
    const reserva = await this.reservacionRepositorio.findOne({
      where: {id}
    })

    if (reserva){
      const resultado = await this.reservacionRepositorio.delete(id);
      
      if (resultado.affected !==0){
        return true;
      }
    } else {
      throw new NotFoundException(`Reservacion con el ID ${id} no fue econtrada no existe`);
    }
  }
  
  getHabitacion(id: number): Promise<Habitacion>{
    return this.habitacionService.findOne(id) ;
  }

  getUsuario(id: number): Promise<Usuario>{
    return this.usuarioService.findOne(id);
  }

  //Esto lo hará Recepcionista
  async confirmarReserva(id: number, updateReservacionInput: UpdateReservacionInput){

    const reservacion = await this.reservacionRepositorio.findOneBy({id: id});

    if (reservacion){
      await this.habitacionRepository.update(updateReservacionInput.id, { estado: 'ocupada' });
    }else{
      throw new NotFoundException('No hay reservas con este id');
    }
  }

  async totalGananciasReservas(): Promise<number> {
    const reserva = await this.reservacionRepositorio.find();
    const total = reserva.reduce((accumulator, reservacion) => accumulator + reservacion.monto, 0);
    return total;
  }


  
   
}
