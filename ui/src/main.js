import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		theme: reqlib('/service/utils/theme').getTheme()
	}
});

export default app;