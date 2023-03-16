export interface ICommonEnumInterface {
  itemDescription?: string;
  itemID: number;
  itemName: string;
  itemURI?: string;
}

export enum AllowedEntityStatusColor {
  new = 1,
  draft = 2,
  archive = 3,
  delete = 4,
  published = 5,
  archived = 6,
  deleted = 7,
  working = 8,
  locked = 9
}

export enum ValueEntityStatusColor {
  info = 1,
  success = 5,
  attention = 3,
  warning = 4,
}

export interface IEntityObject {
  id: number;
  name: string;
  description?: string;
  type?: ICommonEnumInterface;
  uri?: string;
}

export interface ServerSort {
  field: string;
  order: string;
  callback(field: string, order: string, sortBy: string): void;
}

// Export all the interface to be used in reducer or any other places
export * from './Role';
