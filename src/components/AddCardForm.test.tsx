import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { AddCardForm } from './AddCardForm';

describe('AddCardForm', () => {
  describe('fields', () => {
    it('renders a title input', () => {
      render(<AddCardForm onAdd={vi.fn()} onCancel={vi.fn()} />);
      expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    });

    it('renders a description input', () => {
      render(<AddCardForm onAdd={vi.fn()} onCancel={vi.fn()} />);
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    });

    it('renders a priority selector', () => {
      render(<AddCardForm onAdd={vi.fn()} onCancel={vi.fn()} />);
      expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    });

    it('priority selector has low, medium, and high options', () => {
      render(<AddCardForm onAdd={vi.fn()} onCancel={vi.fn()} />);
      const select = screen.getByLabelText(/priority/i);
      const options = Array.from((select as HTMLSelectElement).options).map((o) => o.value);
      expect(options).toEqual(expect.arrayContaining(['low', 'medium', 'high']));
    });

    it('defaults priority to medium', () => {
      render(<AddCardForm onAdd={vi.fn()} onCancel={vi.fn()} />);
      expect(screen.getByLabelText<HTMLSelectElement>(/priority/i).value).toBe('medium');
    });
  });

  describe('submit', () => {
    it('renders a submit button', () => {
      render(<AddCardForm onAdd={vi.fn()} onCancel={vi.fn()} />);
      expect(screen.getByRole('button', { name: /add card/i })).toBeInTheDocument();
    });

    it('calls onAdd with title and default priority when description is omitted', async () => {
      const onAdd = vi.fn();
      render(<AddCardForm onAdd={onAdd} onCancel={vi.fn()} />);

      await userEvent.type(screen.getByLabelText(/title/i), 'New task');
      await userEvent.click(screen.getByRole('button', { name: /add card/i }));

      expect(onAdd).toHaveBeenCalledOnce();
      expect(onAdd).toHaveBeenCalledWith({
        title: 'New task',
        priority: 'medium',
      });
    });

    it('calls onAdd with description when provided', async () => {
      const onAdd = vi.fn();
      render(<AddCardForm onAdd={onAdd} onCancel={vi.fn()} />);

      await userEvent.type(screen.getByLabelText(/title/i), 'New task');
      await userEvent.type(screen.getByLabelText(/description/i), 'Some detail');
      await userEvent.click(screen.getByRole('button', { name: /add card/i }));

      expect(onAdd).toHaveBeenCalledWith({
        title: 'New task',
        description: 'Some detail',
        priority: 'medium',
      });
    });

    it('calls onAdd with the selected priority', async () => {
      const onAdd = vi.fn();
      render(<AddCardForm onAdd={onAdd} onCancel={vi.fn()} />);

      await userEvent.type(screen.getByLabelText(/title/i), 'Urgent task');
      await userEvent.selectOptions(screen.getByLabelText(/priority/i), 'high');
      await userEvent.click(screen.getByRole('button', { name: /add card/i }));

      expect(onAdd).toHaveBeenCalledWith({
        title: 'Urgent task',
        priority: 'high',
      });
    });

    it('resets the form after a successful submission', async () => {
      render(<AddCardForm onAdd={vi.fn()} onCancel={vi.fn()} />);

      await userEvent.type(screen.getByLabelText(/title/i), 'Temporary task');
      await userEvent.type(screen.getByLabelText(/description/i), 'Details');
      await userEvent.click(screen.getByRole('button', { name: /add card/i }));

      expect(screen.getByLabelText<HTMLInputElement>(/title/i).value).toBe('');
      expect(screen.getByLabelText<HTMLTextAreaElement>(/description/i).value).toBe('');
      expect(screen.getByLabelText<HTMLSelectElement>(/priority/i).value).toBe('medium');
    });
  });

  describe('validation', () => {
    it('does not call onAdd when title is empty', async () => {
      const onAdd = vi.fn();
      render(<AddCardForm onAdd={onAdd} onCancel={vi.fn()} />);

      await userEvent.click(screen.getByRole('button', { name: /add card/i }));

      expect(onAdd).not.toHaveBeenCalled();
    });

    it('shows a validation message when title is empty and form is submitted', async () => {
      render(<AddCardForm onAdd={vi.fn()} onCancel={vi.fn()} />);

      await userEvent.click(screen.getByRole('button', { name: /add card/i }));

      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });

    it('clears the validation message once a title is entered', async () => {
      render(<AddCardForm onAdd={vi.fn()} onCancel={vi.fn()} />);

      await userEvent.click(screen.getByRole('button', { name: /add card/i }));
      await userEvent.type(screen.getByLabelText(/title/i), 'Fixed');

      expect(screen.queryByText(/title is required/i)).not.toBeInTheDocument();
    });
  });

  describe('cancel', () => {
    it('renders a cancel button', () => {
      render(<AddCardForm onAdd={vi.fn()} onCancel={vi.fn()} />);
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('calls onCancel when the cancel button is clicked', async () => {
      const onCancel = vi.fn();
      render(<AddCardForm onAdd={vi.fn()} onCancel={onCancel} />);

      await userEvent.click(screen.getByRole('button', { name: /cancel/i }));

      expect(onCancel).toHaveBeenCalledOnce();
    });
  });
});
