import React from 'react';
import { Wrapper, FieldWrapper } from './PlotData.style';

const PlotData = () => {
    return (
        <>
            <Wrapper>
                <p>Dimension</p>
                <FieldWrapper>
                    <div></div>
                    <button type="button">Clear</button>
                </FieldWrapper>
            </Wrapper>
            <Wrapper>
                <p>Measure</p>
                <FieldWrapper>
                    <div></div>
                    <button type="button">Clear</button>
                </FieldWrapper>
            </Wrapper>
        </>
    );
};

export default PlotData;
