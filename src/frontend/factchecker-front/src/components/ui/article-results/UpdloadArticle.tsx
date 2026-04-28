'use client';

import { useState, useTransition } from 'react';
import { LoadingState } from '../shared';
import { NormalUploadForms } from './forms/NormalUploadForms';
import {
	AnalysisDetails,
	submitFormData,
	SubmitResult,
} from '@/lib/article-results';
import { AnalysisInfoResult } from './AnalysisInfoResult';
import { toast } from 'react-hot-toast';

type Props = {
	onAnalyze: (data: submitFormData) => Promise<SubmitResult>;
};

export const UpdloadArticle = ({ onAnalyze }: Props) => {
	const [isPending, startTransition] = useTransition();
	const [analysisInfoResult, setAnalysisInfoResult] =
		useState<AnalysisDetails | null>(null);

	const handleAnalyze = (data: submitFormData) => {
		startTransition(async () => {
			try {
				const { analysisDetails, message } = await onAnalyze(data);
				if (message) {
					setAnalysisInfoResult(null);
					toast.error(message);
					return;
				}
				setAnalysisInfoResult(analysisDetails);
				toast.success('Artículo enviado correctamente', {
					duration: 5000,
					style: {
						background: '#333',
						color: '#fff',
					},
				});
				const remainingAttempts =
					analysisDetails?.remainingAttempts || 0;
				toast.success(
					`Quedan ${remainingAttempts} intentos para hoy.`,
					{
						duration: 5000,
						icon: '🔔',
						style: {
							background: '#333',
							color: '#fff',
						},
					}
				);
			} catch (error) {
				setAnalysisInfoResult(null);
				toast.error(
					error instanceof Error ? error.message : 'Error desconocido'
				);
				console.error(error);
			}
		});
	};

	return (
		<div>
			<NormalUploadForms
				isAnalyzing={isPending}
				onSubmitForm={handleAnalyze}
			/>

			{/* Loading State */}
			{isPending && <LoadingState />}

			{/* Result */}
			<div className='mt-8'>
				{analysisInfoResult && (
					<AnalysisInfoResult analysisDetails={analysisInfoResult} />
				)}
			</div>
		</div>
	);
};
