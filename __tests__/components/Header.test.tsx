import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/Header';
import useAuth from '@/application/hooks/useAuth';

jest.mock('@/application/hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Header Component', () => {
  let logoutMock: jest.Mock;

  beforeEach(() => {
    logoutMock = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ logout: logoutMock });
    localStorage.clear();
  });

  it('should display the username if it exists in localStorage', () => {
    localStorage.setItem('userName', 'John Doe');
    render(<Header />);

    expect(screen.getByText(/Bienvenid@/i)).toBeInTheDocument();
    expect(screen.getByText(/Salir/i)).toBeInTheDocument();
  });

  it('should not render anything if no username exists in localStorage', () => {
    render(<Header />);

    expect(screen.queryByText(/Bienvenid@/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Salir/i)).not.toBeInTheDocument();
  });

  it('should call logout when the "Salir" button is clicked', async () => {
    localStorage.setItem('userName', 'John Doe');
    render(<Header />);

    const logoutButton = screen.getByText(/Salir/i);
    fireEvent.click(logoutButton);

    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
