import { ICommonEnumInterface, IEntityObject } from '.';

export interface IRoleDef {
  activeVersionStatus: ICommonEnumInterface
  allowedMemberTypes: ICommonEnumInterface;
  appDef?: IEntityObject;
  appDefId?: number;
  changeTimestamp: string;
  description: string;
  entityState: ICommonEnumInterface;
  entityType?: ICommonEnumInterface;
  id: number;
  lid?: number;
  locked?: ICommonEnumInterface;
  processing?: string;
  name: string;
  uri?: string;
  entityAllowedActions?: ICommonEnumInterface;
  memberUser?: IEntityObject;
  memberGroup?: IEntityObject;
  version?: number;
}

export interface IRoleFormValues {
  changeTimestamp: string;
  description: string;
  id?: number;
  name: string;
  uri: string;
  type: number;
  [key: string]: any;
}
