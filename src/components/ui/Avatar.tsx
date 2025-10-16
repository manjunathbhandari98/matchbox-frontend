interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export const Avatar = ({ name, size = 8, className }: AvatarProps) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');
  return (
    <div
      className={`rounded-full p-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white border border-white flex items-center justify-center font-medium text-sm w-${size} h-${size} ${className}`}
    >
      {initials}
    </div>
  );
};
