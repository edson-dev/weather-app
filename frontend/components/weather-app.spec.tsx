import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {userEvent} from '@testing-library/user-event';

import Page from '../app/page'
import * as React from 'react'

describe('Weather APP', () => {
  it('renders component', () => {
    render(<Page />)
    expect(screen.getByText('Weather App')).toBeDefined()
    //screen.debug(); // prints out the jsx in the App component unto the command line
  })

  it('Login Button', () => {
    render(<Page />)
    expect(screen.getByRole('username')).toBeDefined()
    expect(screen.getByRole('password')).toBeDefined()
    expect(screen.getByRole('login')).toBeDefined()
    expect(screen.queryByText('Search')).toBeNull()
  })

  it('Login success', async () => {
    //const mockOnSubmit = vi.fn(); // Create a mock function to spy on onSubmit
    render(<Page/>);

    const u = screen.getByRole('username')
    const p = screen.getByRole('password')
    const l = screen.getByRole('login')
    expect(l).toBeDefined();
    await userEvent.type(u, 'test');
    await userEvent.type(p, 'test');
    expect(u.value).toBe('test');

     await userEvent.click(l);

     //expect(mockOnSubmit).toHaveBeenCalledTimes(1);

    expect(u.value).toBe('test');
    expect(p.value).toBe('test');
    expect(screen.queryByText('Search')).toBeDefined();
  });
  it('Login fail', async () => {

    render(<Page/>);

    const u = screen.getByRole('username')
    const p = screen.getByRole('password')
    const l = screen.getByRole('login')
    expect(l).toBeDefined();

    await userEvent.type(u, 'test2');
    await userEvent.type(p, 'test2');
    expect(u.value).toBe('test2');

     await userEvent.click(l);

    expect(u.value).toBe('test2');
    expect(p.value).toBe('test2');

    expect(screen.getByRole('err')).toBeDefined();
    expect(screen.queryByText('Search')).toBeNull()
  });
  // TODO: add mock tests for login and search
});
