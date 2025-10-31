interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

const sizeClasses: Record<number, string> = {
  6: 'w-6 h-6 text-xs',
  8: 'w-8 h-8 text-sm',
  10: 'w-10 h-10 text-base',
  12: 'w-12 h-12 text-lg',
};

export const Avatar = ({ name, size = 8, className }: AvatarProps) => {
  const initials =
    name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || '??';

  const sizeClass = sizeClasses[size] || 'w-10 h-10 text-base';

  return (
    <div
      className={`rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 
        text-white border border-white flex items-center justify-center font-medium 
        ${sizeClass} ${className}`}
    >
      {initials}
    </div>
  );
};
