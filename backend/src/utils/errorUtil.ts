import { ZodError } from "zod";

type ErrorResponse = {
  success: boolean;
  message: string;
  errors?: { path: string, message: string }[]
}

export const getError = (error: unknown): ErrorResponse => {
  let message: ErrorResponse;

  if (error instanceof ZodError) {
    // Si es un error de validación, devolver un mensaje de error personalizado
    message = {
      success: false,
      message: 'Validation error',
      errors: error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    };
  } else if (error instanceof Error) {
    message = {
      success: false,
      message: error.message
    };
  } else if (typeof error === 'object' && 'message' in error!) {
    message = {
      success: false,
      message: String(error.message)
    };
  } else if (typeof error === 'string') {
    message = {
      success: false,
      message: error
    };
  } else {
    message = message = {
      success: false,
      message: 'Something went wrong'
    };
  }

  return message;
}
