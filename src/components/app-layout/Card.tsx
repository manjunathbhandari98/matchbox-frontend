interface CardProps {
  header: string;
  count: number | string | undefined;
  info?: string;
  change?: string; // e.g., "+24 from last month" or "-0.5 days"
  unit?: string; // e.g., "%", "days"
}

export const Card = ({ header, count, info, change, unit }: CardProps) => {
  const isPositive = change?.startsWith('+');

  return (
    <div className="flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-zinc-700 min-w-[180px]">
      {/* Header */}
      <h4 className="text-gray-600 dark:text-gray-300 text-sm font-medium">
        {header}
      </h4>

      {/* Count */}
      <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-200 flex items-baseline gap-1">
        {count}
        {unit && (
          <span className="text-sm font-medium text-gray-500">{unit}</span>
        )}
      </div>

      {/* Change & Info */}
      {info && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-300 flex flex-col">
          {change && (
            <span
              className={`font-medium ${
                isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {change}
            </span>
          )}
          <span>{info}</span>
        </p>
      )}
    </div>
  );
};
