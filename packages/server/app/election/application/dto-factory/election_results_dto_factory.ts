import type { ElectionResultsDto } from '@president-challenge/shared/dist/event/election-results-dto.js';
import type { ChartDataDTO } from '@president-challenge/shared/dist/chart/ChartDataDTO.js';
import type Election from '#election/domain/model/election';

export default class ElectionResultsDtoFactory {
  public createFromElection(election: Election): ElectionResultsDto {
    return {
      chartData: this.createChartDataDtoFromElection(election),
      title: 'Votes for political parties',
      description: 'This chart shows the votes for political parties in the election',
    };
  }

  private createChartDataDtoFromElection(election: Election): ChartDataDTO {
    const labels = [];
    const data = [];
    const backgroundColor = [];

    for (const votes of election.votesForPoliticalParties) {
      labels.push(votes.politicalParty.definition.name);
      data.push(votes.votes);
      backgroundColor.push(votes.politicalParty.definition.color);
    }

    return {
      title: 'Votes for political parties',
      labels: labels,
      datasets: [
        {
          label: 'Votes',
          data: data,
          backgroundColor: backgroundColor,
        },
      ],
    };
  }
}
