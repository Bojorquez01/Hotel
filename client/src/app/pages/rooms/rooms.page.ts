import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  crearHabitacion() {
    // Código para crear la habitación

    // Redireccionar a la página "reporte"
    this.router.navigate(['/reporte']);
  }
}