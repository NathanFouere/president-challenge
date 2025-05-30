import { belongsTo, column, hasMany, beforeSave } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import Sector from '#sector/domain/model/sector';
import ProductPricePerTurn from '#product/domain/models/product_price_per_turn';
import ProductDefinition from '#product/domain/models/product_definition';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class Product extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column({ serializeAs: null })
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare definitionId: number;

  @belongsTo(() => ProductDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof ProductDefinition>;

  @column()
  declare sectorId: number;

  @belongsTo(() => Sector)
  declare sector: BelongsTo<typeof Sector>;

  @hasMany(() => ProductPricePerTurn)
  declare pricePerTurn: HasMany<typeof ProductPricePerTurn>;

  @column()
  declare price: number;

  @column()
  declare costOfProduction: number;

  public getMargin(): number {
    return this.price - this.costOfProduction;
  }

  @beforeSave()
  public static async validatePrice(product: Product) {
    if (product.price < 0 || product.price > 100) {
      throw new Error('Invalid product price level');
    }
  }

  @beforeSave()
  public static async validateCostOfProduction(product: Product) {
    if (product.costOfProduction < 0 || product.costOfProduction > 100) {
      throw new Error('Invalid costOfProduction level');
    }
  }
}
