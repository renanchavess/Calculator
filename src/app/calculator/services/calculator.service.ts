import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  static readonly SUM:string = '+';
  static readonly DIVISION:string = '/';
  static readonly MULTIPLICATION:string = '*';
  static readonly SUBTRACTION:string = '-';

  constructor() { }

  /**
   * Method that calculates mathematical operation with two numbers
   * @param number1 number
   * @param number2 number
   * @param operation string support opetarions SUM '+', SUBTRACTION '-', DIVISION '/' and MULTIPLICATION '*'
   * @return number
   */
  calculate(number1:number, number2:number, operation:string) : number {
    let result: number;

    switch(operation) {
      case CalculatorService.SUM:
        result = number1 + number2;
        break;
      case CalculatorService.SUBTRACTION:
        result = number1 - number2;
        break;
      case CalculatorService.MULTIPLICATION:
        result = number1 * number2;
        break;
      case CalculatorService.DIVISION:
        result = number1 / number2;
        break;
      default:
        result = 0;
    }

    return result;
  }
}
