interface ProgressBarProps {
  percentage: number;
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
  showPercentage?: boolean;
  animated?: boolean;
}

export const ProgressBar = ({ 
  percentage, 
  width = '100%', 
  height = '8px',
  backgroundColor = '#f3f4f6',
  color,
  showPercentage = false,
  animated = true
}: ProgressBarProps) => {
  const getDefaultColor = (percentage: number) => {
    if (percentage >= 80) return '#10b981'; // Verde brillante
    if (percentage >= 60) return '#f59e0b'; // Naranja
    if (percentage >= 40) return '#f97316'; // Naranja-rojo
    return '#ef4444'; // Rojo brillante
  };

  const barColor = color || getDefaultColor(percentage);

  return (
    <div style={{ width }}>
      <div style={{ 
        width: '100%', 
        backgroundColor, 
        borderRadius: '4px', 
        height,
        overflow: 'hidden'
      }}>
        <div 
          style={{ 
            height,
            borderRadius: '4px', 
            backgroundColor: barColor,
            width: `${percentage}%`,
            transition: animated ? 'width 0.3s ease' : 'none'
          }}
        ></div>
      </div>
      {showPercentage && (
        <div style={{ 
          marginTop: '4px', 
          fontSize: '12px', 
          color: '#6b7280',
          textAlign: 'center'
        }}>
          {percentage}%
        </div>
      )}
    </div>
  );
}; 