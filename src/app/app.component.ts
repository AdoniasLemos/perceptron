import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';


export interface Element {
  inputs: number[];
  output: number;
}
const ELEMENT_DATA: Element[] = [
  { inputs: [0, 0, 1], output: -1 },
  { inputs: [0, 1, 1], output: -1 },
  { inputs: [1, 0, 1], output: -1 },
  { inputs: [1, 1, 1], output: 1 }
];
const LEARNING_RATE = 0.3;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatButtonModule, MatTableModule, MatCardModule, MatGridListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  displayedColumns: string[] = ['entrada1', 'entrada2', 'resultado'];

  dataSource = ELEMENT_DATA;


  pesos = [1, 1, 1];

  activationFunction(sum: number): number {
    return sum >= 0 ? 1 : -1;
  }



  calcularErro(valorDesejado: number, valorObtido: number) {
    return valorDesejado - valorObtido;
  }

  train() {
    for (let i = 0; i < this.dataSource.length; i++) {
      let inputs = this.dataSource[i].inputs;
      let prediction = this.predict(this.dataSource[i].inputs);
      let valorDesejado = this.dataSource[i].output
      let error = this.calcularErro(valorDesejado, prediction);

      while (error != 0) {
        console.log(this.pesos)
        console.log(i)
        this.ajustarPesos(error, inputs);

        prediction = this.predict(inputs)

        error = this.calcularErro(valorDesejado, prediction)
      }
    }
  }

  private ajustarPesos(error: number, inputs: number[]) {
    for (let j = 0; j < this.pesos.length; j++) {
      this.pesos[j] += LEARNING_RATE * error * inputs[j];
    }
  }

  predict(inputs: number[]) {
    let sum = 0;
    for (let i = 0; i < inputs.length; i++) {
      sum += this.pesos[i] * inputs[i];
    }
    return this.activationFunction(sum)
  }
}
