export interface SignupRequest {
  session_id: string;
  contact_type: string;
  user_data: {
    username: string;
    password: string;
    profile: {
      firstName: string;
      lastName: string;
      dob: string;
      nic: string;
      gender: string;
    };
  };
}