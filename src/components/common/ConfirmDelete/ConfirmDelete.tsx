import { Button } from '../Button';
import './ConfirmDelete.scss';

interface ConfirmDeleteProps {
    message: string,
    item: string,
    deleteFn: Function,
    cancelFn: Function
}

export const ConfirmDelete = (props: ConfirmDeleteProps) => {
    const { message, item, deleteFn, cancelFn } = props;
    return (
        <div className='confirm'>
            <div className='confirm__message'>
                {message}
            </div>
            <div className='confirm__item'>

                {item}
            </div>
            <Button className={'confirm__button confirm__button--delete'} text={'Usuń'} disabled={false} onClickFn={deleteFn} />
            <Button className={'confirm__button'} text={'Anuluj'} disabled={false} onClickFn={cancelFn} />


        </div>
    )
}