import { render, screen } from '@testing-library/react'
import { TextField } from './text-field'

describe('components/buttons/icon-button', () => {
  it('should render children text node', () => {
    render(<TextField id={'TEST_ID'} label={'TEST_LABEL'} error={'TEST_ERROR'} />)

    const label = screen.getByText('TEST_LABEL')
    const input = screen.getByLabelText('TEST_LABEL')
    const error = screen.getByText('TEST_ERROR')

    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(error).toBeInTheDocument()
  })
})