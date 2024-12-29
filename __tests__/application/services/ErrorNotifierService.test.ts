import { ErrorNotifierService } from "@/application/services/ErrorNotifierService";
import { enqueueSnackbar } from "notistack";

jest.mock("notistack", () => ({
  enqueueSnackbar: jest.fn(),
}));

describe("ErrorNotifierService", () => {
  let errorNotifierService: ErrorNotifierService;

  beforeEach(() => {
    jest.clearAllMocks();
    errorNotifierService = ErrorNotifierService.getInstance();
  });

  it("should call enqueueSnackbar with the error message when notifyError is called", () => {
    const errorMessage = "Test error message";
    const error = new Error(errorMessage);

    errorNotifierService.notifyError(error);

    expect(enqueueSnackbar).toHaveBeenCalledWith(errorMessage, {
      variant: "error",
      autoHideDuration: 3000,
    });
  });

  it("should not call enqueueSnackbar if no error is passed", () => {
    errorNotifierService.notifyError(null as any);

    expect(enqueueSnackbar).not.toHaveBeenCalled();
  });

  it("should be a singleton", () => {
    const anotherInstance = ErrorNotifierService.getInstance();
    
    expect(errorNotifierService).toBe(anotherInstance);
  });
});
