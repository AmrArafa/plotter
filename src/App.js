import { createContext, useState } from 'react';
import Plotter from './pages/Plotter/Plotter';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DragDropContext } from 'react-beautiful-dnd';

const queryClient = new QueryClient();

export const StateContext = createContext();

function App() {
    const initialState = {
        columns: [],
        dimension: [],
        measure: [],
        chartData: []
    };

    const [ state, setState ] = useState(initialState);

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        const start = state[source.droppableId];
        const finish = state[destination.droppableId];

        if (start === finish) return;

        if (JSON.parse(draggableId).function !== destination.droppableId &&
            destination.droppableId !== 'columns') {
            return;
        }

        start.splice(source.index, 1);
        finish.splice(destination.index, 0, JSON.parse(draggableId));

        if (source.droppableId !== 'columns' && destination.droppableId === 'columns') {
            setState({
                ...state,
                [source.droppableId]: start,
                [destination.droppableId]: finish,
                chartData: []
            });
        } else {
            setState({
                ...state,
                [source.droppableId]: start,
                [destination.droppableId]: finish
            });
        }
    };

    return (
        <QueryClientProvider client={queryClient}>
            <StateContext.Provider value={{ state, setState }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Plotter />
                </DragDropContext>
            </StateContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
