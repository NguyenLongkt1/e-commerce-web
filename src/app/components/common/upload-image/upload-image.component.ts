import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FileModel } from '../../../models/file-model';

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
  @Output() deleteFileEvent = new EventEmitter();
  @Input() filePath:any;
  @Input() isView:any;
  @Input() multiple:any;
  @Input() lstFile:any;
  @Input() sizePx:any;

  choosenFile:any;
  previewUrl:any;
  lstPreviewUrl:FileModel[]=[];
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
          const file: FileModel = {
            filePath: event.target!.result as string
          };
          this.lstPreviewUrl.push(file);
        }
      }
      console.log("UPLOAD MULTIPLE FILES: ", this.lstPreviewUrl);
      console.log("tuananh: ", this.listChoosenFile);
      this.uploadEvent.emit(this.listChoosenFile);
    }
  }

  clearImg(){
    this.choosenFile = undefined;
    this.previewUrl = undefined;
  }

  clearImgByIndex(index:any){
    var removedId = this.lstPreviewUrl[index].id;
    console.log("Id xóa: ", removedId);
    if (removedId !== undefined) {
      this.deleteFileEvent.emit(removedId);
    }

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

    if (changes['lstFile'] && changes['lstFile'].currentValue) {
      this.lstPreviewUrl = this.lstFile;
    }
  }
}
