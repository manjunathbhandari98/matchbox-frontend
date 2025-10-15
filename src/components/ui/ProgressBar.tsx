interface ProgressBarProps {
  value: number;
  colorFrom?: string;
  colorTo?: string;
  height?: number;
  className?: string;
}

export const ProgressBar = ({
  value,
  colorFrom = 'from-blue-400',
  colorTo = 'to-blue-600',
  height = 8,
  className,
}: ProgressBarProps) => {
  return (
    <div
      className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
    >
      <div
        className={`bg-gradient-to-r ${colorFrom} ${colorTo} rounded-full transition-all duration-500`}
        style={{ width: `${value}%`, height: `${height}px` }}
      />
    </div>
  );
};
