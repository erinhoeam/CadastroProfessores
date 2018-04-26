import {Pipe, PipeTransform} from "@angular/core";
 
@Pipe({name: 'cpfMask'})
export class CpfPipe implements PipeTransform{
    transform(value:string){
        if (value){
            return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
        }
    }
}