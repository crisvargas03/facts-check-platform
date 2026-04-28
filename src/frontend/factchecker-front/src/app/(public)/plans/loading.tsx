export default function Loading() {
	return (
		<div className='from-gray-50 via-white to-blue-50 p-8'>
			<div className='text-center mb-16'>
				<h1 className='text-4xl font-bold text-gray-900 mb-4'>
					Elige el plan perfecto para ti
				</h1>
			</div>

			{/* Loading Skeleton */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto'>
				{[...Array(4)].map((_, index) => (
					<div
						key={index}
						className='relative bg-white rounded-lg border border-gray-200 shadow-sm p-6 animate-pulse'>
						{/* Skeleton Header */}
						<div className='text-center mb-6'>
							<div className='h-6 bg-gray-200 rounded mb-4'></div>
							<div className='h-10 bg-gray-200 rounded mb-2'></div>
							<div className='h-4 bg-gray-200 rounded w-20 mx-auto'></div>
						</div>

						{/* Skeleton Features */}
						<div className='mb-6'>
							{[...Array(3)].map((_, featureIndex) => (
								<div
									key={featureIndex}
									className='flex items-start gap-3 mb-3'>
									<div className='w-5 h-5 bg-gray-200 rounded-full flex-shrink-0'></div>
									<div className='h-4 bg-gray-200 rounded flex-1'></div>
								</div>
							))}
						</div>

						{/* Skeleton Button */}
						<div className='h-11 bg-gray-200 rounded'></div>
					</div>
				))}
			</div>
		</div>
	);
}
