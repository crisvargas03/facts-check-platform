'use client';

import { useState } from 'react';
import { Badge } from './Badge';
import { ProgressBar } from './ProgressBar';

interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

interface DataTableProps {
  columns: DataTableColumn[];
  data: any[];
  itemsPerPage?: number;
  onRowClick?: (item: any) => void;
  renderCell?: (item: any, columnKey: string, index: number) => React.ReactNode;
  // Props para compatibilidad con el uso actual
  title?: string;
  viewDetailLink?: string;
  viewDetailText?: string;
}

export const DataTable = ({ 
  columns, 
  data, 
  itemsPerPage = 5, 
  onRowClick,
  renderCell,
  title,
  viewDetailLink,
  viewDetailText = "Ver Detalle"
}: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Columnas por defecto para compatibilidad con el uso actual
  const defaultColumns: DataTableColumn[] = [
    { key: 'index', label: '#', align: 'left', width: '40px' },
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'credibility', label: 'Credibilidad', sortable: true, align: 'center' },
    { key: 'percentage', label: 'Porcentaje', sortable: true, align: 'center', width: '80px' },
    { key: 'date', label: 'Fecha', sortable: true, align: 'center', width: '100px' }
  ];

  const tableColumns = columns || defaultColumns;

  const handleSort = (columnKey: string) => {
    if (sortBy === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnKey);
      setSortOrder('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortBy) return 0;
    
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortBy !== columnKey) return <span style={{ color: '#9ca3af' }}>↕</span>;
    return sortOrder === 'desc' ? <span style={{ color: '#374151' }}>↓</span> : <span style={{ color: '#374151' }}>↑</span>;
  };

  // Renderizado por defecto para compatibilidad
  const defaultRenderCell = (item: any, columnKey: string, index: number) => {
    switch (columnKey) {
      case 'index':
        return <span style={{ fontSize: '14px', color: '#9ca3af' }}>{String(index + 1).padStart(2, '0')}</span>;
      case 'name':
        return <span style={{ fontSize: '14px', color: '#000000' }}>{item.name}</span>;
      case 'credibility':
        return (
          <ProgressBar 
            percentage={item.credibility} 
            width="100%"
            height="8px"
          />
        );
      case 'percentage':
        const getCredibilityColor = (credibility: number) => {
          if (credibility >= 80) return 'green';
          if (credibility >= 60) return 'yellow';
          if (credibility >= 40) return 'orange';
          return 'red';
        };
        return (
          <Badge color={getCredibilityColor(item.credibility)}>
            {item.percentage}
          </Badge>
        );
      case 'date':
        return (
          <span style={{ fontSize: '14px', color: '#6b7280' }}>
            {new Date(item.date).toLocaleDateString('es-ES')}
          </span>
        );
      default:
        return item[columnKey];
    }
  };

  const cellRenderer = renderCell || defaultRenderCell;

  return (
    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      {/* Header con título y enlace si se proporciona */}
      {(title || viewDetailLink) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          {title && <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000000' }}>{title}</h3>}
          {viewDetailLink && (
            <a 
              href={viewDetailLink}
              style={{ 
                fontSize: '14px', 
                color: '#1e3a8a', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              {viewDetailText}
            </a>
          )}
        </div>
      )}

      {/* Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', width: '100%' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {tableColumns.map((column) => (
                  <th 
                    key={column.key}
                    style={{ 
                      textAlign: column.align || 'left', 
                      padding: '16px 24px', 
                      fontWeight: '600', 
                      color: '#9ca3af', 
                      fontSize: '14px',
                      cursor: column.sortable ? 'pointer' : 'default',
                      width: column.width
                    }}
                    onClick={() => column.sortable && handleSort(column.key)}
                    onMouseOver={(e) => {
                      if (column.sortable) {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (column.sortable) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: column.align === 'center' ? 'center' : 'flex-start',
                      gap: '8px' 
                    }}>
                      <span>{column.label}</span>
                      {column.sortable && <SortIcon columnKey={column.key} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr 
                  key={item.id || index}
                  style={{ 
                    borderBottom: '1px solid #f3f4f6', 
                    transition: 'background-color 0.2s',
                    cursor: onRowClick ? 'pointer' : 'default'
                  }}
                  onClick={() => onRowClick && onRowClick(item)}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  {tableColumns.map((column) => (
                    <td 
                      key={column.key}
                      style={{ 
                        padding: '16px 24px', 
                        textAlign: column.align || 'left',
                        color: '#374151',
                        fontSize: '14px'
                      }}
                    >
                      {cellRenderer(item, column.key, startIndex + index)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '8px', 
          marginTop: '70px',
          padding: '24px 0'
        }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              backgroundColor: currentPage === 1 ? '#f3f4f6' : 'white',
              color: currentPage === 1 ? '#9ca3af' : '#374151',
              borderRadius: '6px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              if (currentPage !== 1) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseOut={(e) => {
              if (currentPage !== 1) {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                backgroundColor: currentPage === page ? '#1e3a8a' : 'white',
                color: currentPage === page ? 'white' : '#374151',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: currentPage === page ? '600' : '400',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                if (currentPage !== page) {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }
              }}
              onMouseOut={(e) => {
                if (currentPage !== page) {
                  e.currentTarget.style.backgroundColor = currentPage === page ? '#1e3a8a' : 'white';
                }
              }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              backgroundColor: currentPage === totalPages ? '#f3f4f6' : 'white',
              color: currentPage === totalPages ? '#9ca3af' : '#374151',
              borderRadius: '6px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              if (currentPage !== totalPages) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseOut={(e) => {
              if (currentPage !== totalPages) {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable; 