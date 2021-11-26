import axios from 'axios';
import { useQuery } from 'react-query';

export const useColumns = () => {
    return useQuery('columns', async () => {
        const { data } = await axios.get('https://plotter-task.herokuapp.com/columns');
        return data;
    });
};
