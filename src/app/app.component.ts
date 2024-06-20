import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  
  dataAND = [{ entrada1: 1, entrada2: 1, resultado: 1 }, { entrada1: 1, entrada2: 0, resultado: -1 },{ entrada1: 0, entrada2: 1, resultado: -1 },
  { entrada1: 0, entrada2: 0, resultado: -1 }];


  pesos = [1,1,1];

  f(sum: number) {
    return sum >= 0 ? 1 : -1;
  }

  soma(){

  }

  calcularErro(valorDesejado: number, valorObtido:number){
    return valorDesejado - valorObtido;
  }

  


}
