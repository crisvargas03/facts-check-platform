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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const randomPercentage = Math.floor(Math.random() * 100) + 1;
      setResult(randomPercentage);
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
              <style jsx>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {/* Result */}
          {result !== null && !isAnalyzing && (
            <div style={{ marginTop: '32px', padding: '24px', borderRadius: '8px', border: '2px solid #3b82f6', backgroundColor: '#dbeafe' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#000000', marginBottom: '16px' }}>Resultado del Análisis</h3>
              <div style={{ textAlign: 'center' }}>
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
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
                  <button
                    onClick={() => {
                      setResult(null);
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
                    href="/historial"
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}