import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  imports: [RouterOutlet, CommonModule, MatButtonModule, MatTableModule, MatCardModule, MatGridListModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  displayedColumns: string[] = ['entrada1', 'entrada2', 'resultado'];

  dataSource = ELEMENT_DATA;

  weights = [1, 1, 1];


  calculatorForm: FormGroup;

  result: number | null = null;

  constructor(private fb: FormBuilder) {
    this.calculatorForm = this.fb.group({
      input1: [null],
      input2: [null]
    });
  }

  calculate() {
    const input1 = this.calculatorForm.value.input1;
    const input2 = this.calculatorForm.value.input2;

    console.log("input1 ", input1)

    console.log("input2 ", input2)
    if (input1 !== null && input2 !== null) {
      console.log(this.predict([input1, input2, 1]))
      this.result = this.predict([input1, input2, 1]);
    }
  }

  activationFunction(sum: number): number {
    return sum >= 0 ? 1 : -1;
  }

  error(desiredValue: number, predictedValue: number) {
    return desiredValue - predictedValue;
  }

  train() {
    for (let e = 0; e <= 10; e++) {
      for (let i = 0; i < this.dataSource.length; i++) {
        let inputs = this.dataSource[i].inputs;
        let prediction = this.predict(this.dataSource[i].inputs);
        let desiredValue = this.dataSource[i].output
        let error = this.error(desiredValue, prediction);

        while (error != 0) {
          console.log(this.weights)
          console.log(i)
          this.adjustWeights(error, inputs);

          prediction = this.predict(inputs)

          error = this.error(desiredValue, prediction)
        }
      }
    }
  }

  private adjustWeights(error: number, inputs: number[]) {
    for (let j = 0; j < this.weights.length; j++) {
      this.weights[j] += LEARNING_RATE * error * inputs[j];
    }
  }

  predict(inputs: number[]) {
    let sum = 0;
    for (let i = 0; i < inputs.length; i++) {
      sum += this.weights[i] * inputs[i];
    }
    return this.activationFunction(sum)
  }
}
