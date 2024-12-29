import { enqueueSnackbar } from "notistack";

export class ErrorNotifierService {
  private static instance: ErrorNotifierService;

  private constructor() {}

  public static getInstance(): ErrorNotifierService {
    if (!ErrorNotifierService.instance) {
      ErrorNotifierService.instance = new ErrorNotifierService();
    }
    return ErrorNotifierService.instance;
  }

  public notifyError(error: Error): void {
    if(!error) {
      return;
    }
    enqueueSnackbar(error.message, {
      variant: "error",
      autoHideDuration: 3000,
    });
  }
}