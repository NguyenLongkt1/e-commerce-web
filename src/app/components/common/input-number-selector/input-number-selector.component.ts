import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-number-selector',
  standalone: false,
  
  templateUrl: './input-number-selector.component.html',
  styleUrl: './input-number-selector.component.scss'
})
export class InputNumberSelectorComponent implements OnInit{
  constructor(){
    if(this.minValue == null){
      this.minValue = 1;
    }
  }
  ngOnInit(): void {
  }

  @Input() minValue:any;
  @Input() maxValue:any;
  @Output() selectedValue:any = new EventEmitter();
  chooseValue = 1;
  sendValue(event:any){
    this.selectedValue.emit(event)
  }

  inCreaseValue(){
    if(this.chooseValue < this.maxValue){
      this.chooseValue++;
    }
  }

  reduceValue(){
    if(this.chooseValue > 1 ){
      this.chooseValue--;
    }
  }
}
