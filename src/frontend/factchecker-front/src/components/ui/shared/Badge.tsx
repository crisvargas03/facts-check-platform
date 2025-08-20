interface BadgeProps {
  children: React.ReactNode;
  color?: 'green' | 'yellow' | 'orange' | 'red' | 'blue' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  customColor?: {
    backgroundColor: string;
    color: string;
    border?: string;
  };
}

export const Badge = ({ children, color, size = 'md', customColor }: BadgeProps) => {
  const getColorStyles = () => {
    if (customColor) {
      return {
        backgroundColor: customColor.backgroundColor,
        color: customColor.color,
        border: customColor.border || 'none'
      };
    }

    const colorMap = {
      green: { backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' },
      yellow: { backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' },
      orange: { backgroundColor: '#fed7aa', color: '#9a3412', border: '1px solid #fdba74' },
      red: { backgroundColor: '#fecaca', color: '#991b1b', border: '1px solid #fca5a5' },
      blue: { backgroundColor: '#dbeafe', color: '#1e40af', border: '1px solid #93c5fd' },
      gray: { backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db' }
    };

    return colorMap[color || 'gray'];
  };

  const getSizeStyles = () => {
    const sizeMap = {
      sm: { padding: '4px 8px', fontSize: '12px' },
      md: { padding: '6px 12px', fontSize: '12px' },
      lg: { padding: '8px 16px', fontSize: '14px' }
    };

    return sizeMap[size];
  };

  const styles = {
    ...getColorStyles(),
    ...getSizeStyles(),
    borderRadius: '16px',
    fontWeight: '600',
    display: 'inline-block',
    textAlign: 'center' as const,
    transition: 'all 0.2s'
  };

  return (
    <span style={styles}>
      {children}
    </span>
  );
};

export default Badge; 