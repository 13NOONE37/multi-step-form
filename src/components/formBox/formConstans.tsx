import ArcadeIcon from '../../assets/images/IconArcade';
import AdvancedIcon from '../../assets/images/IconAdvanced';
import ProIcon from '../../assets/images/IconPro';

export const YEARLY_FACTOR = 10; //it defines discount if user pays for whole year(for how many months he really pays)

export enum PLAN_NAMES {
  ARCADE = 'Arcade',
  ADVANCED = 'Advanced',
  PRO = 'Pro',
}
interface Plan {
  name: PLAN_NAMES;
  price: number;
  Icon: JSX.Element;
}
export const PLANS: Record<PLAN_NAMES, Plan> = {
  [PLAN_NAMES.ARCADE]: {
    name: PLAN_NAMES.ARCADE,
    price: 9,
    Icon: <ArcadeIcon />,
  },
  [PLAN_NAMES.ADVANCED]: {
    name: PLAN_NAMES.ADVANCED,
    price: 12,
    Icon: <AdvancedIcon />,
  },
  [PLAN_NAMES.PRO]: {
    name: PLAN_NAMES.PRO,
    price: 15,
    Icon: <ProIcon />,
  },
};

export enum ADD_ON_NAMES {
  ONLINE_SERVICES = 'Online service',
  LARGER_STORAGE = 'Larger storage',
  CUSTOMIZABLE_PROFILE = 'Customizable profile',
}
interface AddOn {
  name: string;
  description: string;
  price: number;
}
export const ADD_ONS: Record<ADD_ON_NAMES, AddOn> = {
  [ADD_ON_NAMES.ONLINE_SERVICES]: {
    name: ADD_ON_NAMES.ONLINE_SERVICES,
    description: 'Access to multiplayer games',
    price: 1,
  },
  [ADD_ON_NAMES.LARGER_STORAGE]: {
    name: ADD_ON_NAMES.LARGER_STORAGE,
    description: 'Extra 1TB of cloud save',
    price: 2,
  },
  [ADD_ON_NAMES.CUSTOMIZABLE_PROFILE]: {
    name: ADD_ON_NAMES.CUSTOMIZABLE_PROFILE,
    description: 'Custom theme on your profile',
    price: 2,
  },
};

export default {
  PLAN_NAMES,
  PLANS,
  ADD_ON_NAMES,
  ADD_ONS,
  YEARLY_FACTOR,
};
