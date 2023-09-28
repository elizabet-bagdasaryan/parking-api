import {
  confirmUserToken,
  createUser,
  resetPassword,
  signIn,
} from "../config/firebase.config";
import UserRepository, { IUser } from "../repositories/user.repository";

class UserService {
  async createUser(
    email: string,
    password: string,
    name: string,
    role?: string
  ) {
    const token = await createUser(email, password);

    await UserRepository.createUser({
      email,
      name,
      role,
    });

    return token;
  }

  async confirmUserToken(token: string) {
    const user = await confirmUserToken(token);

    const foundUser = await UserRepository.getUserByEmail(
      user!.email as string
    );

    return foundUser as unknown as IUser;
  }

  async login(email: string, password: string) {
    const token = await signIn(email, password);

    return token;
  }

  async resetPassword(email: string) {
    await resetPassword(email);
  }
}

export default new UserService();
