import type { SenateDto } from '@president-challenge/shared/dist/legislature/senate-dto.js';
import type { ChartDataDTO } from '@president-challenge/shared/dist/chart/ChartDataDTO.js';
import type Senate from '#legislature/domain/models/senate';

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
