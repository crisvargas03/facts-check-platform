import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { LoginPage } from '../features/auth';
import { ArticleHomePage } from '../features/article';

export function AppRouter() {
	const [status] = useState('not-authenticated');

	if (status === 'checking') {
		return <h3>Loading...</h3>;
	}
	return (
		<Routes>
			{status === 'not-authenticated' ? (
				<>
					<Route path='/auth/*' element={<LoginPage />} />
					<Route path='/*' element={<Navigate to='/auth/login' />} />
				</>
			) : (
				<>
					<Route path='/' element={<ArticleHomePage />} />
					<Route path='/*' element={<Navigate to='/' />} />
				</>
			)}
			<Route />
		</Routes>
	);
}
