
export class Form {
    name: string;
    target: any;
    action: any;
    method: any;
    css_class: string;
    enctype: any;
    dynamic_element: Dynamic_element[];
}
export class Dynamic_element {
    element_type: string;
    id_element: string;
    default_value: any;
    order: number;
    options: any;
    parameters: Parameter[];
}
export class Parameter {
    key: string;
    value: string;
}

export class Post {
    userId:number;
    id:number;
    title:string;
    body:string;
}
