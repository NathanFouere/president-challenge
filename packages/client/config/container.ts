import { Container } from 'inversify';
import { AuthPresenter } from '../app/presenters/auth.presenter';
import { GamePresenter } from '../app/presenters/game.presenter';
import { PoliticalPartiesPresenter } from '../app/presenters/legislation/political-parties.presenter';
import { PoliticalPartyPresenter } from '../app/presenters/legislation/political-party.presenter';
import { EventPresenter } from '../app/presenters/events/event.presenter';
import { TurnInformationsPresenter } from '../app/presenters/turn-informations/turn-informations.presenter';
import { ParliamentPresenter } from '../app/presenters/legislation/parliament.presenter';
import { SenatePresenter } from '../app/presenters/legislation/senate.presenter';
import { SocialClassesPresenter } from '../app/presenters/social-class/social-classes.presenter';
import { SocialClassPresenter } from '../app/presenters/social-class/social-class.presenter';
import { ProductPresenter } from '../app/presenters/product/product.presenter';
import { ProductsPresenter } from '../app/presenters/product/products.presenter';
import { SectorsPresenter } from '../app/presenters/sector/sectors.presenter';
import { SectorPresenter } from '../app/presenters/sector/sector.presenter';
import { StatePresenter } from '../app/presenters/state/state.presenter';
import { COMMON_DEPENDANCY_TYPES } from './common.types';

const container = new Container();

container.bind<AuthPresenter>(COMMON_DEPENDANCY_TYPES.AuthPresenter).to(AuthPresenter);
container.bind<GamePresenter>(COMMON_DEPENDANCY_TYPES.GamePresenter).to(GamePresenter);
container.bind<PoliticalPartiesPresenter>(COMMON_DEPENDANCY_TYPES.PoliticalPartiesPresenter).to(PoliticalPartiesPresenter);
container.bind<PoliticalPartyPresenter>(COMMON_DEPENDANCY_TYPES.PoliticalPartyPresenter).to(PoliticalPartyPresenter);
container.bind<EventPresenter>(COMMON_DEPENDANCY_TYPES.EventPresenter).to(EventPresenter);
container.bind<TurnInformationsPresenter>(COMMON_DEPENDANCY_TYPES.TurnInformationsPresenter).to(TurnInformationsPresenter);
container.bind<SenatePresenter>(COMMON_DEPENDANCY_TYPES.SenatePresenter).to(SenatePresenter);
container.bind<ParliamentPresenter>(COMMON_DEPENDANCY_TYPES.ParliamentPresenter).to(ParliamentPresenter);
container.bind<SocialClassPresenter>(COMMON_DEPENDANCY_TYPES.SocialClassPresenter).to(SocialClassPresenter);
container.bind<SocialClassesPresenter>(COMMON_DEPENDANCY_TYPES.SocialClassesPresenter).to(SocialClassesPresenter);
container.bind<ProductPresenter>(COMMON_DEPENDANCY_TYPES.ProductPresenter).to(ProductPresenter);
container.bind<ProductsPresenter>(COMMON_DEPENDANCY_TYPES.ProductsPresenter).to(ProductsPresenter);
container.bind<SectorsPresenter>(COMMON_DEPENDANCY_TYPES.SectorsPresenter).to(SectorsPresenter);
container.bind<SectorPresenter>(COMMON_DEPENDANCY_TYPES.SectorPresenter).to(SectorPresenter);
container.bind<StatePresenter>(COMMON_DEPENDANCY_TYPES.StatePresenter).to(StatePresenter);

export default container;
