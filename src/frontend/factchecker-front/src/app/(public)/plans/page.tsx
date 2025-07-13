export default function PlansPage() {
	const plans = [
		{
		  planId: "1-34KRG2",
		  description: "Plan Gratis",
		  price: "0.00",
		  options: [
			"Iniciar y/o registro de cuenta",
			"Analizar artículos – 10 intentos en total",
			"Historial de Resultados (Últimos 5 artículos)"
		  ]
		},
		{
		  planId: "1-2FWI9E",
		  description: "Plan Personal Básico",
		  price: "5.00",
		  options: [
			"Iniciar y/o registro de cuenta",
			"Analizar artículos – 15 intentos al día",
			"Historial de Resultados (Últimos 25 artículos)"
		  ]
		},
		{
		  planId: "1-AWPZLX",
		  description: "Plan Personal Plus",
		  price: "12.00",
		  options: [
			"Iniciar y/o registro de cuenta",
			"Analizar artículos – 30 intentos al día",
			"Historial de Resultados (Últimos 50 artículos)"
		  ]
		},
		{
		  planId: "1-EYG4PJ",
		  description: "Plan Empresarial",
		  price: "35.00",
		  options: [
			"Iniciar y/o registro de cuenta",
			"Analizar artículos – 75 intentos al día",
			"Historial de Resultados (Últimos 100 artículos)",
			"Acceso a API (Servicios Externos)",
			"Dashboard de Resultados"
		  ]
		}
	  ];
	
	  return (
		<div className="min-h-screen from-gray-50 via-white to-blue-50 p-8">
		  {/* Header */}
		  <div className="text-center mb-16">
			<h1 className="text-5xl font-bold text-gray-900 mb-4">
			  Elige el plan perfecto para ti
			</h1>
		  </div>
	
		  {/* Plans Grid */}
		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
			{plans.map((plan, index) => (
			  <div 
				key={plan.planId}
				className={`relative bg-white rounded-lg border border-gray-200 shadow-sm p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
				  index === 2 ? "ring-1 ring-amber-300 shadow-xl scale-105" : ""
				}`}
			  >
				{/* Recommended Badge */}
				{index === 2 && (
				  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
					Recomendado
				  </div>
				)}
				
				{/* Plan Header */}
				<div className="text-center mb-6">
				  <h3 className="text-xl font-semibold text-gray-900 mb-4">
					{plan.description}
				  </h3>
				  <div className="flex items-baseline justify-center">
					<span className="text-4xl font-bold text-gray-900">
					  ${plan.price}
					</span>
					<span className="text-gray-600 ml-2">
					  {parseFloat(plan.price) > 0 ? "/mes" : ""}
					</span>
				  </div>
				</div>
	
				{/* Features */}
				<div className="mb-6">
				  {plan.options.map((option, optionIndex) => (
					<div key={optionIndex} className="flex items-start gap-3 mb-3">
					  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
					  </div>
					  <span className="text-gray-700 text-sm">
						{option}
					  </span>
					</div>
				  ))}
				</div>
	
				{/* Button */}
				<button 
				  className={`w-full h-11 px-8 rounded-md font-medium transition-all duration-200 ${
					index === 2
					  ? "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-lg"
					  : parseFloat(plan.price) === 0
					  ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
					  : "bg-blue-600 hover:bg-blue-700 text-white"
				  }`}
				>
				  {parseFloat(plan.price) === 0 ? "Comenzar Gratis" : "Seleccionar Plan"}
				</button>
			  </div>
			))}
		  </div>
		</div>
	  );
}
