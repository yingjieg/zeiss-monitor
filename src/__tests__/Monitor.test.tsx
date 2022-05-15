import { rest } from 'msw';
import { setupServer } from 'msw/node';
import WS from 'jest-websocket-mock';
import { render, screen, waitFor } from '@testing-library/react';

import Monitor from '../pages/Monitor';

let ws: WS;

beforeEach(() => {
  ws = new WS('ws://codingcase.zeiss.services/ws');
});

afterEach(() => {
  WS.clean();
});

const server = setupServer(
  rest.get(
    'http://codingcase.zeiss.services/api/v1/machines',
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: [
            {
              id: 'c21f082e-625e-49ac-80c5-e0d46bf50258',
              status: 'idle',
              machine_type: 'microscope',
              longitude: 48.09610228912977,
              latitude: 11.52376716586951,
              last_maintenance: '2017-04-01T17:00:00.000000Z',
              install_date: '2015-04-15',
              floor: 5,
            },
          ],
        }),
      );
    },
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<MachineList />', () => {
  it('Render machine list', async () => {
    render(<Monitor />);
    await waitFor(() => screen.getByText('idle'));
    // expect(screen.getByText('idle')).toHaveTextContent('idle');
  });

  it('Update status when event arrived', async () => {
    const { rerender } = render(<Monitor />);

    ws.send(
      JSON.stringify({
        topic: 'events',
        ref: null,
        payload: {
          timestamp: '2022-05-15T17:05:41Z',
          status: 'finished',
          machine_id: 'c21f082e-625e-49ac-80c5-e0d46bf50258',
          id: 'a872b197-b102-43ea-8419-527f493bc3d8',
        },
        join_ref: null,
        event: 'new',
      }),
    );

    await rerender(<Monitor />);

    await waitFor(() => screen.getByText('finished'));
  });
});
