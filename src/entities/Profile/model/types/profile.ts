
export interface formValidation {
  firstname: string[],
  lastname: string[],
}

export interface ProfileInterface {
  firstname: string;
  lastname: string;
  age?: number;
  role: string;
  country?: string;
  city?: string;
  avatar?: string;
}

export interface ProfileSchema {
  data?: ProfileInterface;
  form?: ProfileInterface;
  formValidation?: formValidation; 
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
}
