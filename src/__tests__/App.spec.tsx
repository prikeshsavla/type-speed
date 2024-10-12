import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
jest.mock("../lib/phraseGenerator", () => () => "abc def g");

describe('App Component', () => {
  test('renders the generated phrase', () => {
    render(<App />);
    expect(screen.getByText("abc def g")).toBeInTheDocument();
  });

  test('renders allows text input', () => {
    render(<App />);
    const input = screen.getByTestId("input")
    fireEvent.change(
      input,
      { target: { value: "abc" } },
    )
    expect(input.textContent).toBe("abc");
  });

  test('set color to lightgreen for valid text input', () => {
    render(<App />);
    const input = screen.getByTestId("input")
    fireEvent.change(
      input,
      { target: { value: "abc" } },
    )
    expect(input.style.backgroundColor).toBe("lightgreen");
  });

  test('set color to orange for invalid text input', () => {
    render(<App />);
    const input = screen.getByTestId("input")
    fireEvent.change(
      input,
      { target: { value: "abcd" } },
    )
    expect(input.style.backgroundColor).toBe("orange");
  });

  test('shows character and word count for valid input', () => {
    render(<App />);
    const input = screen.getByTestId("input")
    fireEvent.change(
      input,
      { target: { value: "abc" } },
    )
    fireEvent.change(
      input,
      { target: { value: "abcd" } },
    )
    expect(screen.getByTestId('user-char-count').textContent).toContain("3 / 9");
    expect(screen.getByTestId('user-word-count').textContent).toContain("1 / 3");
  });

  test('clears input and triggers a new phrase if an entry is complete', async () => {
    render(<App />);
    const input = screen.getByTestId("input")
    fireEvent.change(
      input,
      { target: { value: "abc def g" } },
    )
    expect(input.textContent).toBe("");
  });

  
})