import Link from 'next/link';
import { IoCheckmarkCircle, IoBarChart, IoFlash } from 'react-icons/io5';

export default function Home() {
	return (
	  <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '40px 20px' }}>
		<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
		  {/* Hero Section */}
		  <div style={{ textAlign: 'center', marginBottom: '80px' }}>
			<h1 style={{ fontSize: '72px', fontWeight: 'bold', color: '#000000', marginBottom: '24px' }}>
			  ChequeaEsoRD
			</h1>
			<p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '32px', maxWidth: '800px', margin: '0 auto 32px' }}>
			  Plataforma avanzada para el análisis de veracidad de artículos. 
			  Utilizamos tecnología de última generación para determinar el porcentaje de credibilidad 
			  de cualquier contenido periodístico o informativo.
			</p>
			<div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '80px' }}>
			  <Link 
				href="/auth/login" 
				style={{ 
				  backgroundColor: '#1e3a8a', 
				  color: 'white', 
				  padding: '12px 32px', 
				  borderRadius: '8px', 
				  textDecoration: 'none',
				  fontWeight: '600',
				  display: 'inline-block'
				}}
			  >
				Iniciar Sesión
			  </Link>
			  <Link 
				href="/auth/signup" 
				style={{ 
				  border: '2px solid #1e3a8a', 
				  color: '#1e3a8a', 
				  padding: '12px 32px', 
				  borderRadius: '8px', 
				  textDecoration: 'none',
				  fontWeight: '600',
				  display: 'inline-block'
				}}
			  >
				Registrarse
			  </Link>
			</div>
		  </div>
  
		  {/* Features */}
		  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
			<div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
			  <div style={{ 
				width: '64px', 
				height: '64px', 
				backgroundColor: '#dcfce7', 
				borderRadius: '12px', 
				display: 'flex', 
				alignItems: 'center', 
				justifyContent: 'center', 
				margin: '0 auto 24px'
			  }}>
				<IoCheckmarkCircle style={{ fontSize: '32px', color: '#16a34a' }} />
			  </div>
			  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#000000', marginBottom: '12px', textAlign: 'center' }}>Análisis Preciso</h3>
			  <p style={{ color: '#6b7280', textAlign: 'center', lineHeight: '1.6' }}>
				Algoritmos avanzados que evalúan múltiples factores para determinar la veracidad del contenido.
			  </p>
			</div>
			
			<div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
			  <div style={{ 
				width: '64px', 
				height: '64px', 
				backgroundColor: '#dbeafe', 
				borderRadius: '12px', 
				display: 'flex', 
				alignItems: 'center', 
				justifyContent: 'center', 
				margin: '0 auto 24px'
			  }}>
				<IoBarChart style={{ fontSize: '32px', color: '#2563eb' }} />
			  </div>
			  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#000000', marginBottom: '12px', textAlign: 'center' }}>Reportes Detallados</h3>
			  <p style={{ color: '#6b7280', textAlign: 'center', lineHeight: '1.6' }}>
				Visualización clara de resultados con porcentajes de credibilidad y métricas históricas.
			  </p>
			</div>
			
			<div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
			  <div style={{ 
				width: '64px', 
				height: '64px', 
				backgroundColor: '#e0e7ff', 
				borderRadius: '12px', 
				display: 'flex', 
				alignItems: 'center', 
				justifyContent: 'center', 
				margin: '0 auto 24px'
			  }}>
				<IoFlash style={{ fontSize: '32px', color: '#7c3aed' }} />
			  </div>
			  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#000000', marginBottom: '12px', textAlign: 'center' }}>Resultados Instantáneos</h3>
			  <p style={{ color: '#6b7280', textAlign: 'center', lineHeight: '1.6' }}>
				Obtén el análisis de veracidad en segundos y accede a tu historial completo.
			  </p>
			</div>
		  </div>

		  {/* Demo Preview Section */}
		  <div style={{ textAlign: 'center', marginTop: '80px', padding: '60px 20px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
			<h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#000000', marginBottom: '16px' }}>
			  ¿Quieres probar?
			</h2>
			<p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
			  Ve cómo funciona nuestra plataforma con un ejemplo real de análisis de veracidad.
			</p>
			<Link 
			  href="/demo" 
			  style={{ 
				backgroundColor: '#1e3a8a', 
				color: 'white', 
				padding: '16px 40px', 
				borderRadius: '8px', 
				textDecoration: 'none',
				fontWeight: '600',
				fontSize: '18px',
				display: 'inline-block'
			  }}
			>
			  Ver Demo Interactivo
			</Link>
		  </div>

		  {/* Join Us Section */}
		  <div style={{ textAlign: 'center', marginTop: '60px', padding: '60px 20px', backgroundColor: '#1e3a8a', borderRadius: '16px', color: 'white' }}>
			<h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>
			  Únete a nuestra comunidad
			</h2>
			<p style={{ fontSize: '18px', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px', opacity: '0.9' }}>
			  Sé uno de los primeros en experimentar el futuro de la verificación de información. 
			  Únete a ChequeaEsoRD y comienza a analizar la veracidad de artículos con tecnología de IA avanzada.
			</p>
			<div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
			  <Link 
				href="/auth/signup" 
				style={{ 
				  backgroundColor: 'white', 
				  color: '#1e3a8a', 
				  padding: '16px 32px', 
				  borderRadius: '8px', 
				  textDecoration: 'none',
				  fontWeight: '600',
				  fontSize: '16px',
				  display: 'inline-block'
				}}
			  >
				Crear Cuenta Gratis
			  </Link>
			  <Link 
				href="/plans" 
				style={{ 
				  border: '2px solid white', 
				  color: 'white', 
				  padding: '16px 32px', 
				  borderRadius: '8px', 
				  textDecoration: 'none',
				  fontWeight: '600',
				  fontSize: '16px',
				  display: 'inline-block'
				}}
			  >
				Ver Planes
			  </Link>
			</div>
		  </div>
		</div>
	  </div>
	);
  }