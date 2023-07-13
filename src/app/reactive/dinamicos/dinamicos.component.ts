import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent {
  constructor(private fb: FormBuilder) { }
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required,Validators.minLength(3)]],
    favoritos: this.fb.array(['Metal Gear', 'Death Stranging'])
    // favoritos: this.fb.array([
    //                             ['Metal Gear', Validators.required], 
    //                             ['Death Stranging', Validators.required]
    //                           ],Validators.required)
  })
 
  nuevoFavorito: FormControl = this.fb.control('',Validators.required);
  agregarFavorito() {
    if ( this.nuevoFavorito.invalid ) { return; }
    // this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );
    //this.favoritosArr.push( this.fb.control(this.nuevoFavorito.value, Validators.required ) );
    this.favoritosArr.push( this.fb.control(this.nuevoFavorito.value ) );
    this.nuevoFavorito.reset(); // borro el valor
  }

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  campoNoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }
  guardar(){
    if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched(); //marca todos los campos como tocados
      return;
    }
    console.log(this.miFormulario.value);
    //this.miFormulario.reset(); // borro todos los campos del formulario
  }
  
  borrar( i: number ) {
    this.favoritosArr.removeAt(i);
    //this.favoritosArr.controls.splice(i, 1);//NO FUNCIONA 
  }

}
