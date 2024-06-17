import { act, fireEvent, render, screen } from '@testing-library/react';

import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import FormBox, { formInitalValues } from './FormBox';
import { FORM_LOCAL_STORAGE_KEY } from './FormBox';

beforeEach(() => {
  localStorage.clear();
});
const renderWithRouter = async (ui: ReactElement, { route = '/' } = {}) => {
  await act(() =>
    render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>),
  );
};

describe('FormBox', () => {
  describe('Routing renders the correct step based on pathname', () => {
    test('for /personal-info', async () => {
      await renderWithRouter(<FormBox />, { route: '/personal-info' });
      expect(screen.getByText('Personal info')).toBeInTheDocument();
    });

    test('for /select-plan', async () => {
      await renderWithRouter(<FormBox />, { route: '/select-plan' });
      expect(screen.getByText('Select your plan')).toBeInTheDocument();
    });

    test('for /add-ons', async () => {
      await renderWithRouter(<FormBox />, { route: '/add-ons' });
      expect(screen.getByText('Pick add-ons')).toBeInTheDocument();
    });

    test('for /summary', async () => {
      await renderWithRouter(<FormBox />, { route: '/summary' });
      expect(screen.getByText('Finishing up')).toBeInTheDocument();
    });
  });

  describe('Initialization', () => {
    describe('when localStorage is empty', () => {
      test('personal-info', () => {
        renderWithRouter(<FormBox />, { route: '/personal-info' });
        expect(
          (screen.getByPlaceholderText('e.g. Stephen King') as HTMLInputElement)
            .value,
        ).toBe('');

        expect(
          (
            screen.getByPlaceholderText(
              'e.g. stephenking@lorem.com',
            ) as HTMLInputElement
          ).value,
        ).toBe('');

        expect(
          (
            screen.getByPlaceholderText(
              'e.g. +1 234 567 890',
            ) as HTMLInputElement
          ).value,
        ).toBe('');
      });

      test('select plan', () => {
        renderWithRouter(<FormBox />, { route: '/select-plan' });
        expect(screen.getByTestId('Arcade')).toBeChecked();
      });

      test('add ons', () => {
        renderWithRouter(<FormBox />, { route: '/add-ons' });
        expect(screen.getByTestId('Online service')).toBeChecked();
        expect(screen.getByTestId('Larger storage')).toBeChecked();
      });
    });

    describe('when localStorage exist', () => {
      const savedValues = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 123 456 789',
        isYearlyBilled: true,
        plan: 'Advanced',
        addOns: ['Online service'],
      };

      test('personal-info', () => {
        localStorage.setItem(
          FORM_LOCAL_STORAGE_KEY,
          JSON.stringify(savedValues),
        );
        renderWithRouter(<FormBox />, { route: '/personal-info' });
        expect(
          (screen.getByPlaceholderText('e.g. Stephen King') as HTMLInputElement)
            .value,
        ).toBe('John Doe');
        expect(
          (
            screen.getByPlaceholderText(
              'e.g. stephenking@lorem.com',
            ) as HTMLInputElement
          ).value,
        ).toBe('john@example.com');

        expect(
          (
            screen.getByPlaceholderText(
              'e.g. +1 234 567 890',
            ) as HTMLInputElement
          ).value,
        ).toBe('+1 123 456 789');
      });

      test('select plan', () => {
        localStorage.setItem(
          FORM_LOCAL_STORAGE_KEY,
          JSON.stringify(savedValues),
        );
        renderWithRouter(<FormBox />, { route: '/select-plan' });
        expect(screen.getByTestId('Advanced')).toBeChecked();
      });

      test('add ons', () => {
        localStorage.setItem(
          FORM_LOCAL_STORAGE_KEY,
          JSON.stringify(savedValues),
        );
        renderWithRouter(<FormBox />, { route: '/add-ons' });
        expect(screen.getByTestId('Online service')).toBeChecked();
      });
    });
  });

  describe('State Persistance', () => {
    test('update localStorage on input change', () => {
      renderWithRouter(<FormBox />, { route: '/personal-info' });
      const nameInput = screen.getByPlaceholderText('e.g. Stephen King');
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      const savedValues = JSON.parse(
        localStorage.getItem(FORM_LOCAL_STORAGE_KEY) || '',
      );
      expect(savedValues.name).toBe('John Doe');
    });
  });

  describe('handles submission correctly', () => {
    test('clear localStorage', async () => {
      const savedValues = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 123 456 789',
        isYearlyBilled: true,
        plan: 'Advanced',
        addOns: ['Online service'],
      };
      localStorage.setItem(FORM_LOCAL_STORAGE_KEY, JSON.stringify(savedValues));

      renderWithRouter(<FormBox />, { route: '/summary' });
      const submitButton = screen.getByText('Confirm');
      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(
        JSON.parse(localStorage.getItem(FORM_LOCAL_STORAGE_KEY) || ''),
      ).toStrictEqual(formInitalValues);
    });
    test('display thank you window', async () => {
      const savedValues = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 123 456 789',
        isYearlyBilled: true,
        plan: 'Advanced',
        addOns: ['Online service'],
      };
      localStorage.setItem(FORM_LOCAL_STORAGE_KEY, JSON.stringify(savedValues));

      renderWithRouter(<FormBox />, { route: '/summary' });
      const submitButton = screen.getByText('Confirm');
      await act(async () => {
        fireEvent.click(submitButton);
      });
      renderWithRouter(<FormBox />, { route: '/summary' });

      expect(screen.getByText('Thank you!')).toBeInTheDocument();
    });
  });
});
