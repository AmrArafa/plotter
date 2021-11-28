import { useContext, useEffect } from 'react';
import { useColumns } from '../../utils/api';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { StateContext } from '../../App';
import { ColumnsList, Column } from './Columns.style';

const Columns = () => {
    const { state, setState } = useContext(StateContext);

    const { isLoading, isError, data, error } = useColumns();

    useEffect(() => {
        if (data) {
            setState({
                ...state, columns: data
            });
        }
    }, [data]);

    if (isLoading) return <span>Loading...</span>;

    if (isError) return <span>Error: {error.message}</span>;

    return (
        <>
            <h2>Columns</h2>
            <Droppable droppableId="columns">
                {provided => (
                    <ColumnsList {...provided.droppableProps} ref={provided.innerRef}>
                        {data.map((column, index) => {
                            return (
                                <Draggable
                                    key={column.name}
                                    draggableId={JSON.stringify(column)}
                                    index={index}
                                >
                                    {provided => (
                                        <Column
                                            title={column.function}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {column.name}
                                        </Column>
                                    )}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </ColumnsList>
                )}
            </Droppable>
        </>
    );
};

export default Columns;
