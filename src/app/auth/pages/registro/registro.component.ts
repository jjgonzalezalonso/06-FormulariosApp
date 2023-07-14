import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
//import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  constructor(private fb: FormBuilder, private vs: ValidatorService, private ev:EmailValidatorService) { }
  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Fernando Herrera', email: 'test1@test.com', username: 'fernando_her85', password: '123456', password2: '123456'
    });
  }

  //nombreApellidoPattern: string = '([a-zA-Z])+ ([a-zA-Z]+)'
  //emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)],[this.ev]],
    //email: ['', [ Validators.required,Validators.email ] ],
    username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
    password: ['', [Validators.required,Validators.minLength(6)]],
    password2: ['', [ Validators.required ]],
    },{
      validators:[this.vs.camposIguales('password','password2')]
      // es a nivel del formulario, tengo acceso a todos los controles
    });

  // noPuedeSerStrider(control:FormControl){
  //   const valor: string = control.value?.trim().toLowerCase();
  //   if (valor === 'strider'){
  //     return {noStrider: false};
  //   }
  //   return null;
  // }
  get emailErrorMsg() : string{
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.['required']) { 
      return 'Email es obligatorio';
    } else if (errors?.['pattern']) { 
      return 'Email no tiene el formato adecuado';
    } else if (errors?.['emailTomado']) { 
      return 'Email ya fue tomado';
    }
    return '';  //regreso un string vacio
  }

  emailRequired() {
    return this.miFormulario.get('email')?.errors?.['required']
          && this.miFormulario.get('email')?.touched; 
  }

  emailFormato() {
    return this.miFormulario.get('email')?.errors?.['pattern']
          && this.miFormulario.get('email')?.touched;
    }

    emailTomado() {
      return this.miFormulario.get('email')?.errors?.['emailTomado']
            && this.miFormulario.get('email')?.touched;
    }
  
  
  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched;
  }
  // ? por si el campo no existe.
  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
    //para disparar las validaciones en cada uno de los campos
  }
}

