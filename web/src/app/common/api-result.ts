
export interface APIResult<T> {
    success: boolean;
    errorMessage: string;
    result: T;
}
