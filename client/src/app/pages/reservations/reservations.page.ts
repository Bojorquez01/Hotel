import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/connection.service';
import  Swal  from 'sweetalert2';

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
  reserva: any;

  constructor(private restService: ConnectionService) {
    this.numHuespedes = 0;
    this.fechaInicio = '';
    this.fechaFinal = '';
    this.mostrarConsultarReserva = false;
    this.reserva = null;
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
          this.mostrarConsultarReserva = true;
          this.reserva = response.data.createReservacion;
          Swal.fire({
            title: 'Reserva creada con exito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            width: '100%',
            padding: '2em',
            background: '#f6f6f6',
            position: 'center',
            heightAuto: false
          });
        } else {
          console.log("Error en la respuesta del servidor:", response);
          Swal.fire({
            title: 'La reservación no se pudo concretar',
            icon: 'success',
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
        console.log("Error en la solicitud:", error);
      }
    );
  }

  consultarReserva() {
    console.log("Consultando reserva:");
  }
}
