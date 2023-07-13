import { Component } from '@angular/core';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent {
//agrego una propiedad llamada persona que tiene genero y notificaciones
persona = {
  genero: 'F',  // genero:'' , no hay nada seleccionado por defecto
  notificaciones: true,
}
//agrego otra propiedad
terminosYCondiciones: boolean = false;


}
