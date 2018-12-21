
export interface APIResult<T> {
    success: boolean;
    errorMessage: string;
    result: T;
}


export class APIResultWrapper {
    public static wrapSuccessData<T>(data: T): APIResult<T> {
        const wrapper: APIResult<T> = {
            success: true,
            result: data,
            errorMessage: ''
        };

        return wrapper;
    }

    public static wrapErrorMessage<T>(error: string): APIResult<T> {
        const wrapper: APIResult<T> = {
            success: false,
            result: null,
            errorMessage: error,
        };

        return wrapper;
    }
}
