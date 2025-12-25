import { AppConfig, UserSession, showConnect, openContractCall } from '@stacks/connect';
import { STACKS_MAINNET } from '@stacks/network';
import { APP_CONFIG } from '../constants';

// 1. Setup UserSession
const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

// 2. Authentication Helper
export const authenticate = () => {
  showConnect({
    appDetails: {
      name: APP_CONFIG.appName,
      icon: APP_CONFIG.appIcon,
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
};

export const logout = () => {
  userSession.signUserOut("/");
  window.location.reload();
};

export const getStxAddress = (): string | null => {
  if (userSession.isUserSignedIn()) {
    return userSession.loadUserData().profile.stxAddress.mainnet;
  }
  return null;
};

// 3. Contract Interaction
export const checkInTransaction = async (onFinish: (data: any) => void) => {
  await openContractCall({
    contractAddress: APP_CONFIG.contractAddress,
    contractName: APP_CONFIG.contractName,
    functionName: 'check-in',
    functionArgs: [], 
    network: STACKS_MAINNET,
    appDetails: {
        name: APP_CONFIG.appName,
        icon: APP_CONFIG.appIcon,
    },
    onFinish,
  });
};

// 4. Mock Data Fetchers
export const fetchUserStats = async (address: string) => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800)); 
    
    return {
        currentStreak: Math.floor(Math.random() * 6) + 1,
        maxStreak: 12,
        totalCheckins: 24
    };
};

export const fetchGlobalStats = async () => {
    await new Promise(r => setTimeout(r, 800));
    return {
        totalUsers: 142,
        totalCheckins: 890
    };
};