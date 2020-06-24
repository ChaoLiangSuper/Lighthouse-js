export enum StatusType {
  error = 'error',
  success = 'success',
  info = 'info',
  warning = 'warning'
}

export type Status = {
  id: string;
  type: StatusType;
  message: string;
};
