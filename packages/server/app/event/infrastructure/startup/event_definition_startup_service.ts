import { inject } from '@adonisjs/core';
import summer_olympics from '#game-config/event/historical-events/1972-summer-olympics.json' assert { type: 'json' };
import basic_treaty from '#game-config/event/historical-events/basic-treaty.json' assert { type: 'json' };
import bangladesh_independance from '#game-config/event/historical-events/bengladesh-independance.json' assert { type: 'json' };
import bangladesh_war from '#game-config/event/historical-events/bengladesh-war.json' assert { type: 'json' };
import bloody_sunday from '#game-config/event/historical-events/bloody-sunday.json' assert { type: 'json' };
import china_join_un from '#game-config/event/historical-events/china-join-un.json' assert { type: 'json' };
import cnuced_conference from '#game-config/event/historical-events/cnuced-conference.json' assert { type: 'json' };
import coup_cambodia from '#game-config/event/historical-events/coup-cambodia.json' assert { type: 'json' };
import creation_polisario from '#game-config/event/historical-events/creation-polisario.json' assert { type: 'json' };
import de_gaulle_death from '#game-config/event/historical-events/de-gaulle-death.json' assert { type: 'json' };
import death_nasser from '#game-config/event/historical-events/death-nasser.json' assert { type: 'json' };
import easter_offensive from '#game-config/event/historical-events/easter-offensive.json' assert { type: 'json' };
import election_of_peron from '#game-config/event/historical-events/election-of-peron.json' assert { type: 'json' };
import end_of_war_in_biafra from '#game-config/event/historical-events/end-of-war-in-biafra.json' assert { type: 'json' };
import fedayin_withdrawal from '#game-config/event/historical-events/fedayin-withdrayal.json' assert { type: 'json' };
import fidel_castro_visit_event from '#game-config/event/historical-events/fidel-castro-visit-event.json' assert { type: 'json' };
import four_power_agreement_on_berlin from '#game-config/event/historical-events/four-power-aggrement-on-berlin.json' assert { type: 'json' };
import honecker_replace_ulbricht from '#game-config/event/historical-events/honecker-replace-ublricht.json' assert { type: 'json' };
import independance_war_angola from '#game-config/event/historical-events/independance-war-angola.json' assert { type: 'json' };
import israeli_raid_in_lebanon from '#game-config/event/historical-events/israeli-raide-in-lebanon.json' assert { type: 'json' };
import japan_china_joint_communique from '#game-config/event/historical-events/japan-china-joint-communique.json' assert { type: 'json' };
import juan_peron_return from '#game-config/event/historical-events/juan-peron-return.json' assert { type: 'json' };
import last_american_soldier_leave_vietnam from '#game-config/event/historical-events/last-american-soldier-leave-vietnam.json' assert { type: 'json' };
import nixon_announcement_trip_china from '#game-config/event/historical-events/nixon-announcment-trip-china.json' assert { type: 'json' };
import nixon_reelected from '#game-config/event/historical-events/nixon-reelected.json' assert { type: 'json' };
import nixon_ussr_visit from '#game-config/event/historical-events/nixon-ussr-visit.json' assert { type: 'json' };
import nixon_visit_china from '#game-config/event/historical-events/nixon-visit-china.json' assert { type: 'json' };
import occupation_wounded_knee from '#game-config/event/historical-events/occupation-wounded-knee.json' assert { type: 'json' };
import paris_peace_accords from '#game-config/event/historical-events/paris-peace-accords.json' assert { type: 'json' };
import proclamation_afghan_republic from '#game-config/event/historical-events/proclamation-afghan-republic.json' assert { type: 'json' };
import sadat_expuls_soviet_advisor from '#game-config/event/historical-events/sadat-expuls-soviet-advisor.json' assert { type: 'json' };
import signature_of_the_seabed_denuclearisation_treaty from '#game-config/event/historical-events/signature-of-the-seabed-denaculerasation-treaty.json' assert { type: 'json' };
import soviet_union_visit from '#game-config/event/historical-events/soviet-union-visit.json' assert { type: 'json' };
import soyuz_11 from '#game-config/event/historical-events/soyuz-11.json' assert { type: 'json' };
import tenth_congress_ccp from '#game-config/event/historical-events/tenth-congress-ccp.json' assert { type: 'json' };
import troubles_ireland from '#game-config/event/historical-events/troubles-ireland.json' assert { type: 'json' };
import united_arab_proclamation from '#game-config/event/historical-events/united-arab-proclamation.json' assert { type: 'json' };
import vietnamization from '#game-config/event/historical-events/vietnamization.json' assert { type: 'json' };
import warsaw_treaty from '#game-config/event/historical-events/warsaw-treaty.json' assert { type: 'json' };
import { anEventDefinition } from '#event/application/builders/event_definition_builder';
import { aChoiceDefinition } from '#event/application/builders/choice_definition_builder';
import type { EventStartupInterface } from '#event/infrastructure/startup/event_startup_interface';
import type { ChoiceStartupInterface } from '#event/infrastructure/startup/choice_startup_interface';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IEventDefinitionRepository from '#event/domain/repository/i_event_definition_repository';
import type EventDefinition from '#event/domain/models/event_definition';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IChoiceDefinitionRepository from '#event/domain/repository/i_choice_definition_repository';
import type ChoiceDefinition from '#event/domain/models/choice_definition';

@inject()
export class EventDefinitionStartupService {
  constructor(
    private readonly eventRepository: IEventDefinitionRepository,
    private readonly choiceRepository: IChoiceDefinitionRepository,
  ) {}

  private readonly eventsConfigValues: EventStartupInterface[] = [
    summer_olympics,
    basic_treaty,
    bangladesh_independance,
    bangladesh_war,
    bloody_sunday,
    china_join_un,
    cnuced_conference,
    coup_cambodia,
    creation_polisario,
    de_gaulle_death,
    death_nasser,
    easter_offensive,
    election_of_peron,
    end_of_war_in_biafra,
    fedayin_withdrawal,
    fidel_castro_visit_event,
    four_power_agreement_on_berlin,
    honecker_replace_ulbricht,
    independance_war_angola,
    israeli_raid_in_lebanon,
    japan_china_joint_communique,
    juan_peron_return,
    last_american_soldier_leave_vietnam,
    nixon_announcement_trip_china,
    nixon_reelected,
    nixon_ussr_visit,
    nixon_visit_china,
    occupation_wounded_knee,
    paris_peace_accords,
    proclamation_afghan_republic,
    sadat_expuls_soviet_advisor,
    signature_of_the_seabed_denuclearisation_treaty,
    soviet_union_visit,
    soyuz_11,
    tenth_congress_ccp,
    troubles_ireland,
    united_arab_proclamation,
    vietnamization,
    warsaw_treaty,
  ] as unknown as EventStartupInterface[];

  public async execute(): Promise<void> {
    for (const eventConfigValue of this.eventsConfigValues) {
      await this.createEvent(eventConfigValue);
    }
  }

  private async createEvent(eventConfigValue: EventStartupInterface): Promise<void> {
    const event = anEventDefinition()
      .withIdentifier(eventConfigValue.identifier)
      .withText(eventConfigValue.text)
      .withTitle(eventConfigValue.title)
      .withType(eventConfigValue.type)
      .withDisplayable(eventConfigValue.isDisplayable)
      .withTurn(eventConfigValue.turn)
      .withIsAvailableByDefault(eventConfigValue.isAvailable)
      .build();

    await this.eventRepository.saveWithLicensedFiles(event, eventConfigValue.licensedFilesIdentifiers);

    if (eventConfigValue?.childEvents) {
      for (const childEventConfigValue of eventConfigValue.childEvents) {
        await this.createEvent(childEventConfigValue);
      }
    }

    if (eventConfigValue?.choices) {
      for (const choiceConfigValue of eventConfigValue.choices) {
        await this.createChoice(choiceConfigValue, event.id);
      }
    }
  }

  private async createChoice(choiceConfigValue: ChoiceStartupInterface, eventId: number): Promise<void> {
    let triggerEvent: EventDefinition | null = null;
    let choice: ChoiceDefinition;
    if (choiceConfigValue.triggerEventIdentifier) {
      triggerEvent = await this.eventRepository.findByIdentifier(choiceConfigValue.triggerEventIdentifier);
      choice = await aChoiceDefinition()
        .withText(choiceConfigValue.text)
        .withEventDefinitionId(eventId)
        .withTriggerEventDefinitionId(triggerEvent.id)
        .build();
    }
    else {
      choice = await aChoiceDefinition()
        .withText(choiceConfigValue.text)
        .withEventDefinitionId(eventId)
        .build();
    }

    await this.choiceRepository.save(choice);
  }
}
