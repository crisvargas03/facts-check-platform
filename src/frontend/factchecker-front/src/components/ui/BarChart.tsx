interface BarChartData {
  day: string;
  real: number;
  fake: number;
}

interface BarChartProps {
  data: BarChartData[];
  title: string;
  height?: number;
  gap?: number;
}

export default function BarChart({ data, title, height = 200, gap = 12 }: BarChartProps) {
  return (
    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000000', marginBottom: '110px' }}>
        {title}
      </h3>
      
      {/* Simple Bar Chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: `${gap}px`, height: `${height}px`, marginBottom: '24px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <div 
                style={{ 
                  backgroundColor: '#ef4444', 
                  width: '100%', 
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  height: `${item.fake}px`
                }}
              ></div>
              <div 
                style={{ 
                  backgroundColor: '#10b981', 
                  width: '100%', 
                  borderBottomLeftRadius: '4px',
                  borderBottomRightRadius: '4px',
                  height: `${item.real}px`
                }}
              ></div>
            </div>
            <span style={{ 
              fontSize: '12px', 
              color: '#6b7280', 
              marginTop: '8px',
              fontWeight: '500'
            }}>
              {item.day}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#ef4444', borderRadius: '2px', marginRight: '8px' }}></div>
          <span style={{ fontSize: '14px', color: '#9ca3af' }}>Artículos Falsos</span>
          <span style={{ marginLeft: '8px', fontSize: '16px', fontWeight: '600', color: '#000000' }}>1,135</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#10b981', borderRadius: '2px', marginRight: '8px' }}></div>
          <span style={{ fontSize: '14px', color: '#9ca3af' }}>Artículos Reales</span>
          <span style={{ marginLeft: '8px', fontSize: '16px', fontWeight: '600', color: '#000000' }}>635</span>
        </div>
      </div>
    </div>
  );
} 