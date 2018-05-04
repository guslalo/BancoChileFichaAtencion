export class Dynamic_Form{
    name: string;
    target: string;
    action: string;
    method: string;
    css_class: string;
    enctype: string;
    groups: Array<Dynamic_Element>;
    constructor(name,target,action,method,css_class,enctype,groups) {
        this.name = name;
        this.target = target;
        this.action = action;
        this.method = method;
        this.css_class = css_class;
        this.enctype = enctype;
        this.groups = groups;
    }
}

export class Dynamic_Element{
    id: number
    element_type: string;
    id_element: string;
    default_value: string;
    value: string;
    order: number;
    options: Array<Option_Select>;;
    parameters: Array<Dynamic_Parameter>;
    childs: Array<Dynamic_Element>;
    constructor(element_type,id_element,default_value,order,options,parameters,childs) {
        this.element_type = element_type;
        this.id_element = id_element;
        this.default_value = default_value;
        this.order = order;
        this.options = options;
        this.parameters = parameters;
        this.childs = childs;
    }
}

export class Dynamic_Parameter{
    key: string;
    value: string;
    constructor(key,value) {
        this.key = key;
        this.value = value;
    }
}


export class Option_Select{
    id: number;
    name: string;
    constructor(id,name) {
        this.id = id;
        this.name = name;
    }
}
export class Trabajador {
    id: number;
    first_name: string;
    last_name: string;
    rut:number;
    check_digit:number;
}

/*
    email_office: string;
    phone_office: number;
    department: string;
    position: string;*/