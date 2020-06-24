export interface UserAttributes {
  readonly id: string;
  username: string;
  password: string;
  phone: string | null;
  permissions: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
