export enum formStructure {
  FIRSTNAME = 'firstname',
  LASTNAME = 'lastname',
  AGE = 'age',
  ROLE = 'role',
  COUNTRY = 'country',
  CITY = 'city',
  AVATAR = 'avatar',
}

export interface requiredValidationFields {
  [key: string]: string[];
  [formStructure.FIRSTNAME]: string[];
  [formStructure.LASTNAME]: string[];
}

export interface ProfileInterface {
  [key: string]: string | number | undefined;
  [formStructure.FIRSTNAME]: string;
  [formStructure.LASTNAME]: string;
  [formStructure.AGE]?: number;
  [formStructure.ROLE]?: string;
  [formStructure.COUNTRY]?: string;
  [formStructure.CITY]?: string;
  [formStructure.AVATAR]?: string;
}

export interface ProfileSchema {
  data?: ProfileInterface;
  form?: ProfileInterface;
  formValidationErrors?: requiredValidationFields; 
  isLoading?: boolean;
  isLoadingUpdateProfile?: boolean;
  fetchError?: string;
  updateError?: string;
  successUpdate?: string;
  readonly?: boolean;
}


export interface ProfileUpdateResponseInterface {
  message?: string;
}