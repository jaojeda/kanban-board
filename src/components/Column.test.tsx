import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Column } from './Column';
import type { Column as ColumnType } from '../types';

const todoColumn: ColumnType = {
  id: 'todo',
  label: 'To Do',
  cardIds: [],
};

describe('Column', () => {
  describe('default state', () => {
    it('renders the column label', () => {
      render(<Column column={todoColumn} onAddCard={vi.fn()} />);
      expect(screen.getByText('To Do')).toBeInTheDocument();
    });

    it('shows the "+ Add card" button by default', () => {
      render(<Column column={todoColumn} onAddCard={vi.fn()} />);
      expect(screen.getByRole('button', { name: /add card/i })).toBeInTheDocument();
    });

    it('does not show the form by default', () => {
      render(<Column column={todoColumn} onAddCard={vi.fn()} />);
      expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument();
    });
  });

  describe('opening the form', () => {
    it('shows the form when the "+ Add card" button is clicked', async () => {
      render(<Column column={todoColumn} onAddCard={vi.fn()} />);
      await userEvent.click(screen.getByRole('button', { name: /add card/i }));
      expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    });

    it('hides the "+ Add card" button while the form is open', async () => {
      render(<Column column={todoColumn} onAddCard={vi.fn()} />);
      await userEvent.click(screen.getByRole('button', { name: /\+ add card/i }));
      expect(screen.queryByRole('button', { name: /\+ add card/i })).not.toBeInTheDocument();
    });
  });

  describe('submitting the form', () => {
    it('calls onAddCard with the submitted card fields', async () => {
      const onAddCard = vi.fn();
      render(<Column column={todoColumn} onAddCard={onAddCard} />);

      await userEvent.click(screen.getByRole('button', { name: /add card/i }));
      await userEvent.type(screen.getByLabelText(/title/i), 'New task');
      await userEvent.click(screen.getByRole('button', { name: /add card/i }));

      expect(onAddCard).toHaveBeenCalledOnce();
      expect(onAddCard).toHaveBeenCalledWith({
        title: 'New task',
        priority: 'medium',
      });
    });

    it('hides the form after submission', async () => {
      render(<Column column={todoColumn} onAddCard={vi.fn()} />);

      await userEvent.click(screen.getByRole('button', { name: /add card/i }));
      await userEvent.type(screen.getByLabelText(/title/i), 'New task');
      await userEvent.click(screen.getByRole('button', { name: /add card/i }));

      expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument();
    });

    it('shows the "+ Add card" button again after submission', async () => {
      render(<Column column={todoColumn} onAddCard={vi.fn()} />);

      await userEvent.click(screen.getByRole('button', { name: /add card/i }));
      await userEvent.type(screen.getByLabelText(/title/i), 'New task');
      await userEvent.click(screen.getByRole('button', { name: /add card/i }));

      expect(screen.getByRole('button', { name: /\+ add card/i })).toBeInTheDocument();
    });
  });

  describe('cancelling the form', () => {
    it('hides the form when cancel is clicked', async () => {
      render(<Column column={todoColumn} onAddCard={vi.fn()} />);

      await userEvent.click(screen.getByRole('button', { name: /add card/i }));
      await userEvent.click(screen.getByRole('button', { name: /cancel/i }));

      expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument();
    });

    it('shows the "+ Add card" button again after cancel', async () => {
      render(<Column column={todoColumn} onAddCard={vi.fn()} />);

      await userEvent.click(screen.getByRole('button', { name: /add card/i }));
      await userEvent.click(screen.getByRole('button', { name: /cancel/i }));

      expect(screen.getByRole('button', { name: /\+ add card/i })).toBeInTheDocument();
    });

    it('does not call onAddCard when cancel is clicked', async () => {
      const onAddCard = vi.fn();
      render(<Column column={todoColumn} onAddCard={onAddCard} />);

      await userEvent.click(screen.getByRole('button', { name: /add card/i }));
      await userEvent.click(screen.getByRole('button', { name: /cancel/i }));

      expect(onAddCard).not.toHaveBeenCalled();
    });
  });
});
