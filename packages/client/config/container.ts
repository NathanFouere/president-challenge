import { Container } from 'inversify';
import { AuthPresenter } from '../app/presenters/auth.presenter';
import { GamePresenter } from '../app/presenters/game.presenter';
import { PoliticalPartiesPresenter } from '../app/presenters/political-party/political-parties.presenter';
import { PoliticalPartyPresenter } from '../app/presenters/political-party/political-party.presenter';
import { TurnInformationsPresenter } from '../app/presenters/turn-informations/turn-informations.presenter';
import { EventPresenter } from '../app/presenters/events/event.presenter';
import { COMMON_DEPENDANCY_TYPES } from './common.types';

const container = new Container();

container.bind<AuthPresenter>(COMMON_DEPENDANCY_TYPES.AuthPresenter).to(AuthPresenter);
container.bind<GamePresenter>(COMMON_DEPENDANCY_TYPES.GamePresenter).to(GamePresenter);
container.bind<PoliticalPartiesPresenter>(COMMON_DEPENDANCY_TYPES.PoliticalPartiesPresenter).to(PoliticalPartiesPresenter);
container.bind<PoliticalPartyPresenter>(COMMON_DEPENDANCY_TYPES.PoliticalPartyPresenter).to(PoliticalPartyPresenter);
container.bind<TurnInformationsPresenter>(COMMON_DEPENDANCY_TYPES.TurnInformationsPresenter).to(TurnInformationsPresenter);
container.bind<EventPresenter>(COMMON_DEPENDANCY_TYPES.EventPresenter).to(EventPresenter);

export default container;
