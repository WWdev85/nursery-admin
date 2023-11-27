import { Grid } from 'react-loader-spinner';
import './Loader.scss';

export const Loader = () => {

    return (
        <div className={"loader"}>
            <Grid
                height="80"
                width="80"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>

    )
}