import { test, expect, describe } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";

import SidebarChannel from "../../components/sidebar/SidebarChannels";

describe("channel sidebar", () => {

  test("title should be rendered", () => {
    render(<SidebarChannel isOpen={true} setIsOpen={() => {}} />);
    const titleEl = screen.getByRole('heading', { name: "Channels" });
    expect(titleEl).toBeInTheDocument();
  });

  test("add channel button should be rendered", () => {
    render(<SidebarChannel isOpen={true} setIsOpen={() => {}} />);
    const addChannelButtonEl = screen.getByTestId('add-channel');
    expect(addChannelButtonEl).toBeInTheDocument();
  });

  test("search input should be rendered", () => {
    render(<SidebarChannel isOpen={true} setIsOpen={() => {}} />);
    const searchInputEl = screen.getByPlaceholderText(/search/i);
    expect(searchInputEl).toBeInTheDocument();
  });
});
