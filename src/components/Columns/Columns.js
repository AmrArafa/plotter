import { useContext, useEffect } from 'react';
import { useColumns } from '../../utils/api';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { StateContext } from '../../App';
import { ColumnsTitle, ColumnsList, Column } from './Columns.style';
import ReactTooltip from 'react-tooltip';

const Columns = () => {
    const { state, setState } = useContext(StateContext);

    const { columns } = state;

    const { isLoading, isError, data, error } = useColumns();

    useEffect(() => {
        if (data) {
            setState({
                ...state, columns: data
            });
        }
    }, [data]);

    if (isLoading) return <span>Loading...</span>;

    if (isError) return <span>Error: {error}</span>;

    return (
        <>
            <ColumnsTitle>Columns</ColumnsTitle>
            <Droppable droppableId="columns">
                {provided => (
                    <ColumnsList {...provided.droppableProps} ref={provided.innerRef}>
                        {columns.map((column, index) => {
                            return (
                                <Draggable
                                    key={column.name}
                                    draggableId={JSON.stringify(column)}
                                    index={index}
                                >
                                    {provided => (
                                        <>
                                            <Column
                                                data-tip={column.function}
                                                data-place="right"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {column.name}
                                            </Column>
                                            <ReactTooltip />
                                        </>
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
