import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

export type ApiError = {
  message: string;
  code?: string;
  status: number;
};

export function handleError(error: unknown): ApiError {
  if (error instanceof PrismaClientKnownRequestError) {
    return {
      message: 'Database operation failed',
      code: error.code,
      status: 400,
    };
  }

  if (error instanceof PrismaClientValidationError) {
    return {
      message: 'Invalid data provided',
      status: 400,
    };
  }

  console.error('Unexpected error:', error);
  return {
    message: 'Internal Server Error',
    status: 500,
  };
}
