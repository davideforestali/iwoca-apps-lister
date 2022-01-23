import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3001/api/applications', (req, res, ctx) => {
    const pageParam = req.url.searchParams.get('_page')
    const limitParam = req.url.searchParams.get('_limit')

    if (pageParam === '1' && limitParam === '5') {
      return res(
        ctx.json([
          { 
            id: 1,
            first_name: "Sherman",
            last_name: "Ebert",
            loan_amount: 39614,
            loan_type: "Cash Advance",
            email: "Carson.Funk@hotmail.com",
            company: "Kreiger Group",
            date_created: "2021-07-10T13:13:06.883Z",
            expiry_date: "2021-10-11T06:38:56.537Z",
           },
           {
            id: 2,
            first_name: "Velma",
            last_name: "Jast",
            loan_amount: 87221,
            loan_type: "Flexi-Loan",
            email: "Bernita.Bode@gmail.com",
            company: "Bartoletti, Pfannerstill and Koch",
            date_created: "2021-06-29T03:01:00.999Z",
            expiry_date: "2021-11-10T10:13:49.836Z",
           }
        ])
      )
    }
  })
]