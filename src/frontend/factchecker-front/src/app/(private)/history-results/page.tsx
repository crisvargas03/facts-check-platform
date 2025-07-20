'use client';

import { useState } from 'react';
import { DataTable, Modal, ProgressBar, Badge, EyeIcon } from '@/components/ui';

interface HistorialItem {
  id: number;
  nombre: string;
  fecha: string;
  credibilidad: number;
  porcentaje: string;
}

interface AnalysisDetails {
  factors: Array<{
    name: string;
    score: number;
    description: string;
  }>;
  summary: string;
}

export default function HistorialResultados() {
  const [historialData] = useState<HistorialItem[]>([
    { id: 1, nombre: 'Artículo 1', fecha: '5/5/2025 23:23:59', credibilidad: 80, porcentaje: '80%' },
    { id: 2, nombre: 'Artículo 2', fecha: '5/5/2025 23:23:59', credibilidad: 65, porcentaje: '65%' },
    { id: 3, nombre: 'Artículo 3', fecha: '5/5/2025 23:23:59', credibilidad: 50, porcentaje: '50%' },
    { id: 4, nombre: 'Artículo 4', fecha: '5/5/2025 23:23:59', credibilidad: 25, porcentaje: '25%' },
    { id: 5, nombre: 'Artículo 5', fecha: '4/5/2025 22:15:30', credibilidad: 90, porcentaje: '90%' },
    { id: 6, nombre: 'Artículo 6', fecha: '4/5/2025 21:45:12', credibilidad: 35, porcentaje: '35%' },
    { id: 7, nombre: 'Artículo 7', fecha: '4/5/2025 20:30:45', credibilidad: 75, porcentaje: '75%' },
    { id: 8, nombre: 'Artículo 8', fecha: '4/5/2025 19:20:18', credibilidad: 45, porcentaje: '45%' },
    { id: 9, nombre: 'Artículo 9', fecha: '4/5/2025 18:10:33', credibilidad: 85, porcentaje: '85%' },
    { id: 10, nombre: 'Artículo 10', fecha: '4/5/2025 17:05:27', credibilidad: 30, porcentaje: '30%' },
    { id: 11, nombre: 'Artículo 11', fecha: '4/5/2025 16:45:59', credibilidad: 70, porcentaje: '70%' },
    { id: 12, nombre: 'Artículo 12', fecha: '4/5/2025 15:30:14', credibilidad: 55, porcentaje: '55%' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HistorialItem | null>(null);
  const [analysisDetails, setAnalysisDetails] = useState<AnalysisDetails | null>(null);

  const generateAnalysisDetails = (percentage: number) => {
    const factors = [
      { name: "Fuente Confiable", score: Math.floor(Math.random() * 30) + 60, description: "Evaluación de la reputación y confiabilidad de la fuente" },
      { name: "Evidencia Científica", score: Math.floor(Math.random() * 30) + 60, description: "Presencia de datos, estudios o referencias científicas" },
      { name: "Citas y Referencias", score: Math.floor(Math.random() * 30) + 60, description: "Calidad y cantidad de citas y referencias incluidas" },
      { name: "Lenguaje Objetivo", score: Math.floor(Math.random() * 30) + 60, description: "Uso de lenguaje neutral y factual vs. emocional" },
      { name: "Contexto y Limitaciones", score: Math.floor(Math.random() * 30) + 60, description: "Inclusión de contexto y reconocimiento de limitaciones" }
    ];

    const summaries = [
      "Este artículo presenta información con un buen nivel de credibilidad. La fuente es confiable y el contenido incluye elementos válidos, aunque podría beneficiarse de más detalles sobre la metodología.",
      "El análisis muestra credibilidad moderada. Se identifican elementos positivos pero también áreas de mejora en términos de evidencia y contexto.",
      "El artículo tiene credibilidad cuestionable. Se recomienda verificar la información con fuentes adicionales antes de considerarla completamente confiable.",
      "Este contenido presenta baja credibilidad. Se sugiere buscar información en fuentes más confiables y verificar los datos presentados."
    ];

    let summaryIndex = 0;
    if (percentage >= 80) summaryIndex = 0;
    else if (percentage >= 60) summaryIndex = 1;
    else if (percentage >= 40) summaryIndex = 2;
    else summaryIndex = 3;

    return {
      factors,
      summary: summaries[summaryIndex]
    };
  };

  const handleViewDetails = (item: HistorialItem) => {
    setSelectedItem(item);
    setAnalysisDetails(generateAnalysisDetails(item.credibilidad));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setAnalysisDetails(null);
  };

  const getResultColor = (percentage: number) => {
    if (percentage >= 80) return { color: '#166534', backgroundColor: '#dcfce7' };
    if (percentage >= 60) return { color: '#92400e', backgroundColor: '#fef3c7' };
    if (percentage >= 40) return { color: '#9a3412', backgroundColor: '#fed7aa' };
    return { color: '#991b1b', backgroundColor: '#fecaca' };
  };

  const columns = [
    { key: 'id', label: '#', sortable: false, width: '60px' },
    { key: 'nombre', label: 'Nombre', sortable: true },
    { key: 'fecha', label: 'Fecha', sortable: true },
    { key: 'credibilidad', label: 'Credibilidad', sortable: false },
    { key: 'porcentaje', label: 'Porcentaje', sortable: true, align: 'center' as const },
    { key: 'detalle', label: 'Detalle', sortable: false, align: 'center' as const }
  ];

  const renderCell = (item: HistorialItem, columnKey: string, index: number) => {
    switch (columnKey) {
      case 'id':
        return <span style={{ color: '#9ca3af', fontSize: '14px' }}>{String(index + 1).padStart(2, '0')}</span>;
      
      case 'nombre':
        return <span style={{ color: '#374151', fontWeight: '500', fontSize: '14px' }}>{item.nombre}</span>;
      
      case 'fecha':
        return <span style={{ color: '#374151', fontSize: '14px' }}>{item.fecha}</span>;
      
      case 'credibilidad':
        return (
          <div style={{ maxWidth: '200px' }}>
            <ProgressBar percentage={item.credibilidad} />
          </div>
        );
      
      case 'porcentaje':
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Badge customColor={getResultColor(item.credibilidad)}>
              {item.porcentaje}
            </Badge>
          </div>
        );
      
      case 'detalle':
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <EyeIcon onClick={() => handleViewDetails(item)} />
          </div>
        );
      
      default:
        return item[columnKey as keyof HistorialItem];
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '40px 40px 1px 40px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '40px' }}>
        Historial de Resultados
      </h1>

      <DataTable
        columns={columns}
        data={historialData}
        itemsPerPage={5}
        renderCell={renderCell}
      />

      {/* Empty State */}
      {historialData.length === 0 && (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '48px', textAlign: 'center', width: '100%' }}>
          <div style={{ fontSize: '64px', color: '#9ca3af', marginBottom: '16px' }}>📊</div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#000000', marginBottom: '8px' }}>No hay resultados</h3>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>Aún no has analizado ningún artículo.</p>
          <a 
            href="/submit-article"
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

      {/* Modal de Detalles */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title="Detalle del Análisis"
      >
        {selectedItem && analysisDetails && (
          <>
            {/* Información del Artículo */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#000000', marginBottom: '8px' }}>
                {selectedItem.nombre}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                Analizado el {selectedItem.fecha}
              </p>
            </div>

            {/* Resultado General */}
            <div style={{ 
              padding: '24px', 
              borderRadius: '8px', 
              border: '2px solid #3b82f6', 
              backgroundColor: '#dbeafe',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <div style={{ 
                display: 'inline-block', 
                padding: '12px 24px', 
                borderRadius: '8px', 
                fontSize: '24px', 
                fontWeight: 'bold',
                ...getResultColor(selectedItem.credibilidad)
              }}>
                {selectedItem.porcentaje} de Veracidad
              </div>
              <p style={{ marginTop: '16px', color: '#6b7280' }}>
                {selectedItem.credibilidad >= 80 && 'El artículo tiene alta credibilidad'}
                {selectedItem.credibilidad >= 60 && selectedItem.credibilidad < 80 && 'El artículo tiene credibilidad moderada'}
                {selectedItem.credibilidad >= 40 && selectedItem.credibilidad < 60 && 'El artículo tiene credibilidad cuestionable'}
                {selectedItem.credibilidad < 40 && 'El artículo tiene baja credibilidad'}
              </p>
            </div>

            {/* Factores Evaluados */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#000000', marginBottom: '16px' }}>
                Factores Evaluados
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {analysisDetails.factors.map((factor, index) => (
                  <div key={index} style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '500', color: '#374151' }}>{factor.name}</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#3b82f6' }}>{factor.score}%</span>
                    </div>
                    <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '4px', height: '8px', marginBottom: '8px' }}>
                      <div 
                        style={{ 
                          backgroundColor: '#3b82f6', 
                          height: '8px', 
                          borderRadius: '4px', 
                          transition: 'width 1s ease-in-out',
                          width: `${factor.score}%` 
                        }}
                      ></div>
                    </div>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen del Análisis */}
            <div style={{ backgroundColor: '#eff6ff', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#000000', marginBottom: '12px' }}>
                Resumen del Análisis
              </h4>
              <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>
                {analysisDetails.summary}
              </p>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}