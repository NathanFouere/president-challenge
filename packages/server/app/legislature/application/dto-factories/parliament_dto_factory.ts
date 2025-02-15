import type { ChartDataDTO } from '@shared/dist/chart/ChartDataDTO.js';
import type { ParliamentDto } from '@shared/dist/legislature/parliament-dto.js';
import type { Parliament } from '#legislature/domain/models/parliament';

export class ParliamentDtoFactory {
  public createFromParliament(parliament: Parliament): ParliamentDto {
    return {
      parliamentCompositionChartData: this.createParliamentCompositionChartData(parliament),
    };
  }

  private createParliamentCompositionChartData(senate: Parliament): ChartDataDTO {
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];
    const data: number[] = [];

    for (const seats of senate.partySeats) {
      data.push(seats.numberOfSeats);
      backgroundColor.push(seats.politicalParty.definition.color);
      borderColor.push(seats.politicalParty.definition.color);
      labels.push(seats.politicalParty.definition.name);
    }

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
