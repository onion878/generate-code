import App from './App.svelte';
import hotkeys from 'hotkeys-js';

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		theme: reqlib('/service/utils/theme').getTheme()
	}
});

hotkeys('f1', function (event, handler) {
	// Prevent the default refresh event under WINDOWS system
	event.preventDefault()
	alert('you pressed F1!')
});
export default app;