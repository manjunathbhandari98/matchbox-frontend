import { Users } from 'lucide-react';

interface CardProps {
  header: string;
  count: number | string;
  info: string;
  icon?: React.ReactNode;
}

export const Card = ({ header, count, info, icon }: CardProps) => {
  return (
    <div className="flex justify-between items-start p-5 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-semibold">{header}</h4>
        <h1 className="text-3xl font-bold">{count}</h1>
        <p className="text-sm opacity-80">{info}</p>
      </div>
      <div className="text-3xl">{icon || <Users size={28} />}</div>
    </div>
  );
};
