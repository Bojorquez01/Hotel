import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RestService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  apMaterno!: string;
  apPaterno!: string;
  contrasenia!: string;
  correo!: string;
  fech_nacimiento!: Date;
  nombre!: string;
  numTelefono!: string;
  role_usuario!: number;
  tipo_usuario_id!: number;

  userTypes: any[] = [];
  userData = {
    apMaterno: "",
    apPaterno: "",
    contrasenia: "",
    correo: "",
    fech_nacimiento: null,
    nombre: "",
    numTelefono: "",
    role_usuario: 0,
    tipo_usuario_id: 0
  };
  errors = [
    { type: 'required', message: 'El campo no puede estar vacío' },
    { type: 'maxlength', message: 'El campo no puede contener tantos caracteres' },
    { type: 'minlength', message: 'El campo requiere más caracteres' },
    { type: 'pattern', message: 'La estructura no es la adecuada para este campo' }
  ];
  public addUsers = new FormGroup({
    name: new FormControl(this.userData.nombre, [Validators.required]),
    middle_name: new FormControl(this.userData.apPaterno, [Validators.required]),
    last_name: new FormControl(this.userData.apMaterno, [Validators.required]),
    phone_number: new FormControl(this.userData.numTelefono, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    email: new FormControl(this.userData.correo, [Validators.required, Validators.pattern(/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)])
  });

  constructor(private restService: RestService, private router: Router) { }

  ngOnInit() {
    const query = `
      query {
        userTypes {
          id,
          name
        }
      }
    `;
    this.restService.getAll(query).subscribe(
      (result: any) => {
        this.userTypes = result.data.userTypes;
      }
    );
  }

    public addUser() {
    if (
      !this.addUsers.controls.name.value ||
      !this.addUsers.controls.middle_name.value ||
      !this.addUsers.controls.last_name.value ||
      !this.addUsers.controls.phone_number.value ||
      !this.addUsers.controls.email.value
    ) {
      return;
    }

    const mutation = `
      mutation {
        createUser(userInput: {
          name: "${this.addUsers.controls.name.value}",
          middle_name: "${this.addUsers.controls.middle_name.value}",
          last_name: "${this.addUsers.controls.last_name.value}",
          phone_number: "${this.addUsers.controls.phone_number.value}",
          email: "${this.addUsers.controls.email.value}"
        }) {
          id
          name
          middle_name
          last_name
        }
      }
    `;
    this.restService.add(mutation).subscribe((answer: any) => {
      this.userData = {
        apMaterno: "",
        apPaterno: "",
        contrasenia: "",
        correo: "",
        fech_nacimiento: null,
        nombre: "",
        numTelefono: "",
        role_usuario: 0,
        tipo_usuario_id: 0
      };
      this.router.navigateByUrl('/users');
    });
  }
}
