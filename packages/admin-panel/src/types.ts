export type DirectoryCollection = {
  [s: string]: Directory;
};

export type Directory = {
  name: string;
  records: {
    [key: string]: Record;
  };
};

export type Record = {
  [s: string]: any;
};

export type User = {
  username: string | null;
  permissions: string[];
};

export type views = 'login' | 'dashboard' | 'directory';

export type ViewState<T> = {
  view: views;
  state: T;
};

export type Store = {
  directories: {
    [key: string]: Directory;
  };
  user: User;
  viewState: ViewState<any>;
};
