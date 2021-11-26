import Plotter from './pages/Plotter/Plotter';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Plotter />
        </QueryClientProvider>
    );
}

export default App;
