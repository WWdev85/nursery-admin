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
    sortable?: boolean
}

export const TableHeader = (props: TableHeaderProps) => {
    const { title, onClickFn, headerKey, order, orderBy, sortable } = props;

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
        if (onClickFn && headerKey && sortable !== false) {
            onClickFn(headerKey)
        }
    }
    return (
        <th className='table-header' onClick={handleClick}>
            <div className="table-header__wrapper">
                {title}
                {sortable !== false && headerKey && <Icon className={iconClass} icon={icon} />}
            </div>

        </th>
    )
}