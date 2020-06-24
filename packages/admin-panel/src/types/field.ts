export type dataType =
  | {
      fieldName: string;
      value: number;
      type: 'number';
    }
  | {
      fieldName: string;
      value: string;
      type: 'string';
    }
  | {
      fieldName: string;
      value: boolean;
      type: 'boolean';
    };
