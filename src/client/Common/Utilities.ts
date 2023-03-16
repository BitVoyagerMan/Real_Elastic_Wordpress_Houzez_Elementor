import { ICommonEnumInterface } from 'Types/Domain';

// return allowedMemberTypes type
export const getAllowedMemberType = (currentEntityMember?: ICommonEnumInterface) => {
  if(currentEntityMember.itemID === 3) {
    return  "Internal or External";
  } else if(currentEntityMember.itemID === 7){
    return "Internal, External or Anonymous";
  } else {
    return currentEntityMember.itemName;
  }
};

// Function return badge status
export const getBadgeStatus = (value: any): number => {
  if ( value.locked && value.locked.itemID === 0) {
    if (value.pendingAction && (value.pendingAction.itemName !== "None" && value.pendingAction.itemName !== "Create")) {
      return value.pendingAction.itemID;
    } else {
      return value.entityState.itemID;
    }
  } else if( value.locked && value.locked.itemID === 1) {
    return 9
  }
};

// Function return badge status itemName
export const getStatus = (value: any): string => {
  if (value.locked && value.locked.itemID === 0) {
    if (value.pendingAction && (value.pendingAction.itemName !== "None" && value.pendingAction.itemName !== "Create")) {
      return value.pendingAction.itemName;
    } else {
      return value.entityState.itemName;
    }
  } else if ( value.locked && value.locked.itemID === 1) {
    return value.locked.itemName;
  }
};
