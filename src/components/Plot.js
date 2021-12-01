import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { StateContext } from '../App';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip } from 'recharts';

const Plot = () => {
    const mutation = useMutation(params => {
        return axios.post('https://plotter-task.herokuapp.com/data', params);
    });

    const { state, setState } = useContext(StateContext);

    const { dimension, measure, chartData } = state;

    const { isLoading, isError, error } = mutation;

    const prepareChartData = chartData => {
        if (chartData.length === 0) return null;
        const newChartData = new Array(chartData[0].values.length).fill({});
        chartData.forEach(column => {
            column.values.forEach((value, index) => {
                newChartData[index] = {
                    ...newChartData[index],
                    [column.name]: value
                }
            });
        });
        return newChartData;
    };

    useEffect(() => {
        if (dimension.length > 0 && measure.length > 0) {
            const params = {
                measures: measure.map(measure => measure.name),
                dimension: dimension[0].name
            };
            if (chartData.length === 0) {
                mutation.mutateAsync(params, {
                    onSuccess: response => {
                        setState({ ...state, chartData: response.data });
                    }
                });
            }
        }
    }, [state]);

    if (isLoading) return <span>Loading...</span>;

    if (isError) return <span>Error: {error}</span>;

    return (
        <>
            {chartData.length > 0
                ? (<LineChart
                        width={900}
                        height={700}
                        data={prepareChartData(chartData)}
                        margin={{ top: 60, right: 60, bottom: 60, left: 60 }}
                    >
                        <Line
                            type="linear"
                            dataKey={measure[0].name}
                            stroke="#8884d8"
                        />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis
                            dataKey={dimension[0].name}
                            angle={30}
                            interval={0}
                        >
                            <Label value={dimension[0].name} offset={30} position="bottom" />
                        </XAxis>
                        <YAxis
                            interval={0}
                            label={{ value: measure[0].name, angle: -90, position: 'left', offset: 30 }}
                        />
                        <Tooltip />
                    </LineChart>)
                : <p>Please drag 1 column into each of the fields above to generate a plot. Columns can also be dragged back to their area, or cleared by clicking the "Clear" button.</p>
            }
        </>
    );
};

export default Plot;
