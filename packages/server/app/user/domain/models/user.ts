import type { DateTime } from 'luxon';
import hash from '@adonisjs/core/services/hash';
import { compose } from '@adonisjs/core/helpers';
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import { UserType } from '#user/domain/models/user_type';

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
});

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare fullName: string;

  @column()
  declare email: string;

  @column()
  declare password: string;

  @column()
  declare type: UserType;

  @hasMany(() => Game)
  declare games: HasMany<typeof Game>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  public isAdmin(): boolean {
    return this.type === UserType.ADMIN;
  }

  public async hasMaximumGames(): Promise<boolean> {
    return this.games.length >= 3;
  }
}
