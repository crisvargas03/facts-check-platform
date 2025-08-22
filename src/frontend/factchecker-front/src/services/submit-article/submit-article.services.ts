import { submitFormData } from '@/lib/article-results';

export const PostArticle = async (articleData: submitFormData) => {
	const response = await fetch('/api/articles', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(articleData),
	});

	if (!response.ok) {
		throw new Error('Error submitting article');
	}

	return response.json();
};
