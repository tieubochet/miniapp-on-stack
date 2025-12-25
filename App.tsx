import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { CheckInCard } from './components/CheckInCard';
import { GlobalStats, UserStats } from './types';
import { checkInTransaction, fetchUserStats, fetchGlobalStats, appKit, getStxAddress } from './services/stacksService';
import { Users, Activity } from 'lucide-react';
import { APP_CONFIG } from './constants';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [globalStats, setGlobalStats] = useState<GlobalStats>({ totalUsers: 0, totalCheckins: 0 });
  const [loadingCheckIn, setLoadingCheckIn] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    // Initial fetch of global stats
    fetchGlobalStats().then(setGlobalStats);

    // Initial Address Check
    const initialAddr = getStxAddress();
    if (initialAddr) {
        setAddress(initialAddr);
        setIsConnected(true);
        loadStats(initialAddr);
    }

    // Subscribe to AppKit state changes only if appKit initialized successfully
    let unsubscribe = () => {};
    
    if (appKit) {
        try {
            unsubscribe = appKit.subscribeState((state) => {
                const currentAddr = getStxAddress(); // Use helper to get address
                const isSelected = !!state.selectedNetworkId;

                if (currentAddr && currentAddr !== address) {
                    setAddress(currentAddr);
                    setIsConnected(true);
                    loadStats(currentAddr);
                } else if (!currentAddr && isConnected) {
                    setAddress(null);
                    setIsConnected(false);
                    setUserStats(null);
                }
            });
        } catch (e) {
            console.error("Failed to subscribe to AppKit state", e);
        }
    }

    return () => {
        unsubscribe();
    }
  }, [address, isConnected]); // Added dependencies to ensure effect runs correctly

  const loadStats = async (addr: string) => {
    const [uStats, gStats] = await Promise.all([
        fetchUserStats(addr),
        fetchGlobalStats()
    ]);
    setUserStats(uStats);
    setGlobalStats(gStats);
  };

  const handleConnect = () => { 
      if (appKit) {
          appKit.open(); 
      } else {
          alert("Wallet connection service is initializing. Please try again.");
      }
  };
  
  const handleDisconnect = () => { 
      if (appKit) appKit.disconnect(); 
  };

  const handleCheckIn = async () => {
    setLoadingCheckIn(true);
    
    try {
        await checkInTransaction((data) => {
            console.log("Transaction finished:", data);
            // Simulate an optimistic update for the UI
            setTimeout(() => {
                if (userStats) {
                    setUserStats({
                        ...userStats,
                        currentStreak: userStats.currentStreak + 1,
                        totalCheckins: userStats.totalCheckins + 1,
                        maxStreak: Math.max(userStats.maxStreak, userStats.currentStreak + 1)
                    });
                } else {
                     setUserStats({
                        currentStreak: 1,
                        maxStreak: 1,
                        totalCheckins: 1
                    });
                }
                setLoadingCheckIn(false);
                alert("Check-in transaction submitted! Stats will update after confirmation.");
            }, 2000);
        });
    } catch (e) {
        console.error(e);
        setLoadingCheckIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-stacks-500/30">
      <Navbar 
        isConnected={isConnected} 
        onConnect={handleConnect} 
        onDisconnect={handleDisconnect}
        address={address || undefined}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        
        {/* Header Section */}
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Mini App <span className="text-stacks-500">on Stack</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Connect using Reown AppKit, build, and maintain your streak. Mint exclusive NFTs every 7 days.
            </p>
        </div>

        {/* Global Stats Ticker */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            <div className="bg-slate-800/50 rounded-xl p-4 flex items-center justify-center gap-4 border border-slate-700/50">
                <div className="bg-purple-500/10 p-2 rounded-lg text-purple-400">
                    <Users className="h-5 w-5" />
                </div>
                <div className="text-left">
                    <div className="text-2xl font-bold text-white">{globalStats.totalUsers}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Total Builders</div>
                </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 flex items-center justify-center gap-4 border border-slate-700/50">
                <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400">
                    <Activity className="h-5 w-5" />
                </div>
                 <div className="text-left">
                    <div className="text-2xl font-bold text-white">{globalStats.totalCheckins}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Total Check-ins</div>
                </div>
            </div>
        </div>

        {/* Main Action Area */}
        <div className="mb-16">
            <CheckInCard 
                stats={userStats} 
                isLoading={loadingCheckIn} 
                onCheckIn={handleCheckIn}
                isConnected={isConnected}
            />
        </div>

        {/* Analytics Dashboard */}
        <div>
            <div className="flex items-center gap-2 mb-6">
                <div className="h-1 w-6 bg-stacks-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">Activity Overview</h2>
            </div>
            <Dashboard />
        </div>

      </main>

      <footer className="border-t border-slate-800 py-8 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
              <p>&copy; 2024 Mini App on Stack. Powered by Clarity & Reown.</p>
          </div>
      </footer>
    </div>
  );
};

export default App;