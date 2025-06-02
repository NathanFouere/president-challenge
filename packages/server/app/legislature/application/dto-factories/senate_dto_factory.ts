import type { SenateDto } from '@president-challenge/shared/dist/legislature/senate-dto.js';
import type { ChartDataDTO } from '@president-challenge/shared/dist/chart/ChartDataDTO.js';
import type Senate from '#legislature/domain/models/senate';
import { AffiliationOrder } from '#political-party/domain/models/political_party_affiliation_order';
import type PoliticalPartySeatsSenate from '#legislature/domain/models/political_party_seats_senate';

export class SenateDtoFactory {
  public createFromSenate(senate: Senate): SenateDto {
    return {
      senateCompositionChartData: this.createSenateCompositionChartData(senate),
    };
  }

  private createSenateCompositionChartData(senate: Senate): ChartDataDTO {
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];
    const data: number[] = [];

    senate.partySeats
      .slice()
      .sort(
        (a: PoliticalPartySeatsSenate, b: PoliticalPartySeatsSenate) => AffiliationOrder[a.politicalParty.definition.affiliation] - AffiliationOrder[b.politicalParty.definition.affiliation],
      ).forEach((seats: PoliticalPartySeatsSenate) => {
        data.push(seats.numberOfSeats);
        const color = seats.politicalParty.definition.color;
        backgroundColor.push(color);
        borderColor.push(color);
        labels.push(seats.politicalParty.definition.name);
      });

    return {
      title: 'Senate',
      labels,
      datasets: [
        {
          label: 'Seats',
          data,
          backgroundColor,
          borderColor,
        },
      ],
    };
  }
}
