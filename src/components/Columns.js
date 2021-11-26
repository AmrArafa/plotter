import React from 'react';

const Columns = () => {
    const columns =  [
        {
            "name": "Product",
            "function": "dimension"
        },
        {
            "name": "Year",
            "function": "dimension"
        },
        {
            "name": "Country",
            "function": "dimension"
        },
        {
            "name": "Cost",
            "function": "measure"
        },
        {
            "name": "Revenue",
            "function": "measure"
        },
        {
            "name": "Units sold",
            "function": "measure"
        }
    ];
    return (
        <>
            <h2>Columns</h2>
            <ul>
                <li>Dimensions
                    <ul>
                        {columns.map((column, index) => {
                            return column.function === 'dimension' ?
                                <li key={`${column.name}${index}`}>{column.name}</li>
                                : null
                        })}
                    </ul>
                </li>
                <li>Measures
                    <ul>
                        {columns.map((column, index) => {
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
