'use client';

import { useState, useTransition } from 'react';
import { LoadingState } from '../shared';
import { NormalUploadForms } from './forms/NormalUploadForms';
import { AnalysisDetails, submitFormData } from '@/lib/article-results';
import { BaseServicesResponse } from '@/lib/base';
import { AnalysisInfoResult } from './AnalysisInfoResult';

type Props = {
	onAnalyze: (
		data: submitFormData
	) => Promise<BaseServicesResponse<AnalysisDetails>>;
};

export const UpdloadArticle = ({ onAnalyze }: Props) => {
	const [isPending, startTransition] = useTransition();
	const [analysisInfoResult, setAnalysisInfoResult] =
		useState<AnalysisDetails | null>(null);

	const handleAnalyze = (data: submitFormData) => {
		if (isPending) return;
		setAnalysisInfoResult(null);
		startTransition(async () => {
			const result = await onAnalyze(data);
			setAnalysisInfoResult(result.data);
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
