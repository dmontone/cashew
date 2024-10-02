import { render, screen } from '@testing-library/react'
import { IconButton } from './icon-button'

describe('components/buttons/icon-button', () => {
  it('should render children text node', () => {
    render(<IconButton>ICON_BUTTON_TEST_TEXT</IconButton>)

    const iconButton = screen.getByText('ICON_BUTTON_TEST_TEXT')
    
    expect(iconButton).toBeInTheDocument()
  })
})