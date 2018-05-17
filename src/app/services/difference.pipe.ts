import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name:"differenceDateBtwToday"
})

export class DifferenceDateBtwTodayPipe implements PipeTransform{
  transform(date:Date) : string{
    var difference = '';
    var dif = 0;
    var diffDays = 0;
    var today = new Date();
    var date_new= new Date(date);
    
    if(today.valueOf()>date_new.valueOf()){
      dif = today.valueOf() - date_new.valueOf()
      diffDays = Math.ceil(dif / (1000 * 3600 * 24));

      if(diffDays===1){
        difference = "Venció ayer"
      }else if(diffDays>1){
        difference = "Venció hace "+diffDays+" días"
      }
    }else if(today.valueOf() === date_new.valueOf()){
      difference = "Vence hoy"
    }else if(today.valueOf() < date_new.valueOf()){
      dif = date_new.valueOf() - today.valueOf()
      diffDays = Math.ceil(dif / (1000 * 3600 * 24));

      if(diffDays===1){
        difference = "Vence mañana"
      }else if(diffDays>1){
        difference = "Vence en "+diffDays+" días"
      }
      
    }
    return difference;
  }
}