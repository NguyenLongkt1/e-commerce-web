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
  @Input() filePath:any;
  @Input() isView:any;
  @Input() multiple:any;
  @Input() lstFilePath:any;
  @Input() sizePx:any;

  choosenFile:any;
  previewUrl:any;
  lstPreviewUrl:any=[];
  listChoosenFile:any=[];

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

  onChangeMultipleFile(event:any){
    if(event.target.files){
      let temp = event.target.files;
      for(let e of temp){
        this.listChoosenFile.push(e);
      }
      for(let item of event.target.files){
        var reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onload = (event) => {
          this.lstPreviewUrl.push(event.target!.result);
        }
      }
      this.uploadEvent.emit(this.listChoosenFile);
    }
  }

  clearImg(){
    this.choosenFile = undefined;
    this.previewUrl = undefined;
  }

  clearImgByIndex(index:any){
    this.lstPreviewUrl.splice(index, 1);
    this.listChoosenFile.splice(index,1);
  }

  ngOnInit(): void {
    if(!this.sizePx){
      this.sizePx = 300;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filePath'] && changes['filePath'].currentValue) {
      this.previewUrl = this.filePath;
    }

    if (changes['sizePx'] && changes['sizePx'].currentValue) {
      if(!this.sizePx){
        this.sizePx = 300;
      }
    }

    if (changes['lstFilePath'] && changes['lstFilePath'].currentValue) {
      this.lstPreviewUrl = this.lstFilePath;
    }
  }
}
