import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/connection.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  numHuespedes: number;
  fechaInicio: string;
  fechaFinal: string;
  mostrarConsultarReserva: boolean;
  monto: number;
  periodo: number;
  id: number;

  constructor(private restService: ConnectionService) {
    this.numHuespedes = 0;
    this.fechaInicio = '';
    this.fechaFinal = '';
    this.mostrarConsultarReserva = false;
  }

  ngOnInit() {}

  reserve() {
    const fechaInicioFormatted = new Date(this.fechaInicio).toISOString().split('T')[0];
    const fechaFinalFormatted = new Date(this.fechaFinal).toISOString().split('T')[0];

    const mutation = `mutation {
      createReservacion(createReservacionInput:{
        num_huespedes: ${this.numHuespedes},
        fecha_inicio: "${fechaInicioFormatted}",
        fecha_final: "${fechaFinalFormatted}"
      }){
        id,
        fecha_reserva,
        periodo,
        monto,
        id,
        habitacion{
          precio
          ubicacion
        }
        usuario{
          nombre,
          apPaterno,
          apMaterno
        }
      }
    }`;

    this.restService.add(mutation).subscribe(
      (response: any) => {
        if (response.data && response.data.createReservacion) {
          const reserva = response.data.createReservacion;
          this.mostrarConsultarReserva = true;
          Swal.fire({
            title: 'Reserva creada con éxito',
            icon: 'success',
            html: `
              <h3>Detalles de la reserva:</h3>
              <p>Número de reservación: ${reserva.id}</p>
              <p>Nombre del titular: ${reserva.usuario.nombre} ${reserva.usuario.apPaterno} ${reserva.usuario.apMaterno}</p>
              <p>Precio por noche: ${reserva.habitacion.precio}</p>
              <p>Ubicación: ${reserva.habitacion.ubicacion}</p>
              <p>Llegada: ${fechaInicioFormatted}</p>
              <p>Salida:${fechaFinalFormatted}</p>
              <p>Total: ${reserva.monto}</p>
            `,
            confirmButtonText: 'Aceptar',
            width: '100%',
            padding: '2em',
            background: '#f6f6f6',
            position: 'center',
            heightAuto: false
          });
        } else {
          console.log('Error en la respuesta del servidor:', response);
          Swal.fire({
            title: 'La reservación no se pudo concretar, debido a que no hay habitaciones disponibles',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            width: '100%',
            padding: '2em',
            background: '#f6f6f6',
            position: 'center',
            heightAuto: false
          });
        }
      },
      (error: any) => {
        console.log('Error en la solicitud:', error);
      }
    );
  }
 /* consultarReserva() {
    const query = `query {
      reservaciones {
        id
        fecha_inicio
        fecha_final
        fecha_reserva
        monto
        num_huespedes
        periodo
        habitacion {
          id
          capacidad
          estado
          precio
          ubicacion
          tipo_habitacion {
            id
            tipo
          }
        }
        usuario {
          id
          nombre
          apPaterno
          apMaterno
        }
      }
    }`;
  
    this.restService.getAll<any>(query).subscribe(
      (response) => {
        if (response.data && response.data.reservaciones) {
          const reservas = response.data.reservaciones;
          let detallesReservas = '';
  
          reservas.forEach((reserva: any) => {
            detallesReservas += `
              <h3>Detalles de la reserva:</h3>
              <p>Nombre del titular: ${reserva.usuario.nombre} ${reserva.usuario.apPaterno} ${reserva.usuario.apMaterno}</p>
              <p>Precio por noche: ${reserva.habitacion.precio}</p>
              <p>Ubicación: ${reserva.habitacion.ubicacion}</p>
              <p>Fecha de llegada: ${reserva.fecha_inicio}</p>
              <p>Fecha de salida: ${reserva.fecha_final}</p>
              <p>Total: ${reserva.monto}</p>
              <hr>
            `;
          });
  
          Swal.fire({
            title: 'Consultar Reserva',
            icon: 'success',
            html: detallesReservas,
            confirmButtonText: 'Aceptar',
            width: '100%',
            padding: '2em',
            background: '#f6f6f6',
            position: 'center',
            heightAuto: false
          });
        } else {
          console.log('Error en la respuesta del servidor:', response);
          Swal.fire({
            title: 'Error al consultar las reservas',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            width: '100%',
            padding: '2em',
            background: '#f6f6f6',
            position: 'center',
            heightAuto: false
          });
        }
      },
      (error: any) => {
        console.log('Error en la solicitud:', error);
      }
    );
  }  */
}