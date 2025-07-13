// Data is a generic type that can be replaced with any type when using the BaseServicesResponse interface.
export interface BaseServicesResponse<Data> {
	statusCode: number;
	message: null;
	isSuccess: boolean;
	errors: string[];
	data: Data;
}
