import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({name:'sanitizerHtml', standalone: false})
export class SanitizerHtmlPipe implements PipeTransform{
    constructor(private _sanitizer: DomSanitizer) { }
    
    transform(value: any, ...args: any[]) {
        return this._sanitizer.bypassSecurityTrustHtml(value)
    }
    
}