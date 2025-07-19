'use client';

import { useState } from 'react';

export default function AnalyzarArticulo() {
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    url: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [analysisDetails, setAnalysisDetails] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const randomPercentage = Math.floor(Math.random() * 100) + 1;
      const details = generateAnalysisDetails(randomPercentage);
      setResult(randomPercentage);
      setAnalysisDetails(details);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getResultColor = (percentage: number) => {
    if (percentage >= 80) return { color: '#166534', backgroundColor: '#dcfce7' };
    if (percentage >= 60) return { color: '#92400e', backgroundColor: '#fef3c7' };
    if (percentage >= 40) return { color: '#9a3412', backgroundColor: '#fed7aa' };
    return { color: '#991b1b', backgroundColor: '#fecaca' };
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#000000', marginBottom: '32px' }}>Analizar Nuevo Artículo</h1>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Título */}
            <div>
              <label htmlFor="titulo" style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#9ca3af', marginBottom: '8px' }}>
                Título del Artículo
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '8px', 
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Ingresa el título del artículo..."
                required
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            {/* Contenido */}
            <div>
              <label htmlFor="contenido" style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#9ca3af', marginBottom: '8px' }}>
                Contenido del Artículo
              </label>
              <textarea
                id="contenido"
                name="contenido"
                value={formData.contenido}
                onChange={handleInputChange}
                rows={10}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '8px', 
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  resize: 'vertical'
                }}
                placeholder="Pega aquí el contenido completo del artículo..."
                required
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            {/* URL */}
            <div>
              <label htmlFor="url" style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#9ca3af', marginBottom: '8px' }}>
                URL (Opcional)
              </label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '8px', 
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                placeholder="https://ejemplo.com/articulo"
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '16px' }}>
              <button
                type="submit"
                disabled={isAnalyzing || !formData.titulo || !formData.contenido}
                style={{ 
                  backgroundColor: isAnalyzing || !formData.titulo || !formData.contenido ? '#9ca3af' : '#2563eb', 
                  color: 'white', 
                  padding: '12px 32px', 
                  borderRadius: '8px', 
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isAnalyzing || !formData.titulo || !formData.contenido ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  if (!isAnalyzing && formData.titulo && formData.contenido) {
                    e.currentTarget.style.backgroundColor = '#1d4ed8';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isAnalyzing && formData.titulo && formData.contenido) {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                  }
                }}
              >
                {isAnalyzing ? 'Analizando...' : 'Analizar Artículo'}
              </button>
            </div>
          </form>

          {/* Loading State */}
          {isAnalyzing && (
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <div style={{ 
                display: 'inline-block', 
                width: '32px', 
                height: '32px', 
                border: '3px solid #e5e7eb',
                borderTop: '3px solid #2563eb',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ marginTop: '16px', color: '#6b7280' }}>Analizando el artículo, por favor espera...</p>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginTop: '8px' }}>
                Evaluando credibilidad, verificando fuentes, analizando contenido...
              </p>
              <style jsx>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {/* Result */}
          {result !== null && !isAnalyzing && analysisDetails && (
            <div style={{ marginTop: '32px', padding: '24px', borderRadius: '8px', border: '2px solid #3b82f6', backgroundColor: '#dbeafe' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#000000', marginBottom: '16px' }}>Resultado del Análisis</h3>
              
              {/* Overall Score */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ 
                  display: 'inline-block', 
                  padding: '12px 24px', 
                  borderRadius: '8px', 
                  fontSize: '24px', 
                  fontWeight: 'bold',
                  ...getResultColor(result)
                }}>
                  {result}% de Veracidad
                </div>
                <p style={{ marginTop: '16px', color: '#6b7280' }}>
                  {result >= 80 && 'El artículo tiene alta credibilidad'}
                  {result >= 60 && result < 80 && 'El artículo tiene credibilidad moderada'}
                  {result >= 40 && result < 60 && 'El artículo tiene credibilidad cuestionable'}
                  {result < 40 && 'El artículo tiene baja credibilidad'}
                </p>
              </div>

              {/* Factors */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#000000', marginBottom: '12px' }}>Factores Evaluados</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {analysisDetails.factors.map((factor: any, index: number) => (
                    <div key={index} style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
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

              {/* Summary */}
              <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#000000', marginBottom: '8px' }}>Resumen del Análisis</h4>
                <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>
                  {analysisDetails.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button
                  onClick={() => {
                    setResult(null);
                    setAnalysisDetails(null);
                    setFormData({ titulo: '', contenido: '', url: '' });
                  }}
                  style={{ 
                    backgroundColor: '#6b7280', 
                    color: 'white', 
                    padding: '8px 24px', 
                    borderRadius: '8px', 
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
                >
                  Analizar Otro
                </button>
                <a
                  href="/history-results"
                  style={{ 
                    backgroundColor: '#2563eb', 
                    color: 'white', 
                    padding: '8px 24px', 
                    borderRadius: '8px', 
                    textDecoration: 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                >
                  Ver Historial
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}