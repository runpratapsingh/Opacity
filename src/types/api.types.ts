export interface LoginRequest {
  user_name: string;
  password: string;
  company_code: string; // Always "PTPL"
}

export type UserData = {
  emp_id: number;
  emp_name: string;
  emp_code: string;
  role: number;
  emp_type: number;
  email: string;
  contact: string;
  image: string;
  gender: string;
  gender_id: number;
  designation: string;
  DEPARTMENT_ID: number;
  department_name: string;
};

export type LoginResponse = {
  status: string;
  message: string;
  Data: {
    emp_details: UserData[];
  };
};
