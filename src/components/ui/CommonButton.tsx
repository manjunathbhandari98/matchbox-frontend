import React from 'react';
import colors from '../../constants/colors';

type CommonButtonProps = {
  text: string;
  color?: string; // text color (can be a color name or hex)
  bgColor?: string; // background color
  borderColor?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  shadow?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
};

const CommonButton: React.FC<CommonButtonProps> = ({
  text,
  color = '#ffffff',
  bgColor = colors.primary,
  borderColor,
  icon,
  size = 'md',
  rounded = 'md',
  shadow = false,
  onClick,
  className = '',
  type = 'submit',
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const roundedClasses = {
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        flex items-center justify-center gap-2
        font-medium cursor-pointer
        ${sizeClasses[size]}
        ${roundedClasses[rounded]}
        ${shadow ? 'shadow-md hover:shadow-lg' : ''}
        transition-all duration-200 focus:outline-none active:scale-95
        ${className}
      `}
      style={{
        backgroundColor: bgColor,
        color: color,
        border: borderColor ? `1px solid ${borderColor}` : undefined,
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = bgColor;
      }}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {text}
    </button>
  );
};

export default CommonButton;
