import React from 'react';
import { CalendarCheck, Flame, Award, Loader2, Sparkles } from 'lucide-react';
import { UserStats } from '../types';

interface CheckInCardProps {
  stats: UserStats | null;
  isLoading: boolean;
  onCheckIn: () => void;
  isConnected: boolean;
}

export const CheckInCard: React.FC<CheckInCardProps> = ({ stats, isLoading, onCheckIn, isConnected }) => {
  const currentStreak = stats?.currentStreak || 0;
  // If streak is 6, 13, 20... (mod 7 == 6), the NEXT checkin (7, 14, 21) will trigger a mint.
  const isMintDay = (currentStreak % 7) === 6;
  const daysUntilMint = 7 - (currentStreak % 7);
  const progressToNextNft = (currentStreak % 7) / 7 * 100;

  if (!isConnected) {
      return (
          <div className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl">
              <div className="mx-auto bg-slate-700 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <CalendarCheck className="h-8 w-8 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Connect to Check In</h2>
              <p className="text-slate-400 max-w-md mx-auto">
                  Connect your Stacks wallet to start your daily streak and earn exclusive NFTs for your consistency.
              </p>
          </div>
      )
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-1 shadow-2xl overflow-hidden relative group">
      {/* Background Glow */}
      <div className={`absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 blur-3xl rounded-full transition-all duration-700 ${isMintDay ? 'bg-purple-600/30' : 'bg-stacks-600/20 group-hover:bg-stacks-600/30'}`}></div>

      <div className="p-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    Daily Streak
                    <span className="text-xs bg-stacks-600 text-white px-2 py-1 rounded uppercase tracking-wider">Active</span>
                </h2>
                <p className="text-slate-400 text-sm mt-1">Keep checking in to mint your Streak NFT.</p>
            </div>
            
            <div className="flex items-center gap-4">
                 <div className="text-right">
                    <div className="text-sm text-slate-400">Total Check-ins</div>
                    <div className="text-xl font-bold text-white">{stats?.totalCheckins || 0}</div>
                 </div>
                 <div className="h-10 w-px bg-slate-700"></div>
                 <div className="text-right">
                    <div className="text-sm text-slate-400">Max Streak</div>
                    <div className="text-xl font-bold text-white">{stats?.maxStreak || 0}</div>
                 </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Current Streak Big Display */}
            <div className="col-span-1 md:col-span-2 bg-slate-950/50 rounded-xl p-6 border border-slate-700 flex items-center justify-between">
                <div>
                    <div className="text-slate-400 text-sm font-medium mb-1">CURRENT STREAK</div>
                    <div className="text-5xl font-black text-white tracking-tighter flex items-center gap-3">
                        {currentStreak}
                        <Flame className={`h-8 w-8 ${currentStreak > 0 ? 'text-orange-500 fill-orange-500' : 'text-slate-600'}`} />
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">NEXT MILESTONE</div>
                    <div className={`flex items-center gap-1 justify-end ${isMintDay ? 'text-purple-400 animate-pulse' : 'text-stacks-300'}`}>
                        <Award className="h-4 w-4" />
                        <span className="font-bold">{isMintDay ? 'Next Check-in!' : `${daysUntilMint} Days`}</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="flex items-stretch">
                <button 
                    onClick={onCheckIn}
                    disabled={isLoading}
                    className={`w-full h-full text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-2
                        ${isMintDay 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 ring-2 ring-purple-400/50' 
                            : 'bg-gradient-to-r from-stacks-600 to-indigo-600 hover:from-stacks-500 hover:to-indigo-500'
                        }`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : isMintDay ? (
                        <>
                            <Sparkles className="h-8 w-8" />
                            <span>Check In & Mint NFT</span>
                        </>
                    ) : (
                        <>
                            <CalendarCheck className="h-8 w-8" />
                            <span>Check In Now</span>
                        </>
                    )}
                </button>
            </div>
        </div>

        {/* Progress Bar */}
        <div>
            <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Progress to next NFT</span>
                <span>{currentStreak % 7} / 7 Days</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden relative">
                <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${isMintDay ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-orange-500 to-yellow-500'}`}
                    style={{ width: `${progressToNextNft}%` }}
                ></div>
            </div>
        </div>

      </div>
    </div>
  );
};