interface IResponse<T> {
  data?: T;
  message: string;
  success: boolean;
  timestamp: Date;
  error?: IError;
}

interface IError {
  errorCode: number;
  errorMessage: string;
  subErrorCode: number;
  subErrorMessage: string;
}
