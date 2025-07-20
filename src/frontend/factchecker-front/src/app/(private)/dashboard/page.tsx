'use client';

import { useState } from 'react';
import { IoPerson, IoCheckmarkCircle, IoWarning, IoBarChart, IoFilter } from 'react-icons/io5';
import Link from 'next/link';
import StatCard from '@/components/ui/StatCard';
import BarChart from '@/components/ui/BarChart';
import DataTable from '@/components/ui/DataTable';
import FilterModal from '@/components/ui/FilterModal';

export default function Dashboard() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [analysisData] = useState([
    { id: 1, name: 'Artículo 1', credibility: 90, percentage: '90%', date: '2024-01-15' },
    { id: 2, name: 'Artículo 2', credibility: 65, percentage: '65%', date: '2024-01-14' },
    { id: 3, name: 'Artículo 3', credibility: 50, percentage: '50%', date: '2024-01-13' },
    { id: 4, name: 'Artículo 4', credibility: 25, percentage: '25%', date: '2024-01-12' }
  ]);



  const filteredData = analysisData.filter(item => {
    if (!startDate && !endDate) return true;
    
    const itemDate = new Date(item.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    if (start && end) {
      return itemDate >= start && itemDate <= end;
    } else if (start) {
      return itemDate >= start;
    } else if (end) {
      return itemDate <= end;
    }
    
    return true;
  });

  const getResultsTitle = () => {
    if (!startDate && !endDate) {
      return "Resultados de Hoy";
    }
    
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
    };
    
    if (startDate && endDate) {
      return `Resultados del ${formatDate(startDate)} al ${formatDate(endDate)}`;
    } else if (startDate) {
      return `Resultados desde ${formatDate(startDate)}`;
    } else if (endDate) {
      return `Resultados hasta ${formatDate(endDate)}`;
    }
    
    return "Resultados de Hoy";
  };

  return (
    <div style={{ padding: '40px 20px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Title */}
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#000000', textAlign: 'center', marginBottom: '32px' }}>DashBoard</h1>

        {/* Stats Section */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000000' }}>{getResultsTitle()}</h2>
            <button
              onClick={() => setShowFilterModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '10px 16px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              <IoFilter style={{ fontSize: '14px' }} />
              Filtrar
            </button>
          </div>
          <p style={{ color: '#9ca3af', marginBottom: '24px' }}>Resumen de Resultados</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            <StatCard
              icon={<IoPerson />}
              value="24"
              label="Total Analizado"
              backgroundColor="#f3e8ff"
              iconBackgroundColor="#e9d5ff"
              iconColor="#7c3aed"
            />
            <StatCard
              icon={<IoCheckmarkCircle />}
              value="12"
              label="Escaneos Reales"
              backgroundColor="#dcfce7"
              iconBackgroundColor="#bbf7d0"
              iconColor="#16a34a"
            />
            <StatCard
              icon={<IoWarning />}
              value="2"
              label="Escaneos Imprecisos"
              backgroundColor="#fed7aa"
              iconBackgroundColor="#fdba74"
              iconColor="#ea580c"
            />
            <StatCard
              icon={<IoBarChart />}
              value="10"
              label="Escaneos Falsos"
              backgroundColor="#fecaca"
              iconBackgroundColor="#fca5a5"
              iconColor="#dc2626"
            />
          </div>
        </div>

        {/* Chart and Analysis Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
          gap: '32px', 
          marginBottom: '48px' 
        }}>
          {/* Chart */}
          <BarChart
            data={[
              { day: 'Lun', real: 80, fake: 60 },
              { day: 'Mar', real: 120, fake: 80 },
              { day: 'Mié', real: 70, fake: 100 },
              { day: 'Jue', real: 60, fake: 80 },
              { day: 'Vie', real: 50, fake: 70 },
              { day: 'Sáb', real: 65, fake: 55 },
              { day: 'Dom', real: 45, fake: 40 }
            ]}
            title="Comparativa de Análisis"
          />

          {/* Recent Analysis */}
          <DataTable
            columns={[
              { key: 'index', label: '#', align: 'left', width: '40px' },
              { key: 'name', label: 'Nombre', sortable: true },
              { key: 'credibility', label: 'Credibilidad', sortable: true, align: 'center' },
              { key: 'percentage', label: 'Porcentaje', sortable: true, align: 'center', width: '80px' },
              { key: 'date', label: 'Fecha', sortable: true, align: 'center', width: '100px' }
            ]}
            data={filteredData}
            title="Análisis Recientes"
            viewDetailLink="/history-results"
          />
        </div>

        {/* Filter Modal */}
        <FilterModal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onClear={() => { setStartDate(''); setEndDate(''); }}
        />
      </div>
    </div>
  );
}