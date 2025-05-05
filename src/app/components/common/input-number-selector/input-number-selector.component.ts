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
    console.log('itemId: ',this.itemId)
  }

  @Input() minValue:any;
  @Input() maxValue:any;
  @Input() allowRemoveProduct:any;
  @Input() record:any;
  @Output() selectedValue:any = new EventEmitter();
  @Output() selectedItemId:any = new EventEmitter();
  @Input() itemId:any;
  chooseValue = 1;
  sendValue(event:any){
    console.log('record: ',this.record)
    this.selectedValue.emit({'id':this.record.id,'quantity':event})
    this.selectedItemId.emit(this.record.id)
  }

  inCreaseValue(){
    if(this.chooseValue < this.maxValue){
      this.chooseValue++;
    }
  }

  reduceValue(){
    if((!this.allowRemoveProduct && this.chooseValue > 1) || (this.allowRemoveProduct && this.chooseValue > 0) ){
      this.chooseValue--;
    }
  }
}
