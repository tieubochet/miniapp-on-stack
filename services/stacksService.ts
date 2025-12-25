import { createAppKit } from '@reown/appkit/react';
import { StacksAdapter } from '@reown/appkit-adapter-stacks';
import { openContractCall } from '@stacks/connect';
import { APP_CONFIG } from '../constants';

// 1. Get projectId
const projectId = APP_CONFIG.projectId;

// 2. Set up Stacks Adapter
const stacksAdapter = new StacksAdapter({
  projectId,
  networks: [
    {
      id: 'mainnet',
      name: 'Stacks Mainnet',
      network: 'mainnet',
      rpcUrl: 'https://stacks-node-api.mainnet.stacks.co',
      currency: 'STX',
      explorerUrl: 'https://explorer.hiro.so',
    }
  ]
});

// 3. Create AppKit instance with Error Handling
let appKitInstance;
try {
  appKitInstance = createAppKit({
    adapters: [stacksAdapter],
    networks: [stacksAdapter.networks[0]],
    projectId,
    metadata: {
      name: APP_CONFIG.appName,
      description: 'Stacks Builder Challenge App',
      url: window.location.origin,
      icons: [APP_CONFIG.appIcon]
    },
    features: {
      analytics: true,
      email: false, // Disable email to reduce complexity in CDN mode
      socials: []   // Disable socials to reduce complexity in CDN mode
    }
  });
} catch (error) {
  console.error("Failed to initialize Reown AppKit:", error);
}

export const appKit = appKitInstance;

// Helper to get current address safely
export const getStxAddress = () => {
  if (!appKit) return null;
  
  try {
    const state = appKit.getIsConnectedState();
    if (state) {
       return appKit.getAddress();
    }
  } catch (e) {
    console.warn("Error getting address from AppKit:", e);
  }
  return null;
};

export const logout = () => {
  if (appKit) appKit.disconnect();
};

export const checkInTransaction = async (onFinish: (data: any) => void) => {
  // We use openContractCall for the actual interaction
  // This works alongside AppKit because AppKit handles the wallet connection session
  await openContractCall({
    contractAddress: APP_CONFIG.contractAddress,
    contractName: APP_CONFIG.contractName,
    functionName: 'check-in',
    functionArgs: [], 
    appDetails: {
        name: APP_CONFIG.appName,
        icon: APP_CONFIG.appIcon,
    },
    onFinish,
  });
};

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