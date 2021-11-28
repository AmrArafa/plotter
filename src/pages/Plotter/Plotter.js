import Columns from '../../components/Columns/Columns';
import PlotData from '../../components/PlotData/PlotData';
import Plot from '../../components/Plot';
import { Container, PlotAreaWrapper, ColumnsWrapper } from './Plotter.style';

const Plotter = () => {
    return (
        <Container>
            <ColumnsWrapper>
                <Columns />
            </ColumnsWrapper>
            <PlotAreaWrapper>
                <PlotData />
                <Plot />
            </PlotAreaWrapper>
        </Container>
    )
};

export default Plotter;
