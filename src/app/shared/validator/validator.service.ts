import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  noPuedeSerStrider(control: FormControl) {
    const valor: string = control.value?.trim().toLowerCase();
    //console.log(valor);
    if (valor === 'strider') {
      return { noStrider: false }; // da igual poner noStrider:true
      // con que devuelva un objeto significa ERROR.
    }
    return null; // todo ha ido bien
  }

  camposIguales(campo1: string, campo2: string) {
    //recibe un control del tipo FormGroup, y a partir de él accedemos a campo1 y campo2
    //y retorna del tipo validationerror o null
    return (micontrol: FormGroup): ValidationErrors | null => {
      const pass1 = micontrol.get(campo1)?.value;
      const pass2 = micontrol.get(campo2)?.value;
      // console.log(pass1, pass2);
      if (pass1 !== pass2) {
        micontrol.get(campo2)?.setErrors({ noIguales: true })
        return { noIguales: true }
      }
      //micontrol.get(campo2)?.setErrors(null); 
      //CUIDADO: quita cualquier error que tenga el campo2
      return null; //Null significa que todo está bien.
    }
  }
}
