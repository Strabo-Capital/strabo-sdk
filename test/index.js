import { create } from '../dist/index.js';
import Axios from 'axios';

const axios = Axios.create({
	baseURL: 'https://api.v2.dev.strabo.app',
});

const sdk = create({
	env: 'dev'
});

const analytics = sdk.analytics;

console.log('Running test', analytics);

// analytics.registerUser({
// 	email: 'lukerbab+aed@gmail.com',
// 	firstName: 'Luke',
// 	lastName: 'B',
// 	ipAddress: '127.0.0.1'
// })
// 	.then((res) => {
// 		console.log('Test passed', res);
// 	})
// 	.catch((err) => {
// 		console.log('Test failed', err);
// 	});

analytics.track('fake_event', {
	propA: 'valueA',
})
	.then((res) => {
		console.log('Test passed', res);
	})
