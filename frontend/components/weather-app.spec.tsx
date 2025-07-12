import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import * as React from 'react'

describe('App', () => {
  it('renders the App component', () => {
    render(<Page />)
    expect(screen.getByText('Weather App')).toBeDefined()
    //screen.debug(); // prints out the jsx in the App component unto the command line
  })

  it('Login Button', () => {
    render(<Page />)
    expect(screen.getByRole('username')).toBeDefined()
    expect(screen.getByRole('password')).toBeDefined()
    expect(screen.getAllByText('Login')).toBeDefined()
    expect(screen.queryByText('Search')).toBeNull()
  })
})