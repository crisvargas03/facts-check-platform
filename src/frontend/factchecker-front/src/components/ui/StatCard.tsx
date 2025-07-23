import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  backgroundColor: string;
  iconBackgroundColor: string;
  iconColor: string;
}

export default function StatCard({ 
  icon, 
  value, 
  label, 
  backgroundColor, 
  iconBackgroundColor, 
  iconColor 
}: StatCardProps) {
  return (
    <div style={{ backgroundColor, padding: '24px', borderRadius: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          backgroundColor: iconBackgroundColor, 
          borderRadius: '8px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center'
        }}>
          <div style={{ fontSize: '24px', color: iconColor }}>
            {icon}
          </div>
        </div>
      </div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#000000', marginBottom: '4px' }}>
        {value}
      </div>
      <div style={{ color: '#374151', fontWeight: '600', marginBottom: '4px' }}>
        {label}
      </div>
    </div>
  );
} 