import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '.';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Add more unit test here
test('Testing invalid email input', () => {
  const {getByTestId} = render(<LoginForm />);

  // Simulate user input into email TextField
  const email = "valid@";
  const element = getByTestId("invalid-email");
  fireEvent.change(element, {target: { value: email}});

  // Simulate Sign In button click
  const signInButton = screen.getByText("Sign In");
  fireEvent.click(signInButton);

  // Check that error message appears on page
  const validEmail = screen.getByText("Please enter valid email address");
  expect(validEmail).toBeInTheDocument();
});

test('Testing password less then 8 characters', () => {
  const {getByTestId} = render(<LoginForm />);

  // Simulate user input into password field
  const password = "pass";
  const element = getByTestId("invalid-password");
  fireEvent.change(element, {target: { value: password}});

  // Simulate sign in button click
  const signInButton = screen.getByText("Sign In");
  fireEvent.click(signInButton);

  // Check that error messages appears
  const validPassword = screen.getByText("Password should be 8 or more characters");
  expect(validPassword).toBeInTheDocument();
});

test('Testing password requiring both uppercase and lowercase (All lowercase input)', () => {
  const {getByTestId} = render(<LoginForm />);
  const password = "password";
  const element = getByTestId("invalid-password");
  fireEvent.change(element, {target: { value: password}});
  const signInButton = screen.getByText("Sign In");
  fireEvent.click(signInButton);
  const validPassword = screen.getByText("Password should contain both uppercase and lowercase letters");
  expect(validPassword).toBeInTheDocument();
});

test('Testing password requiring both uppercase and lowercase (All uppercase input)', () => {
  const {getByTestId} = render(<LoginForm />);
  const password = "PASSWORD";
  const element = getByTestId("invalid-password");
  fireEvent.change(element, {target: { value: password}});
  const signInButton = screen.getByText("Sign In");
  fireEvent.click(signInButton);
  const validPassword = screen.getByText("Password should contain both uppercase and lowercase letters");
  expect(validPassword).toBeInTheDocument();
});

test('Testing password requiring a numeric value', () => {
  const {getByTestId} = render(<LoginForm />);
  const password = "Password";
  const element = getByTestId("invalid-password");
  fireEvent.change(element, {target: { value: password}});
  const signInButton = screen.getByText("Sign In");
  fireEvent.click(signInButton);
  const validPassword = screen.getByText("Password should contain atleast one number");
  expect(validPassword).toBeInTheDocument();
});

test('Testing password requiring a special character', () => {
  const {getByTestId} = render(<LoginForm />);
  const password = "Password6";
  const element = getByTestId("invalid-password");
  fireEvent.change(element, {target: { value: password}});
  const signInButton = screen.getByText("Sign In");
  fireEvent.click(signInButton);
  const validPassword = screen.getByText("Password should contain atleast one special character");
  expect(validPassword).toBeInTheDocument();
});