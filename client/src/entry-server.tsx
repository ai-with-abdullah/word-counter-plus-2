import { renderToString } from 'react-dom/server';
import { Router } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

export function render(url: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <Router ssrPath={url}>
        <App />
      </Router>
    </QueryClientProvider>
  );

  return { html };
}
