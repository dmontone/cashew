import { render, screen } from '@testing-library/react'
import { Header } from './header'

describe('components/header/header', () => {
  it('should render children text node', () => {
    render(<Header>HEADER_TEST_TEXT</Header>)
    const header = screen.getByText('HEADER_TEST_TEXT')
    expect(header).toBeInTheDocument()
  })
})