import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { Activity, Github, Code, CheckCircle2 } from 'lucide-react';
import { MOCK_ACTIVITY_DATA } from '../constants';

export const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
      
      {/* WalletKit & SDK Usage */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
            <Code className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold text-white">SDK Integration Status</h2>
        </div>
        
        <div className="space-y-4">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex justify-between items-center">
                <div>
                    <div className="text-white font-medium">Reown AppKit</div>
                    <div className="text-xs text-slate-400">Analytics & Core Initialized</div>
                </div>
                <div className="text-green-400 font-medium flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full text-xs border border-green-500/20">
                    <CheckCircle2 className="h-3 w-3" /> Active
                </div>
            </div>
            
             <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex justify-between items-center">
                <div>
                    <div className="text-white font-medium">Stacks Connect</div>
                    <div className="text-xs text-slate-400">Transaction Signing</div>
                </div>
                <div className="text-green-400 font-medium flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full text-xs border border-green-500/20">
                    <CheckCircle2 className="h-3 w-3" /> Active
                </div>
            </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-700">
            <h3 className="text-sm font-medium text-slate-300 mb-4">Smart Contract Fees (STX)</h3>
             <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_ACTIVITY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="fees" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* GitHub Contributions */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-100/10 rounded-lg text-white">
            <Github className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold text-white">GitHub Activity</h2>
        </div>
        
        <div className="flex justify-between items-end mb-4">
            <div>
                <div className="text-3xl font-bold text-white">56</div>
                <div className="text-sm text-slate-400">Commits this week</div>
            </div>
            <div className="text-green-400 text-sm font-medium">+12% vs last week</div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_ACTIVITY_DATA}>
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{fill: '#334155', opacity: 0.4}}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="commits" fill="#ffffff" radius={[4, 4, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};