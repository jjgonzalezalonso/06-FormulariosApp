import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent {
  
  @ViewChild('miFormulario') miFormulario!:NgForm;
  
  valorInicial ={
    producto:'RTX 4090', precio:3000, existencias:10
}

  guardar(){
    console.log('Posteo correcto');
    this.miFormulario.resetForm({
      producto:'Algo', precio:0,  existencias:0 });
  }

   nombreValido():boolean{
    //? si tenemos miFormulario
    return this.miFormulario?.form.controls['producto']?.invalid 
          && this.miFormulario?.form.controls['producto']?.touched
  }

  precioValido():boolean{
    //? si tenemos miFormulario
    return this.miFormulario?.form.controls['precio']?.invalid 
          && this.miFormulario?.form.controls['precio']?.touched
    //TAMBIEN funciona, en el .html tengo pueso min="0" 
    // return this.miFormulario?.form.controls['precio']?.value < 0 
    //       && this.miFormulario?.form.controls['precio']?.touched
  }

}
