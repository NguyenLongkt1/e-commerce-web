import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  standalone: false,
  
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})
export class UploadImageComponent implements OnInit{
  constructor(){

  }

  @Output() uploadEvent = new EventEmitter();
  @Input() 
  filePath:any;
  @Input()
  isView:any;

  choosenFile:any;
  previewUrl:any;

  onChangeFile(event:any){
    if(event.target.files){
      this.choosenFile = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.previewUrl = event.target!.result;
      }
      this.uploadEvent.emit(this.choosenFile);
    }
  }

  clearImg(){
    this.choosenFile = undefined;
    this.previewUrl = undefined;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filePath'] && changes['filePath'].currentValue) {
      this.previewUrl = this.filePath;
    }
  }
}
