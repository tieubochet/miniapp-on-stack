export interface UserStats {
  currentStreak: number;
  maxStreak: number;
  totalCheckins: number;
}

export interface GlobalStats {
  totalUsers: number;
  totalCheckins: number;
}

export interface ContractResponse {
  streak: number;
  minted: boolean;
}

export enum AppState {
  IDLE,
  CONNECTING,
  CONNECTED,
  TX_PENDING,
}

// Mocking Stacks types to avoid heavy dependency setup in this environment
// In a real project, these come from @stacks/connect and @stacks/network
export interface StacksSession {
  isUserSignedIn: () => boolean;
  loadUserData: () => any;
  signUserOut: () => void;
}

export interface DashboardMetric {
  name: string;
  value: number;
  date: string;
}

// Add support for the custom web component from Reown AppKit
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'appkit-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        balance?: 'show' | 'hide';
      };
    }
  }
}