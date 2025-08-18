'use server';

import { cookies } from 'next/headers';

export async function analyzeDemoAction() {
	(
		await // Simulación mínima
		cookies()
	).set('showResults', '1', { path: '/' });
	await delay(3000); // Simula un pequeño retraso para la demostración
}

export async function resetDemoAction() {
	(await cookies()).delete('showResults');
}

function delay(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}
