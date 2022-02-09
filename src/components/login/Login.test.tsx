import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('renders Login component with the words login', () => {
  render(<Login />);
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
test('There should be an input field with a placeholder text of Phone #, username, or email', () => {
  render(<Login />);
  const inputPlaceholder = screen.getByPlaceholderText(
    /phone #, username, or email/i
  );
  expect(inputPlaceholder).toBeInTheDocument();
});

const setup = () => {
  const utils = render(<Login />);
  const input = utils.getByPlaceholderText(
    /phone #, username, or email/i
  ) as HTMLInputElement;
  return {
    input,
    ...utils,
  };
};

test('User should be able to type into the username input field', () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: 'Reilly' } });
  expect(input.value).toBe('Reilly');
});

test('Next button should be present', () => {
  render(<Login />);
  const nextButton = screen.getByText(/Next/i);
  expect(nextButton).toBeInTheDocument();
});

// This is an implementation detail which goes against the spirit of React-testing-library.

// Instead we can test for a certain component on the UI to be visible onClick and simulate that.

test('Next button should be unclickable until the username/password/email field is valid (at least 5 characters long)', () => {
  render(<Login />);
  const nextButton = screen.getByRole('button');
  userEvent.click(nextButton);
  expect(nextButton).toHaveBeenCalled();
});

test('User should be able to type into the password input field', () => {
  render(<Login />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Valid phone number should format to correct format', () => {
  render(<Login />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Form should submit on submit click', () => {
  render(<Login />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Clicking on Signup should render signup component', () => {
  render(<Login />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
