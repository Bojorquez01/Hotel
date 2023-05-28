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
    const mutation = `mutation {
      createReservacion(createReservacionInput:{
        num_huespedes: ${this.numHuespedes},
        fecha_inicio: "${this.fechaInicio}",
        fecha_final: "${this.fechaFinal}"
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
        this.mostrarConsultarReserva = true;
        this.reserva = response.data.createReservacion;
        console.log("Datos enviados");
      },
      (error: any) => {
        console.log("Error:", error);
      }
    );
  }

  consultarReserva() {
    console.log("Consultando reserva:", this.reserva);
    // Aquí puedes realizar la lógica adicional para mostrar los detalles de la reserva en tu interfaz de usuario
  }
}