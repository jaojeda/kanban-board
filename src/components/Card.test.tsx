import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Card } from './Card';
import type { Card as CardType } from '../types';

const baseCard: CardType = {
  id: 'card-1',
  title: 'Write unit tests',
  priority: 'medium',
  createdAt: 0,
};

describe('Card', () => {
  describe('title', () => {
    it('renders the card title', () => {
      render(<Card card={baseCard} columnId="todo" />);
      expect(screen.getByText('Write unit tests')).toBeInTheDocument();
    });
  });

  describe('description', () => {
    it('renders description when provided', () => {
      const card = { ...baseCard, description: 'Cover all edge cases' };
      render(<Card card={card} columnId="todo" />);
      expect(screen.getByText('Cover all edge cases')).toBeInTheDocument();
    });

    it('renders nothing for description when omitted', () => {
      render(<Card card={baseCard} columnId="todo" />);
      expect(screen.queryByTestId('card-description')).not.toBeInTheDocument();
    });
  });

  describe('priority badge', () => {
    it('displays "low" priority', () => {
      render(<Card card={{ ...baseCard, priority: 'low' }} columnId="todo" />);
      expect(screen.getByText('low')).toBeInTheDocument();
    });

    it('displays "medium" priority', () => {
      render(<Card card={baseCard} columnId="todo" />);
      expect(screen.getByText('medium')).toBeInTheDocument();
    });

    it('displays "high" priority', () => {
      render(<Card card={{ ...baseCard, priority: 'high' }} columnId="todo" />);
      expect(screen.getByText('high')).toBeInTheDocument();
    });
  });

  describe('move buttons', () => {
    it('shows both move-left and move-right buttons', () => {
      render(<Card card={baseCard} columnId="in-progress" />);
      expect(screen.getByRole('button', { name: /move left/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /move right/i })).toBeInTheDocument();
    });

    it('hides the move-left button when card is in the first column', () => {
      render(<Card card={baseCard} columnId="todo" />);
      expect(screen.queryByRole('button', { name: /move left/i })).not.toBeInTheDocument();
    });

    it('hides the move-right button when card is in the last column', () => {
      render(<Card card={baseCard} columnId="done" />);
      expect(screen.queryByRole('button', { name: /move right/i })).not.toBeInTheDocument();
    });

    it('calls onMoveLeft when the move-left button is clicked', async () => {
      const onMoveLeft = vi.fn();
      render(<Card card={baseCard} columnId="in-progress" onMoveLeft={onMoveLeft} />);
      screen.getByRole('button', { name: /move left/i }).click();
      expect(onMoveLeft).toHaveBeenCalledOnce();
    });

    it('calls onMoveRight when the move-right button is clicked', async () => {
      const onMoveRight = vi.fn();
      render(<Card card={baseCard} columnId="in-progress" onMoveRight={onMoveRight} />);
      screen.getByRole('button', { name: /move right/i }).click();
      expect(onMoveRight).toHaveBeenCalledOnce();
    });
  });

  describe('delete button', () => {
    it('renders a delete button', () => {
      render(<Card card={baseCard} columnId="todo" />);
      expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
    });

    it('calls onDelete when the delete button is clicked', () => {
      const onDelete = vi.fn();
      render(<Card card={baseCard} columnId="todo" onDelete={onDelete} />);
      screen.getByRole('button', { name: /delete/i }).click();
      expect(onDelete).toHaveBeenCalledOnce();
    });
  });
});
