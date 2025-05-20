import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';

export function App() {
	return (
		<BrowserRouter
			future={{
				v7_startTransition: true,
				v7_relativeSplatPath: true,
			}}>
			<AppRouter />
		</BrowserRouter>
	);
}
