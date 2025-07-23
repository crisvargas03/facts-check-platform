'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DemoPage() {
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [showResults, setShowResults] = useState(false);

	const sampleArticle = {
		title: "Nuevo descubrimiento científico revoluciona la medicina moderna",
		content: `Un equipo de investigadores de la Universidad de Stanford ha anunciado un 
		descubrimiento revolucionario en el campo de la medicina. Según el estudio publicado 
		en la prestigiosa revista Nature, los científicos han desarrollado una nueva técnica 
		que permite regenerar tejidos dañados en cuestión de días, en lugar de meses o años. 
		
		El Dr. María González, líder del proyecto, explicó que "esta tecnología podría 
		transformar completamente la forma en que tratamos lesiones y enfermedades crónicas". 
		Los ensayos clínicos iniciales han mostrado resultados prometedores, con una tasa de 
		éxito del 85% en pacientes con lesiones graves.
		
		Sin embargo, es importante notar que la investigación aún se encuentra en fase 
		experimental y se necesitan más estudios antes de que pueda ser aprobada para uso 
		general en humanos. Los expertos estiman que podría tomar entre 5 a 10 años antes 
		de que esta tecnología esté disponible comercialmente.`,
		source: "https://ejemplo-noticias.com/ciencia/2024"
	};

	const analysisResults = {
		credibilityScore: 78,
		factors: [
			{ name: "Fuente Confiable", score: 85, description: "La fuente tiene buena reputación en el campo científico" },
			{ name: "Evidencia Científica", score: 90, description: "Menciona estudios específicos y revistas científicas" },
			{ name: "Citas y Referencias", score: 70, description: "Incluye citas de expertos pero falta información detallada" },
			{ name: "Lenguaje Objetivo", score: 75, description: "El tono es principalmente objetivo y factual" },
			{ name: "Contexto y Limitaciones", score: 70, description: "Menciona limitaciones pero podría ser más específico" }
		],
		summary: "Este artículo presenta información científica con un buen nivel de credibilidad. La fuente es confiable y el contenido incluye elementos científicos válidos, aunque podría beneficiarse de más detalles sobre la metodología y limitaciones del estudio."
	};

	const handleAnalyze = () => {
		setIsAnalyzing(true);
		// Simular tiempo de análisis
		setTimeout(() => {
			setIsAnalyzing(false);
			setShowResults(true);
		}, 3000);
	};

	const getResultColor = (percentage: number) => {
		if (percentage >= 80) return { color: '#166534', backgroundColor: '#dcfce7' };
		if (percentage >= 60) return { color: '#92400e', backgroundColor: '#fef3c7' };
		if (percentage >= 40) return { color: '#9a3412', backgroundColor: '#fed7aa' };
		return { color: '#991b1b', backgroundColor: '#fecaca' };
	};

	return (
		<div style={{ backgroundColor: 'white', padding: '40px 20px' }}>
			<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
				{/* Header */}
				<div style={{ textAlign: 'center', marginBottom: '48px' }}>
					<h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
						Demo: Análisis de Veracidad
					</h1>
					<p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '800px', margin: '0 auto' }}>
						Ve cómo funciona ChequeaEsoRD analizando un artículo de ejemplo. 
						Esta es una demostración de nuestra tecnología de IA.
					</p>
				</div>

				{/* Demo Container */}
				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
					{/* Article Section */}
					<div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.15)', padding: '24px' }}>
						<h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
							Artículo de Ejemplo
						</h2>
						<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
							<h3 style={{ fontSize: '18px', fontWeight: '500', color: '#374151' }}>
								{sampleArticle.title}
							</h3>
							<p style={{ color: '#6b7280', fontSize: '14px' }}>
								Fuente: {sampleArticle.source}
							</p>
							<div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
								<p style={{ color: '#374151', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
									{sampleArticle.content}
								</p>
							</div>
						</div>
					</div>

					{/* Analysis Section */}
					<div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.15)', padding: '24px' }}>
						<h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
							Análisis de Veracidad
						</h2>
						
						{!showResults && !isAnalyzing && (
							<div style={{ textAlign: 'center', padding: '32px 0' }}>
								<p style={{ color: '#6b7280', marginBottom: '24px' }}>
									Haz clic en el botón para analizar este artículo con nuestra IA
								</p>
								<button
									onClick={handleAnalyze}
									style={{
										backgroundColor: '#2563eb',
										color: 'white',
										padding: '12px 32px',
										borderRadius: '8px',
										border: 'none',
										fontSize: '16px',
										fontWeight: '600',
										cursor: 'pointer',
										transition: 'background-color 0.2s'
									}}
									onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
									onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
								>
									Analizar Artículo
								</button>
							</div>
						)}

						{isAnalyzing && (
							<div style={{ textAlign: 'center', padding: '32px 0' }}>
								<div style={{ 
									display: 'inline-block', 
									width: '32px', 
									height: '32px', 
									border: '3px solid #e5e7eb',
									borderTop: '3px solid #2563eb',
									borderRadius: '50%',
									animation: 'spin 1s linear infinite',
									marginBottom: '16px'
								}}></div>
								<p style={{ color: '#6b7280' }}>Analizando artículo, por favor espera...</p>
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

						{showResults && (
							<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
								{/* Overall Score - Adaptado del estilo de analizar artículo */}
								<div style={{ textAlign: 'center' }}>
									<div 
										style={{
											display: 'inline-block',
											padding: '12px 24px',
											borderRadius: '8px',
											fontSize: '24px',
											fontWeight: 'bold',
											marginBottom: '16px',
											...getResultColor(analysisResults.credibilityScore)
										}}
									>
										{analysisResults.credibilityScore}% de Veracidad
									</div>
									<p style={{ color: '#6b7280' }}>
										{analysisResults.credibilityScore >= 80 && 'El artículo tiene alta credibilidad'}
										{analysisResults.credibilityScore >= 60 && analysisResults.credibilityScore < 80 && 'El artículo tiene credibilidad moderada'}
										{analysisResults.credibilityScore >= 40 && analysisResults.credibilityScore < 60 && 'El artículo tiene credibilidad cuestionable'}
										{analysisResults.credibilityScore < 40 && 'El artículo tiene baja credibilidad'}
									</p>
								</div>

								{/* Factors */}
								<div>
									<h4 style={{ fontSize: '16px', fontWeight: '600', color: '#000000', marginBottom: '12px' }}>Factores Evaluados</h4>
									<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
										{analysisResults.factors.map((factor, index) => (
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
								<div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '8px' }}>
									<h4 style={{ fontSize: '16px', fontWeight: '600', color: '#000000', marginBottom: '8px' }}>Resumen del Análisis</h4>
									<p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>
										{analysisResults.summary}
									</p>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Call to Action - Adaptado del estilo de analizar artículo */}
				{showResults && (
					<div style={{ textAlign: 'center', marginTop: '48px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.15)', padding: '32px' }}>
						<h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000000', marginBottom: '16px' }}>
							¿Te gustó lo que viste?
						</h3>
						<p style={{ color: '#6b7280', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px auto' }}>
							Esta es solo una demostración. Con ChequeaEsoRD puedes analizar cualquier artículo 
							y obtener resultados detallados de veracidad en tiempo real.
						</p>
						<div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
							<Link
								href="/auth/signup"
								style={{
									backgroundColor: '#2563eb',
									color: 'white',
									padding: '12px 32px',
									borderRadius: '8px',
									textDecoration: 'none',
									fontSize: '16px',
									fontWeight: '600',
									transition: 'background-color 0.2s'
								}}
								onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
								onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
							>
								Comenzar Gratis
							</Link>
							<Link
								href="/plans"
								style={{
									border: '2px solid #2563eb',
									color: '#2563eb',
									padding: '12px 32px',
									borderRadius: '8px',
									textDecoration: 'none',
									fontSize: '16px',
									fontWeight: '600',
									transition: 'background-color 0.2s'
								}}
								onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
								onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
							>
								Ver Planes
							</Link>
						</div>
					</div>
				)}

				{/* Back to Home */}
				<div style={{ textAlign: 'center', marginTop: '32px' }}>
					<Link
						href="/home"
						style={{
							color: '#2563eb',
							fontWeight: '500',
							textDecoration: 'none',
							transition: 'color 0.2s'
						}}
						onMouseOver={(e) => e.currentTarget.style.color = '#1d4ed8'}
						onMouseOut={(e) => e.currentTarget.style.color = '#2563eb'}
					>
						← Volver al inicio
					</Link>
				</div>
			</div>
		</div>
	);
} 