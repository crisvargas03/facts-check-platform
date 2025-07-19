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
		<div className="min-h-screen bg-gray-50 py-8 px-4">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Demo: Análisis de Veracidad
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Ve cómo funciona ChequeaEsoRD analizando un artículo de ejemplo. 
						Esta es una demostración de nuestra tecnología de IA.
					</p>
				</div>

				{/* Demo Container */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Article Section */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Artículo de Ejemplo
						</h2>
						<div className="space-y-4">
							<h3 className="text-lg font-medium text-gray-800">
								{sampleArticle.title}
							</h3>
							<p className="text-gray-600 text-sm">
								Fuente: {sampleArticle.source}
							</p>
							<div className="bg-gray-50 p-4 rounded-md">
								<p className="text-gray-700 leading-relaxed whitespace-pre-line">
									{sampleArticle.content}
								</p>
							</div>
						</div>
					</div>

					{/* Analysis Section */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Análisis de Veracidad
						</h2>
						
						{!showResults && !isAnalyzing && (
							<div className="text-center py-8">
								<p className="text-gray-600 mb-6">
									Haz clic en el botón para analizar este artículo con nuestra IA
								</p>
								<button
									onClick={handleAnalyze}
									className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
								>
									Analizar Artículo
								</button>
							</div>
						)}

						{isAnalyzing && (
							<div className="text-center py-8">
								<div className="inline-block w-8 h-8 border-3 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
								<p className="text-gray-600">Analizando artículo, por favor espera...</p>
								<p className="text-sm text-gray-500 mt-2">
									Evaluando credibilidad, verificando fuentes, analizando contenido...
								</p>
							</div>
						)}

						{showResults && (
							<div className="space-y-6">
								{/* Overall Score - Adaptado del estilo de analizar artículo */}
								<div className="text-center">
									<div 
										className="inline-block px-6 py-3 rounded-lg text-2xl font-bold mb-4"
										style={getResultColor(analysisResults.credibilityScore)}
									>
										{analysisResults.credibilityScore}% de Veracidad
									</div>
									<p className="text-gray-600">
										{analysisResults.credibilityScore >= 80 && 'El artículo tiene alta credibilidad'}
										{analysisResults.credibilityScore >= 60 && analysisResults.credibilityScore < 80 && 'El artículo tiene credibilidad moderada'}
										{analysisResults.credibilityScore >= 40 && analysisResults.credibilityScore < 60 && 'El artículo tiene credibilidad cuestionable'}
										{analysisResults.credibilityScore < 40 && 'El artículo tiene baja credibilidad'}
									</p>
								</div>

								{/* Factors */}
								<div>
									<h4 className="font-semibold text-gray-900 mb-3">Factores Evaluados</h4>
									<div className="space-y-3">
										{analysisResults.factors.map((factor, index) => (
											<div key={index} className="border-l-4 border-blue-500 pl-4">
												<div className="flex justify-between items-center mb-1">
													<span className="font-medium text-gray-800">{factor.name}</span>
													<span className="text-sm font-semibold text-blue-600">{factor.score}%</span>
												</div>
												<div className="w-full bg-gray-200 rounded-full h-2 mb-2">
													<div 
														className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
														style={{ width: `${factor.score}%` }}
													></div>
												</div>
												<p className="text-sm text-gray-600">{factor.description}</p>
											</div>
										))}
									</div>
								</div>

								{/* Summary */}
								<div className="bg-blue-50 p-4 rounded-lg">
									<h4 className="font-semibold text-gray-900 mb-2">Resumen del Análisis</h4>
									<p className="text-gray-700 text-sm leading-relaxed">
										{analysisResults.summary}
									</p>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Call to Action - Adaptado del estilo de analizar artículo */}
				{showResults && (
					<div className="text-center mt-12 bg-white rounded-lg shadow-md p-8">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							¿Te gustó lo que viste?
						</h3>
						<p className="text-gray-600 mb-6 max-w-2xl mx-auto">
							Esta es solo una demostración. Con ChequeaEsoRD puedes analizar cualquier artículo 
							y obtener resultados detallados de veracidad en tiempo real.
						</p>
						<div className="flex justify-center gap-4 flex-wrap">
							<Link
								href="/auth/signup"
								className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
							>
								Comenzar Gratis
							</Link>
							<Link
								href="/plans"
								className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors"
							>
								Ver Planes
							</Link>
						</div>
					</div>
				)}

				{/* Back to Home */}
				<div className="text-center mt-8">
					<Link
						href="/home"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						← Volver al inicio
					</Link>
				</div>
			</div>
		</div>
	);
} 