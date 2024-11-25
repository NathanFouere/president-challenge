import User from '#user/domain/models/user';

export class UserBuilder {
  public id: number | null = null;
  public fullName: string | null = null;
  public email: string | null = null;
  public password: string | null = null;

  public withFullName(fullName: string): UserBuilder {
    this.fullName = fullName;
    return this;
  }

  public withEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }

  public withPassword(password: string): UserBuilder {
    this.password = password;
    return this;
  }

  public build(): User {
    const user = new User();
    if (this.fullName !== null) {
      user.fullName = this.fullName;
    }
    else {
      throw new Error('User full name is required');
    }
    if (this.email !== null) {
      user.email = this.email;
    }
    else {
      throw new Error('User email is required');
    }
    if (this.password !== null) {
      user.password = this.password;
    }
    else {
      throw new Error('User password is required');
    }

    return user;
  }
}

export function aUser(): UserBuilder {
  return new UserBuilder();
}
