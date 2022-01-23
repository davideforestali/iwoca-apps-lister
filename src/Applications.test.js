import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { act } from 'react-dom/test-utils';
import Applications from './Applications';
import { server } from './mocks/server';

test('fetches applications', async () => {
  act(() => {
    render(<Applications />); 
  })

  const loadingMessage = screen.getByRole('alert', {name: /loading/i})
  expect(loadingMessage).toBeInTheDocument()

  const companyNames = await screen.findAllByLabelText(/company name/i)
  expect(companyNames).toHaveLength(2)

  const companyNamesText = companyNames.map(el => el.textContent)
  expect(companyNamesText).toEqual(['Kreiger Group', 'Bartoletti, Pfannerstill and Koch'])
});

test('displays error alert on server error', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3001/api/applications', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<Applications />)

  const errorMessage = await screen.findByRole('alert', { name: /error message/i })
  expect(errorMessage).toBeInTheDocument()
})