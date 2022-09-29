import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {

  operators = ['+', '-', 'x', '/'];

  historic: string [] = [];
  error: string;

  currentNumber = '0';
  firstOperand: string;
  operator: string;
  waitForSecondOperator = false;

  public setNumber(number: string) {
    this.error = '';

    if ( this.waitForSecondOperator ) {
      this.currentNumber = number;
      this.waitForSecondOperator = false;
      return;
    }

    this.currentNumber === '0' ? this.currentNumber = number : this.currentNumber += number;
  }

  setDecimal() {
    if ( !this.currentNumber.includes('.') ) {
      this.currentNumber += '.';
    }
  }

  public setOperation(operator: string) {
    if ( !this.firstOperand ) {
      this.firstOperand = this.currentNumber;
    } else if ( this.operator ) {
      const result = this.doOperation(this.operator, +this.currentNumber);
      if ( this.operator !== '=' ) {
        const res = this.error ? this.error : result;
        this.historic.push(`${this.firstOperand} ${this.operator} ${this.currentNumber} = ${res}`);
      }
      this.currentNumber = result.toString();
      this.firstOperand = result.toString();
    }
    this.operator = operator;
    this.waitForSecondOperator = true;
  }

  public clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondOperator = false;
  }

  private doOperation(op: string, secondOp: number): number {
    switch ( op ) {
      case '+':
        this.error = '';
        return +this.firstOperand + secondOp;
      case '-':
        this.error = '';
        return +( +this.firstOperand - secondOp ).toFixed(4);
      case 'x':
        this.error = '';
        return +this.firstOperand * secondOp;
      case '/':
        if ( secondOp === 0 ) {
          this.error = 'No se puede dividir por 0';
          return 0;
        }

        this.error = '';
        return +( +this.firstOperand / secondOp ).toFixed(4);
      case '=':
        return secondOp;
    }
  }

}
