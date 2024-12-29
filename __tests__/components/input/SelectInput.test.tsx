import SelectInput from '@/components/input/SelectInput';
import { render, screen, fireEvent } from '@testing-library/react';

describe('SelectInput Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('should render the label if provided', () => {
    render(
      <SelectInput
        label="Select Label"
        testId="select-input"
        options={options}
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByText(/Select Label/i)).toBeInTheDocument();
  });

  it('should render all options including the placeholder', () => {
    render(
      <SelectInput
        testId="select-input"
        options={options}
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByRole('option', { name: /Selecciona una opción/i })).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByRole('option', { name: option.label })).toBeInTheDocument();
    });
  });

  it('should call onChange with the selected value when an option is selected', () => {
    const handleChange = jest.fn();
    render(
      <SelectInput
        testId="select-input"
        options={options}
        value=""
        onChange={handleChange}
      />
    );

    const select = screen.getByTestId('select-input');
    fireEvent.change(select, { target: { value: 'option2' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  it('should display the correct selected value', () => {
    render(
      <SelectInput
        testId="select-input"
        options={options}
        value="option3"
        onChange={() => {}}
      />
    );

    const select = screen.getByTestId('select-input') as HTMLSelectElement;
    expect(select.value).toBe('option3');
  });

  it('should not render a label if none is provided', () => {
    render(
      <SelectInput
        testId="select-input"
        options={options}
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.queryByLabelText(/Select Label/i)).not.toBeInTheDocument();
  });
});
