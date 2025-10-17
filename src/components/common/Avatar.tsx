import { User } from 'lucide-react';
import { clsx } from 'clsx';

type AvatarProps = {
  initials?: string;
  src?: string;
  alt?: string;
};

export const Avatar = ({ initials, src, alt = 'User avatar' }: AvatarProps) => {
  return (
    <div
      className={clsx(
        'flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/70 bg-background-raised text-lg font-semibold text-white shadow-lg'
      )}
      aria-label={alt}
      role="img"
    >
      {src ? <img src={src} alt={alt} className="h-full w-full rounded-full object-cover" /> : initials ?? <User className="h-6 w-6" />}
    </div>
  );
};
