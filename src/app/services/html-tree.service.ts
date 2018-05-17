import { Dynamic_Form } from '../models/dynamic_form';
import { Dynamic_Element } from '../models/dynamic_form';
import { OnInit } from '@angular/core';

export default class HtmlTreeService {

  static buildForm(form: Dynamic_Form){
    let stringToHtml = '';
    stringToHtml += '<div>';
      
    for(let group of form.groups){
      stringToHtml += this.getChilds(group);
    }

    stringToHtml += '</div>';
    return stringToHtml;
  }

  static getChilds(childs: Dynamic_Element){
    let child = '';
    let parametros = '';
    let value = '';
    let checkbox = false;
    for(let par of childs.parameters){
      if(par.value === "checkbox"){
        checkbox = true;
      }
      value = par.value ? '="' + par.value + '"' : ' ';
      parametros += par.key + value ;
    }
    child += '<'+childs.element_type+ ' id="'+childs.id_element+'" name="'+childs.id_element+'" '+ parametros +'>';
    if(childs.element_type=="select"){
      child += '<option value=""> -- Seleccione -- </option>';
      for(let option of childs.options){
        
        child += '<option value="'+option.id+'">'+option.name+'</option>';
      }
    }else{
      for(let son of childs.childs){
        child += this.getChilds(son);
      }
  
      if(childs.default_value && childs.default_value!=""){
        if(!checkbox){
          child += childs.default_value;
        }
      }
    }

    child += '</'+childs.element_type+'>';
    return child;
  }



}
