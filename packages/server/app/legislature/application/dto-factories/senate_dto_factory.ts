import type { SenateDto } from '@shared/dist/legislature/senate-dto.js';
import type { ChartDataDTO } from '@shared/dist/chart/ChartDataDTO.js';
import type Senate from '#legislature/domain/models/senate';

export class SenateDtoFactory {
  public createFromSenate(senate: Senate): SenateDto {
    return {
      chartData: this.createChart(senate),
    };
  }

  private createChart(senate: Senate): ChartDataDTO {
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];
    const data: number[] = [];

    for (const seats of senate.partySeats) {
      const politicalParty = seats.politicalParty;
      data.push(seats.numberOfSeats);
      backgroundColor.push(politicalParty.color);
      borderColor.push(politicalParty.color);
      labels.push(politicalParty.name);
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
