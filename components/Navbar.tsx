import React from 'react';
import { Layers } from 'lucide-react';

interface NavbarProps {
  isConnected: boolean; // Kept for prop compatibility, but handled internally by Reown button
  address?: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-stacks-500 p-2 rounded-lg">
                <Layers className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-stacks-500 to-purple-400">
              Mini App on Stack
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* The Reown AppKit Button handles connection state, address display, and balance automatically */}
            <appkit-button balance="hide" />
          </div>
        </div>
      </div>
    </nav>
  );
};