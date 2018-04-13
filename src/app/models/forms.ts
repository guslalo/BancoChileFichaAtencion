

export interface Result {
    form: Form[];
    /*links:Links[];
    count:number;
    pages:number;*/
}

export interface Links {
    next: any;
    previous: any;
}

export interface Form {
    name: string;
    target: any;
    action: any;
    method: any;
    css_class: string;
    enctype: any;
    groups: Group[];
}

export interface Group {
    dynamic_element: Dynamic_element;
}

export interface Dynamic_element {
    element_type: string;
    id_element: string;
    default_value: any;
    order: number;
    options: any;
    parameters: Parameter[];
    childs: Child[];
}

export interface Parameter {
    key: string;
    value: string;
   // atributo: Atributo[];

}


export interface Fila {
    id_element: string;
    parameters: Parameter[];
}




export interface Child {
    element_type: string;
    id_element: string;
    default_value: string;
    order: number;
    options: any;
    parameters: Parameter[];
    childs: Child[];
}

