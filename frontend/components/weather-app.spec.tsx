import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {userEvent} from '@testing-library/user-event';

import Page from '../app/page'

import axios from 'axios';

vi.mock('axios');

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
    render(<Page/>);

    const u = screen.getByRole('username')
    const p = screen.getByRole('password')
    const l = screen.getByRole('login')
    expect(l).toBeDefined();
    await userEvent.type(u, 'test');
    await userEvent.type(p, 'test');
    expect(u.value).toBe('test');

    const mock = {
        token: 'ABC',
        history: [{city: 'Test City'}]
      };
    (axios.get as vi.Mock).mockResolvedValue({ status: 200, data: mock });

    await userEvent.click(l);

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

    const mock = {
        error: 'Invalid credentials'
      };
    (axios.get as vi.Mock).mockResolvedValue({ status: 401, data: mock });

    await userEvent.click(l);

    expect(u.value).toBe('test2');
    expect(p.value).toBe('test2');

    expect(screen.getByRole('err')).toBeDefined();
  });
  // TODO: add mock tests for login and search
});
