import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import LoginForm from "@/components/login/LoginForm"; // Ajusta la ruta según tu estructura de proyecto.
import useAuth from "@/application/hooks/useAuth";
import { useLoader } from "@/application/context/LoaderContext";

jest.mock("@/application/hooks/useAuth");
jest.mock("@/application/context/LoaderContext", () => ({
  useLoader: jest.fn(),
}));

jest.mock("@/components/input/TextInput", () => (props: any) => (
  <input
    type={props.type}
    placeholder={props.placeholder}
    value={props.value}
    onChange={(e) => props.onChange(e.target.value)}
    data-testid={props.testId}
  />
));

jest.mock("@/components/input/PasswordInput", () => (props: any) => (
  <input
    type="password"
    placeholder={props.placeholder}
    value={props.value}
    onChange={(e) => props.onChange(e.target.value)}
    data-testid={props.testId}
  />
));

describe("LoginForm", () => {
  let loginMock: jest.Mock;
  let showLoaderMock: jest.Mock;
  let hideLoaderMock: jest.Mock;

  beforeEach(() => {
    loginMock = jest.fn();
    showLoaderMock = jest.fn();
    hideLoaderMock = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({ login: loginMock });
    (useLoader as jest.Mock).mockReturnValue({
      showLoader: showLoaderMock,
      hideLoader: hideLoaderMock,
    });
  });

  it("renders the form inputs and button", async () => {
    render(<LoginForm />);

    await waitFor(() => {
        expect(screen.getByTestId("email")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Ingresar/i })).toBeInTheDocument();
    });
  });

  it("calls login function with correct data when submitted", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByRole("button", { name: /Ingresar/i });

    act(() => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(showLoaderMock).toHaveBeenCalled();
      expect(loginMock).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(hideLoaderMock).toHaveBeenCalled();
    });
  });

  it("shows an error message when login fails", async () => {
    const errorMessage = "Invalid login credentials";
    loginMock.mockRejectedValueOnce(new Error(errorMessage));

    render(<LoginForm />);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByRole("button", { name: /Ingresar/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(hideLoaderMock).toHaveBeenCalled();
    });
  });

  it("hides the loader even if an unknown error occurs", async () => {
    loginMock.mockRejectedValueOnce("Unknown error");

    render(<LoginForm />);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByRole("button", { name: /Ingresar/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Un error desconocido ocurrió")).toBeInTheDocument();
      expect(hideLoaderMock).toHaveBeenCalled();
    });
  });
});
