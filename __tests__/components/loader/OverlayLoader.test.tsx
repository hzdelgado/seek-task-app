import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { useLoader } from "@/application/context/LoaderContext";
import OverlayLoader from "@/components/loader/OverlayLoader";

jest.mock("@/application/context/LoaderContext");

describe("OverlayLoader", () => {
  const mockUseLoader = useLoader as jest.Mock;

  it("renders the loader when 'loading' is true", () => {
    mockUseLoader.mockReturnValue({ loading: true }); 

    render(
        <OverlayLoader />
    );

    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument(); 
  });

  it("does not render the loader when 'loading' is false", () => {
    mockUseLoader.mockReturnValue({ loading: false }); 

    render(
        <OverlayLoader />
    );

    const loaderElement = screen.queryByTestId("loader");
    expect(loaderElement).not.toBeInTheDocument(); 
  });

  it("applies the correct styles and animation when loading is true", () => {
    mockUseLoader.mockReturnValue({ loading: true });

    render(
        <OverlayLoader />
    );

    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toHaveClass("animate-spin");
    expect(loaderElement).toHaveClass("w-16 h-16");
  });
});
