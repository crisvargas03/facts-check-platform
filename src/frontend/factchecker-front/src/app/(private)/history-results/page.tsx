'use client';

import { useState } from 'react';

interface HistorialItem {
  id: number;
  nombre: string;
  fecha: string;
  credibilidad: number;
  porcentaje: string;
}

export default function HistorialResultados() {
  const [historialData] = useState<HistorialItem[]>([
    { id: 1, nombre: 'Artículo 1', fecha: '5/5/2025 23:23:59', credibilidad: 80, porcentaje: '80%' },
    { id: 2, nombre: 'Artículo 2', fecha: '5/5/2025 23:23:59', credibilidad: 65, porcentaje: '65%' },
    { id: 3, nombre: 'Artículo 3', fecha: '5/5/2025 23:23:59', credibilidad: 50, porcentaje: '50%' },
    { id: 4, nombre: 'Artículo 4', fecha: '5/5/2025 23:23:59', credibilidad: 25, porcentaje: '25%' }
  ]);

  const [sortBy, setSortBy] = useState<'nombre' | 'fecha' | 'porcentaje'>('fecha');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: 'nombre' | 'fecha' | 'porcentaje') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedData = [...historialData].sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];

    if (sortBy === 'porcentaje') {
      aValue = a.credibilidad;
      bValue = b.credibilidad;
    } else if (sortBy === 'fecha') {
      aValue = new Date(a.fecha).getTime();
      bValue = new Date(b.fecha).getTime();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getCredibilityBarColor = (credibilidad: number) => {
    if (credibilidad >= 80) return '#10b981';
    if (credibilidad >= 60) return '#f59e0b';
    if (credibilidad >= 40) return '#f97316';
    return '#ef4444';
  };

  const getPercentageColor = (credibilidad: number) => {
    if (credibilidad >= 80) return { backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' };
    if (credibilidad >= 60) return { backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' };
    if (credibilidad >= 40) return { backgroundColor: '#fed7aa', color: '#9a3412', border: '1px solid #fdba74' };
    return { backgroundColor: '#fecaca', color: '#991b1b', border: '1px solid #fca5a5' };
  };

  const SortIcon = ({ column }: { column: 'nombre' | 'fecha' | 'porcentaje' }) => {
    if (sortBy !== column) return <span style={{ color: '#9ca3af' }}>↕</span>;
    return sortOrder === 'desc' ? <span style={{ color: '#374151' }}>↓</span> : <span style={{ color: '#374151' }}>↑</span>;
  };

  return (
    <div style={{ minHeight: '10vh', backgroundColor: '#f8fafc', padding: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#000000', marginBottom: '68px' }}>Historial de Resultados</h1>

        {/* Table */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden', width: '100%' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '20px 24px', fontWeight: '600', color: '#9ca3af' }}>#</th>
                  <th 
                    style={{ textAlign: 'left', padding: '20px 24px', fontWeight: '600', color: '#9ca3af', cursor: 'pointer' }}
                    onClick={() => handleSort('nombre')}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>Nombre</span>
                      <SortIcon column="nombre" />
                    </div>
                  </th>
                  <th 
                    style={{ textAlign: 'left', padding: '20px 24px', fontWeight: '600', color: '#9ca3af', cursor: 'pointer' }}
                    onClick={() => handleSort('fecha')}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>Fecha</span>
                      <SortIcon column="fecha" />
                    </div>
                  </th>
                  <th style={{ textAlign: 'left', padding: '20px 24px', fontWeight: '600', color: '#9ca3af' }}>Credibilidad</th>
                  <th 
                    style={{ textAlign: 'left', padding: '20px 24px', fontWeight: '600', color: '#9ca3af', cursor: 'pointer' }}
                    onClick={() => handleSort('porcentaje')}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>Porcentaje</span>
                      <SortIcon column="porcentaje" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item, index) => (
                  <tr 
                    key={item.id} 
                    style={{ borderBottom: '1px solid #e5e7eb', transition: 'background-color 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <td style={{ padding: '24px', color: '#9ca3af' }}>
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td style={{ padding: '24px', color: '#000000', fontWeight: '600' }}>
                      {item.nombre}
                    </td>
                    <td style={{ padding: '24px', color: '#9ca3af' }}>
                      {item.fecha}
                    </td>
                    <td style={{ padding: '24px' }}>
                      <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '12px', maxWidth: '300px' }}>
                        <div 
                          style={{ 
                            height: '12px', 
                            borderRadius: '9999px', 
                            backgroundColor: getCredibilityBarColor(item.credibilidad),
                            width: `${item.credibilidad}%`
                          }}
                        ></div>
                      </div>
                    </td>
                    <td style={{ padding: '24px' }}>
                      <span style={{ 
                        padding: '8px 16px', 
                        borderRadius: '20px', 
                        fontSize: '14px', 
                        fontWeight: '600',
                        ...getPercentageColor(item.credibilidad)
                      }}>
                        {item.porcentaje}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {historialData.length === 0 && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '48px', textAlign: 'center', width: '100%' }}>
            <div style={{ fontSize: '64px', color: '#9ca3af', marginBottom: '16px' }}>📊</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#000000', marginBottom: '8px' }}>No hay resultados</h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>Aún no has analizado ningún artículo.</p>
            <a 
              href="/analizar"
              style={{ 
                backgroundColor: '#1e3a8a', 
                color: 'white', 
                padding: '8px 24px', 
                borderRadius: '8px', 
                textDecoration: 'none',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e40af'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1e3a8a'}
            >
              Analizar Primer Artículo
            </a>
          </div>
        )}
    </div>
  );
}