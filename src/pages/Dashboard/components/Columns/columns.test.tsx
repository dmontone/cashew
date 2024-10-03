import { render, screen, waitFor, within } from '@testing-library/react'
import { Collumns } from './columns'
import { DashContext } from '~/context'

jest.mock('./constants', () => ({
  ALL_COLUMNS: [
    { status: 'REVIEW', title: 'TEST_TITLE_1' },
    { status: 'APROVED', title: 'TEST_TITLE_2' },
    { status: 'REPROVED', title: 'TEST_TITLE_3' }
  ]
}))

jest.mock('../RegistrationCard', () => ({
  RegistrationCard: ({ employeeName }: { employeeName: string }) => <>{employeeName}</>
}))

describe('pages/dashboard/columns', () => {
  const renderWithContext = (value: any) => {
    return render(
      <DashContext.Provider value={value}>
        <Collumns />
      </DashContext.Provider>
    )
  }

  it('should render columns as they are in constants file', () => {
    renderWithContext([{ isFetching: false, registrations: [] }])

    const columns = screen.getAllByText(/TEST_TITLE_(1|2|3)/)
    expect(columns.length).toEqual(3)
  })

  it('should display loading icon when fetching', () => {
    renderWithContext([{ isFetching: false, registrations: [] }])

    const loadingIcons = screen.getAllByLabelText('loading')
    expect(loadingIcons.length).toEqual(3)
  })

  it('should display loading icon when fetching', () => {
    renderWithContext([{ isFetching: false, registrations: [] }])

    const loadingIcons = screen.getAllByLabelText('loading')
    expect(loadingIcons.length).toEqual(3)
  })

  it('should render the correct registration cards for each column', async () => {
    const registrations = [
      { id: 1, employeeName: 'TEST_EMPLOYEENAME_1', status: 'REVIEW' },
      { id: 2, employeeName: 'TEST_EMPLOYEENAME_2', status: 'APROVED' },
      { id: 3, employeeName: 'TEST_EMPLOYEENAME_3', status: 'REPROVED' }
    ]

    renderWithContext([{ isFetching: false, registrations }])

    // Verifica se os cartões estão presentes na coluna correta
    const reviewColumn = screen.getByText('TEST_TITLE_1')
    const reviewColumnContent = within(reviewColumn.closest('div')!)
    expect(reviewColumnContent.getByText('TEST_EMPLOYEENAME_1')).toBeInTheDocument()

    const approvedColumn = screen.getByText('TEST_TITLE_2')
    const approvedColumnContent = within(approvedColumn.closest('div')!)
    expect(approvedColumnContent.getByText('TEST_EMPLOYEENAME_2')).toBeInTheDocument()

    const reprovedColumn = screen.getByText('TEST_TITLE_3')
    const reprovedColumnContent = within(reprovedColumn.closest('div')!)
    expect(reprovedColumnContent.getByText('TEST_EMPLOYEENAME_3')).toBeInTheDocument()
  })
})