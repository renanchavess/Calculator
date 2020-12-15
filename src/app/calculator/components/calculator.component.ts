import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../services';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public number1:string = '0';
  public number2:string = '';
  public result:number = 0;
  public operation:string = '';
  public historic:Array<CalculatorComponent> = new Array<CalculatorComponent>();

  constructor( private calculatorService:CalculatorService ) { }

  ngOnInit(): void {
    this.clean();
  }

  clean(): void {
    this.number1 =  '0';
    this.number2 =  '';
    this.result = 0;
    this.operation = '';
  }

  

  addNumber(numberConcat:string): void {
    if (this.operation === '')
      this.number1 = this.concatNumber(this.number1, numberConcat);
    else
      this.number2 = this.concatNumber(this.number2, numberConcat);
  }

  concatNumber(numberCurrent:string, numberConcat:string)  {
    if (numberCurrent === '0' && numberConcat !== '.') {
      return numberConcat;
    }      
    
    if (numberConcat === '.'  && (numberCurrent === '' || numberCurrent  === '0')) {
      return '0.';
    }

    if (numberConcat === '.' && numberCurrent.indexOf('.') > -1) {
      return  numberCurrent;
    }
    
    return numberCurrent + numberConcat;
  }

  defineOperation(operation:string): void {
    if (this.result > 0)
      this.result = 0;
    
    this.operation = operation;
  }

  calculate(): void {
    if (this.number2 !== '') {                
      this.result = this.calculatorService.calculate( 
        parseFloat(this.number1),
        parseFloat(this.number2),
        this.operation
      );
      let calc = new CalculatorComponent( new CalculatorService() );
      calc.operation = this.operation;
      calc.number1 = this.number1;
      calc.number2 = this.number2;
      calc.result = this.result;
      this.historic.push(calc);

      this.operation = '';
      this.number1 = this.result.toString();
      this.number2 = '';
      this.result = 0;
    }    
  }

  backspace(): void {
    if(this.operation === '') {
      this.number1 = this.number1.slice(0, -1);

      if(this.number1.length === 0) {
        this.number1 =  '0';
      }
    }

    if(this.operation !== '' && this.number2 === '') {
      this.operation = '';
    }

    if(this.operation !== '' && this.number2 !== '') {
      this.number2 = this.number2.slice(0, -1);
    }
    
    
  }

  get display(): string {
    if (this.result !== 0) {
      return this.result.toString();
    }
    
    let calc = this.number1;

    if (this.operation !== '') {
      calc += ' '+this.operation;
    }

    if (this.number2 !== '') {
      calc += ' '+this.number2;
    }
    return calc;
  }

}
