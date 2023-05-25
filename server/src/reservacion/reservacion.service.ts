import { ConflictException, Injectable } from '@nestjs/common';
import { CreateReservacionInput } from './dto/create-reservacion.input';
import { UpdateReservacionInput } from './dto/update-reservacion.input';
import { Equal, LessThan, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { Reservacion } from './entities/reservacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { differenceInDays } from 'date-fns';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';
import { HabitacionService } from 'src/habitacion/habitacion.service';
import { TipoHabitacion } from 'src/tipo_habitacion/entities/tipo_habitacion.entity';
import { format } from 'path';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class ReservacionService {

  constructor(

    @InjectRepository(Reservacion)
    private reservacionRepositorio: Repository<Reservacion>,

    @InjectRepository(Habitacion)
    private habitacionRepository: Repository<Habitacion>,

    private habitacionService: HabitacionService,

    private usuarioService: UsuariosService,
  ){

  }


  async create(createReservacionInput: CreateReservacionInput) {

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
  habitacionCupo.estado = 'ocupada';
  await this.habitacionRepository.update(habitacionCupo.id, { estado: 'ocupada' });
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
  reservacion.persona_id = pre_reserva.persona_id;
  reservacion.num_cuartos = number_cuartos + 1;//pre_reserva.num_cuartos; //SOn el total de cuartos asociados a la persona
  reservacion.monto = monto; //Es lo que costaría en total segun el precio de la habitacion y los dias de instancia periodo
  reservacion.periodo = periodo;
  reservacion.id = pre_reserva.id;

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

  remove(id: number) {
    return `This action removes a #${id} reservacion`;
  }

  
  getHabitacion(id: number): Promise<Habitacion>{
    return this.habitacionService.findOne(id) ;
  }

  getUsuario(id: number): Promise<Usuario>{
    return this.usuarioService.findOne(id);
  }
   
}
