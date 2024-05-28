import CommunicationService, { ICommunicationService } from './communication.service.ts';
import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

type ISDKConfig = {
	env: IEnvironmentUrl | string;
	authToken?: string;
}

type IEnvironmentUrl = keyof typeof ENVIRONMENT_URLS;

type IRegisterUserBody = {
	firstName?: string;
	lastName?: string;
	email?: string;
	ipAddress?: string;
	longitude?: number;
	latitude?: number;
}

const ENVIRONMENT_URLS = {
	prod: 'https://api.v2.prod.strabo.app',
	dev: 'https://api.v2.dev.strabo.app',
} as const;

export function create(config: ISDKConfig) {
	let baseURL = '';

	if (ENVIRONMENT_URLS[config.env as IEnvironmentUrl]) {
		baseURL = ENVIRONMENT_URLS[config.env as IEnvironmentUrl];
	}

	if (!baseURL.length) {
		baseURL = `https://${config.env}.api.dev.strabo.app`
	}

	const adapter = Axios.create({
		baseURL,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': config.authToken,
		},
	});

	const axios = setupCache(adapter);
	const communicationService = new CommunicationService(axios);
	const analyticsHandlers = createAnalyticsHandlers(communicationService);

	return {
		setToken: (token: string) => {
			axios.defaults.headers['Authorization'] = token;
		},
		analytics: analyticsHandlers,
	}
}

function createAnalyticsHandlers(comms: ICommunicationService) {
	return {
		async registerUser(registerUserBody: IRegisterUserBody) {
			return comms.post('/analytics/identify', registerUserBody);
		},
		async track<TData>(eventName: string, eventData: TData) {
			console.log('track', eventName, eventData);
			return comms.post('/analytics/track', {
				eventName: eventName,
				eventData: eventData,
			});
		}
	}
}





