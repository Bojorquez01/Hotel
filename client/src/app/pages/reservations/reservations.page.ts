import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/connection.service';

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
          console.log("Datos enviados");
          console.log(this.numHuespedes);
          console.log(fechaInicioFormatted);

          // Mostrar los datos de la reserva
          console.log("Datos de la reserva:", this.reserva);
        } else {
          console.log("Error en la respuesta del servidor:", response);
          console.log(this.numHuespedes);
          console.log(fechaInicioFormatted);
          console.log(fechaFinalFormatted);
        }
      },
      (error: any) => {
        console.log("Error en la solicitud:", error);
      }
    );
  }

  consultarReserva() {
    console.log("Consultando reserva:", this.reserva);
    // Aquí puedes realizar la lógica adicional para mostrar los detalles de la reserva en tu interfaz de usuario
  }
}
