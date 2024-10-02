import { render, screen } from '@testing-library/react'
import { Collumns } from './columns'

jest.mock('./constants', () => ({
  ALL_COLUMNS: [
    { status: 'REVIEW', title: 'TEST_TITLE_0' },
    { status: 'REVIEW', title: 'TEST_TITLE_1' },
    { status: 'REVIEW', title: 'TEST_TITLE_2' }
  ]
}))

describe('pages/dashboard/columns', () => {
  it('should render columns as they are in constants file', () => {
    render(<Collumns />)

    const columns = screen.getAllByText(/TEST_TITLE_(0|1|2)/)
    expect(columns.length).toEqual(3)
  })
})