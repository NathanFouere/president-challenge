import type { DefaultAuthenticatePayload, CurrentAdmin } from 'adminjs';
import { DefaultAuthProvider } from 'adminjs';

import componentLoader from './component_loader.js';
import User from '#user/domain/models/user';

const authenticate = async ({ email, password }: DefaultAuthenticatePayload) => {
  const user: User | null = await User.verifyCredentials(email, password);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (!user.isAdmin()) {
    throw new Error('User is not an admin');
  }

  const currentAdmin: CurrentAdmin = {
    email: user.email,
    id: (user.id).toString(),
    avatarUrl: undefined,
    title: user.fullName,
    theme: undefined,
    _auth: undefined,
  };
  return currentAdmin;
};

const authProvider = new DefaultAuthProvider({
  componentLoader,
  authenticate,
});

export default authProvider;
