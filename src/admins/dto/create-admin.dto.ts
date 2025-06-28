export class CreateAdminDto {
  full_name: string;
  email: string;
  password: string;
  is_creator: boolean;
  is_active: boolean;
  confirm_password: string;
}
