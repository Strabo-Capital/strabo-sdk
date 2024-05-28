export type ICommunicationService = {
	post: <TBody, TResponse>(path: string, data: TBody) => Promise<IData<TResponse>>;
};

export type IHttpHandler = {
	post: <TBody>(path: string, data: TBody) => Promise<any>;
}

type IData<TResult> = {
	result: TResult;
	errors: Array<string | object>
}

type IResponse<TRes> = {
	data: TRes;
	status?: number;
	statusText?: string;
}

export default class CommunicationService<THttpHandler extends IHttpHandler> implements ICommunicationService {
	constructor(private _httpHandler: THttpHandler) {
	}

	async post<TBody, TResponse>(path: string, body: TBody) {
		return this._httpHandler.post(path, body)
			.then((response: IResponse<TResponse>) => this._handleResult(response))
			.catch((e: Error) => (this._handleResult({
				data: {
					result: null,
					errors: [e.message]
				}
			} as IResponse<TResponse>)));
	}


	private _handleResult<TData>(response: IResponse<TData>) {
		return response.data as IData<TData>;
	}
}




