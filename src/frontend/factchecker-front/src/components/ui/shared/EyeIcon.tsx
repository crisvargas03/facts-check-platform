interface EyeIconProps {
  onClick?: () => void;
  size?: number;
  color?: string;
  title?: string;
}

export const EyeIcon = ({ onClick, size = 20, color = '#6b7280', title = "Ver detalle" }: EyeIconProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: onClick ? 'pointer' : 'default',
        padding: '8px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s',
        color
      }}
      onMouseOver={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
          e.currentTarget.style.color = '#374151';
        }
      }}
      onMouseOut={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = color;
        }
      }}
      title={title}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    </button>
  );
}; 