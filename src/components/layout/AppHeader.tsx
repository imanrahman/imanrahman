import { LogOut, Settings } from 'lucide-react';
import { Avatar } from '../common/Avatar.tsx';

const AppHeader = () => {
  return (
    <header className="flex items-center justify-between gap-4 rounded-2xl bg-background-surface/90 px-6 py-4 shadow-elevated">
      <div>
        <h1 className="text-3xl font-semibold text-white">Lead Navigator</h1>
        <p className="text-sm text-slate-300">
          Discover, filter, and qualify the right prospects in seconds.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Account settings"
          className="focus-ring rounded-full border border-slate-700/60 bg-background-raised p-2 text-slate-200 transition hover:border-slate-500 hover:text-white"
        >
          <Settings className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Sign out"
          className="focus-ring rounded-full border border-slate-700/60 bg-background-raised p-2 text-slate-200 transition hover:border-slate-500 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
        </button>
        <Avatar initials="IR" />
      </div>
    </header>
  );
};

export default AppHeader;
