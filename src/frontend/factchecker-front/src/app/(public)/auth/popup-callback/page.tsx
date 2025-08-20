'use client';
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';

export default function PopupCallback() {
	useEffect(() => {
		(async () => {
			const session = await getSession();
			window.opener.postMessage(
				{ type: 'oauth:google', user: session?.user },
				window.location.origin
			);
			window.close();
		})();
	}, []);

	return <p>Autenticando...</p>;
}
