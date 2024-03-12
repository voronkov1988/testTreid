interface IProduct {
    id: string | number;
    name: string;
    sum: number;
    count: number;
    price: number;
  }
  
  interface IGroup {
    id: string | number;
    sum: number;
    products: IProduct[];
  }
  interface IForm {
    sum: number;
    groups: IGroup[];
  }
  
  interface OneGroupProps {
    id: number | string, 
    products: IProduct[], 
    count: number | string, 
    sum: number
  }

  interface OneProductProps extends IProduct {
    groupId: number | string, 

  }

  interface AppState {
    groups: IGroup[]
    id: number
  }