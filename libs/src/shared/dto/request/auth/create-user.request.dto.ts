import { GenderEnum } from '../../../enum';

export class CreateUserRequestDto {
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  gender: GenderEnum | undefined;
  phone: string | undefined;
  password: string | undefined;
  email: string | undefined;
  nationalId: string | undefined;
}
