import {type Context, Hono} from 'hono';
import {serveStatic} from 'hono/bun';
import './reload-server';

const app = new Hono();

// Serve static files from the public directory.
app.use('/*', serveStatic({root: './public'}));

const log_token = function (c: Context) {
  const path = (c.req.path as string) || 'none';
  const token = (c.req.header('x-token') as string) || 'none';
  console.log(`Request path ${path} used token: ${token}`);
}

app.get('/version', (c: Context) => {
  // Return a Response whose body contains
  // the version of Bun running on the server.
  log_token(c);
  return c.text(Bun.version);
});

const search_terms: string[] = [
  'A specific thing',
  'Something was matched',
  'Anything was matched?',
  'Test, test, test!',
  'Foo Bar',
  'Hello, World!'
];

app.post('/search', async (c: Context) => {
  // Search for something in the search_results array.
  log_token(c);
  const data = await c.req.formData();
  console.log('data:', data);
  const search_term = (data.get('search-term') as string) || '';
  console.log('search_term:', search_term);

  // Return early when `search_term` is empty.
  if (search_term === '') return c.html('');

  const search_term_lower: string = search_term.toLowerCase();
  const matches: string[] = search_terms.filter(n => n.toLowerCase().includes(search_term));
  console.log('matches:', matches);
  return c.html(
    <>
      {matches.map(match => (
        <li>{match}</li>
      ))}
    </>
  );
});

app.get('/validate-ip-address', (c: Context) => {
  // Validate the IP address is valid.
  log_token(c);
  const ip_address = (c.req.query('ip-address') as string) || '';
  const is_valid_ipv4_address = /^(\d{1,3}\.){3}\d{1,3}$/.test(ip_address);
  const is_valid_ipv6_address = /^([0-9a-fA-F]{0,4}:){1,7}[0-9a-fA-F]{0,4}$/.test(ip_address);
  const is_valid = (is_valid_ipv4_address || is_valid_ipv6_address) ? true : false;
  // leftwards arrow: &larr; ← &#8592; u+2190 \u2190
  return c.text(`\u2190 The IP address entered is valid: ${is_valid}`);
});

export default app;
