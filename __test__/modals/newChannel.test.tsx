import { test, expect } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";

import CreateChannelModal from "../../components/sidebar/sidebarChannels/CreateChannelModal";

test("channel name should be rendered", () => {
  render(<CreateChannelModal isOpen={true} setIsOpen={() => {}} />);
  const nameInputEl = screen.getByPlaceholderText(/channel name/i);
  expect(nameInputEl).toBeInTheDocument();
});

test("channel description should be rendered", () => {
  render(<CreateChannelModal isOpen={true} setIsOpen={() => {}} />);
  const descriptionInputEl =
    screen.getByPlaceholderText(/channel description/i);
  expect(descriptionInputEl).toBeInTheDocument();
});

test("channel button should be rendered", () => {
  render(<CreateChannelModal isOpen={true} setIsOpen={() => {}} />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});

test("channel name should be empty", () => {
  render(<CreateChannelModal isOpen={true} setIsOpen={() => {}} />);
  const nameInputEl = screen.getByPlaceholderText(
    /channel name/i
  ) as HTMLInputElement;
  expect(nameInputEl.value).toBe("");
});
test("channel description should be empty", () => {
  render(<CreateChannelModal isOpen={true} setIsOpen={() => {}} />);
  const descriptionInputEl = screen.getByPlaceholderText(
    /channel description/i
  ) as HTMLInputElement;
  expect(descriptionInputEl.value).toBe("");
});

test("button should be disabled", () => {
  render(<CreateChannelModal isOpen={true} setIsOpen={() => {}} />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

test("loading should not be rendered", () => {
  render(<CreateChannelModal isOpen={true} setIsOpen={() => {}} />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/loading.../i);
});

test("channel name input should change", () => {
  render(<CreateChannelModal isOpen={true} setIsOpen={() => {}} />);
  const nameInputEl = screen.getByPlaceholderText(
    /channel name/i
  ) as HTMLInputElement;
  const testValue = "test";

  fireEvent.change(nameInputEl, { target: { value: testValue } });
  expect(nameInputEl.value).toBe(testValue);
  expect(nameInputEl.value.length).toBeLessThanOrEqual(30);
  expect(nameInputEl.value.length).toBeGreaterThanOrEqual(0);
});

test("channel description text area should change", () => {
  render(<CreateChannelModal isOpen={true} setIsOpen={() => {}} />);
  const descriptionTextareEl = screen.getByPlaceholderText(
    /channel description/i
  ) as HTMLTextAreaElement;
  const testValue = "test";

  fireEvent.change(descriptionTextareEl, { target: { value: testValue } });
  expect(descriptionTextareEl.value).toBe(testValue);
  expect(descriptionTextareEl.value.length).toBeLessThanOrEqual(250);
  expect(descriptionTextareEl.value.length).toBeGreaterThanOrEqual(0);
});

test("button should not be disabled when inputs exist", () => {
  render(<CreateChannelModal isOpen={true} setIsOpen={() => {}} />);
  const buttonEl = screen.getByRole("button");
  const nameInputEl = screen.getByPlaceholderText(/channel name/i);
  const descriptionTextareaEl =
    screen.getByPlaceholderText(/channel description/i);

  const testValue = "test";

  fireEvent.change(nameInputEl, { target: { value: testValue } });
  fireEvent.change(descriptionTextareaEl, { target: { value: testValue } });

  expect(buttonEl).not.toBeDisabled();
});
