import { Dynamic_Form } from '../models/dynamic_form';
import { Dynamic_Element } from '../models/dynamic_form';
import { OnInit } from '@angular/core';

export default class HtmlTreeService {

  static buildForm(form: Dynamic_Form){
    let stringToHtml = '';
    stringToHtml += '<form id="' + form.name + '">';
      
    for(let group of form.groups){
      stringToHtml += this.getChilds(group);
    }

    stringToHtml += '</form>';
    return stringToHtml;
  }

  static getChilds(childs: Dynamic_Element){
    let child = '';
    let parametros = '';
    let value = '';
    let validate = '<div>test</div>'
    for(let par of childs.parameters){
      value = par.value ? '="' + par.value + '"' : ' ';
      parametros += par.key + value ;
    }
    child += '<'+childs.element_type+ ' id="'+childs.id_element+'" '+ parametros +'>';
    for(let son of childs.childs){
      child += this.getChilds(son);
    }
    if(childs.default_value && childs.default_value!=""){
      child += childs.default_value;
    }
   
    child += '</'+childs.element_type+'>';
    return child;
  }



}
