import BaseButton from '@/components/button/BaseButton';
import { render, screen, fireEvent } from '@testing-library/react';

describe('BaseButton Component', () => {
  it('should render the button with the correct text', () => {
    render(<BaseButton onClick={() => {}}>Click me</BaseButton>);

    expect(screen.getByRole('button', { name: /Click me/i })).toBeInTheDocument();
  });

  it('should call onClick when the button is clicked', () => {
    const handleClick = jest.fn();
    render(<BaseButton onClick={handleClick}>Click me</BaseButton>);

    const button = screen.getByRole('button', { name: /Click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have the correct classes when isOutline is true', () => {
    render(
      <BaseButton onClick={() => {}} isOutline>
        Outline Button
      </BaseButton>
    );

    const button = screen.getByRole('button', { name: /Outline Button/i });
    expect(button).toHaveClass('bg-transparent text-indigo-700 hover:text-white border border-blue-500');
  });

  it('should have the correct classes when isOutline is false', () => {
    render(
      <BaseButton onClick={() => {}}>
        Regular Button
      </BaseButton>
    );

    const button = screen.getByRole('button', { name: /Regular Button/i });
    expect(button).toHaveClass('bg-indigo-600 text-white');
  });
});
