import { useContext } from 'react';
import { Container, FieldWrapper } from './PlotData.style';
import { StateContext } from '../../App';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const PlotData = () => {
    const { state, setState } = useContext(StateContext);

    const { dimension, measure, columns } = state;

    const handleClear = event => {
        if (event.target.id === 'measure') {
            setState({
                ...state,
                columns: [...columns, ...measure],
                measure: [],
                chartData: []
            });
        } else {
            setState({
                ...state,
                columns: [...columns, ...dimension],
                dimension: [],
                chartData: []
            });
        }
    }

    return (
        <>
            <Container>
                <p>Dimension</p>
                <Droppable
                    droppableId="dimension"
                    isDropDisabled={dimension.length > 0}
                    direction="horizontal"
                >
                    {provided => (
                        <FieldWrapper {...provided.droppableProps} ref={provided.innerRef}>
                            {dimension.map((column, index) => {
                                return (
                                    <Draggable
                                        key={column.name}
                                        draggableId={JSON.stringify(column)}
                                        index={index}
                                    >
                                        {provided => (
                                            <div
                                                title={column.function}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {column.name}
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </FieldWrapper>
                    )}
                </Droppable>
                <button id="dimension" type="button" onClick={handleClear}>Clear</button>
            </Container>
            <Container>
                <p>Measure</p>
                <Droppable
                    droppableId="measure"
                    isDropDisabled={measure.length > 0}
                    direction="horizontal"
                >
                    {provided => (
                        <FieldWrapper {...provided.droppableProps} ref={provided.innerRef}>
                            {measure.map((column, index) => {
                                return (
                                    <Draggable
                                        key={column.name}
                                        draggableId={JSON.stringify(column)}
                                        index={index}
                                    >
                                        {provided => (
                                            <div
                                                title={column.function}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {column.name}
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </FieldWrapper>
                    )}
                </Droppable>
                <button id="measure" type="button" onClick={handleClear}>Clear</button>
            </Container>
        </>
    );
};

export default PlotData;
