import type Sector from '#sector/domain/model/sector';

export class SectorEconomicalSituationCalculatorService {
  public async calculateEconomicalSituation(sector: Sector): Promise<void> {
    const socialClasses = sector.socialClasses;
    const products = sector.products;
  }
}
