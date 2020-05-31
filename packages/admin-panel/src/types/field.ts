export type fieldConfig =
  | {
      defaultValue?: number;
      type: 'number';
    }
  | {
      defaultValue?: string;
      type: 'string';
    }
  | {
      defaultValue?: boolean;
      type: 'boolean';
    };

export type dataType =
  | {
      value: number;
      type: 'number';
    }
  | {
      value: string;
      type: 'string';
    }
  | {
      value: boolean;
      type: 'boolean';
    };
