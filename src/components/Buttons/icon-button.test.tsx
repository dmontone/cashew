
import { render, screen } from '@testing-library/react'
import { Button } from './styles'

describe('components/buttons/icon-button', () => {
  it('should render children text node', () => {
    render(<Button>Ativar</Button>)
    const button = screen.getByText(/Ativar/)
    expect(button).toBeInTheDocument()
  })
})


// import { Button } from ".";
// import { render, renderHook, screen } from "@testing-library/react";

// describe("Button", () => {
//   it("Should show button", () => {
//     render(<Button>Ativar</Button>);
//     expect(screen.getByRole("button", { name: /ativar/i }));
//   });
// });
