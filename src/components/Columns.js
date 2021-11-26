import React from 'react';
import { useColumns } from '../utils/api';

const Columns = () => {
    const { isLoading, isError, data, error } = useColumns();

    if (isLoading) return <span>Loading...</span>;

    if (isError) return <span>Error: {error.message}</span>;

    return (
        <>
            <h2>Columns</h2>
            <ul>
                <li>Dimensions
                    <ul>
                        {data.map((column, index) => {
                            return column.function === 'dimension' ?
                                <li key={`${column.name}${index}`}>{column.name}</li>
                                : null
                        })}
                    </ul>
                </li>
                <li>Measures
                    <ul>
                        {data.map((column, index) => {
                            return column.function === 'measure' ?
                                <li key={`${column.name}${index}`}>{column.name}</li>
                                : null
                        })}
                    </ul>
                </li>
            </ul>
        </>
    );
};

export default Columns;
