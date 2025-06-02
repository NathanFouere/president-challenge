import type { ChartDataDTO } from '@president-challenge/shared/dist/chart/ChartDataDTO.js';
import type { ParliamentDto } from '@president-challenge/shared/dist/legislature/parliament-dto.js';
import type { Parliament } from '#legislature/domain/models/parliament';
import type PoliticalPartySeatsParliament from '#legislature/domain/models/political_party_seats_parliament';
import { AffiliationOrder } from '#political-party/domain/models/political_party_affiliation_order';

export class ParliamentDtoFactory {
  public createFromParliament(parliament: Parliament): ParliamentDto {
    return {
      parliamentCompositionChartData: this.createParliamentCompositionChartData(parliament),
    };
  }

  private createParliamentCompositionChartData(parliament: Parliament): ChartDataDTO {
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];
    const data: number[] = [];

    parliament.partySeats
      .slice()
      .sort(
        (a: PoliticalPartySeatsParliament, b: PoliticalPartySeatsParliament) => AffiliationOrder[a.politicalParty.definition.affiliation] - AffiliationOrder[b.politicalParty.definition.affiliation],
      ).forEach((seats: PoliticalPartySeatsParliament) => {
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
