interface BulkActionType {
  selectedRow: Array<number | string>;
}

interface FilterType {
  searchKey: string;
  search: boolean;
  field: string;
}

interface DropdownType {
  bulkAction?: HTMLElement;
  filter?: HTMLElement;
  [key: string]: HTMLElement;
}

interface HideRowType {
  entityState?: number
}

export interface TableNestedData {
  rowId: number | string;
  component: any;
}

export interface RoleListState {
  // Show action In progress
  actionInProgress: boolean;
  // Active Entitiy for action
  activeEntityId: number
  // Stores the app id of expanding row
  appDefId: number;
  // This key holds the bulk action options for the rows,
  // currently it have single key which is selectedRow, which holds selected row ids
  bulkAction: BulkActionType;
  // Callback action
  callBackAction?(callback: any): void;
  // Boolean to call the child callback function
  callChildCallback: boolean;
  // Get the dropdown triger element reference
  dropdownEle: DropdownType;
  // Keys needed for searching specific data
  filterConfig: FilterType;
  loadingRole: boolean;
  // OPen the edit drawer
  editMember: boolean;
  // THis helps to implement show deleted functionality
  // It as key of the data & its value which we want to hide
  hideRow: HideRowType;
  // State to store nestedchild component which will be shown on row expand
  nestedChildData: TableNestedData[];
}
