import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import { Order } from '../../../../types';
import './TableHeader.scss';
import { Icon } from "../../Icon";
import clsx from "clsx";

interface TableHeaderProps {
    title: string;
    headerKey?: string;
    onClickFn?: Function;
    order?: Order;
    orderBy?: string;
}

export const TableHeader = (props: TableHeaderProps) => {
    const { title, onClickFn, headerKey, order, orderBy } = props;

    const iconClass = clsx('table-header__icon', { 'table-header__icon--ascending': orderBy === headerKey, 'table-header__icon--descending': orderBy === headerKey && order === Order.Desc })

    let icon = <FaSort />

    if (orderBy === headerKey) {
        if (order !== Order.Asc) {
            icon = <FaSortDown />
        } else {
            icon = <FaSortUp />
        }
    }

    const handleClick = (e: any) => {
        if (onClickFn && headerKey) {
            onClickFn(headerKey)
        }
    }
    return (
        <th className='table-header' onClick={handleClick}>
            {title}
            {headerKey && <Icon className={iconClass} icon={icon} />}
        </th>
    )
}