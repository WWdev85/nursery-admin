
import clsx from 'clsx';
import './Background.scss'

interface BackgroundProps {
    className: string,
    image?: string,
}

export const Background = (props: BackgroundProps) => {

    const { className, image } = props;
    const backgroundClass = clsx(`${className} background`, { 'background--image': image });

    return (
        <div className={backgroundClass} style={{ backgroundImage: `url(${image})` }}>
        </div>
    );
};