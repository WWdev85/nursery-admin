import { useCallback, useEffect, useReducer } from 'react';
import './Table.scss';
import { get } from '../../../functions';
import { Order } from '../../../types';
import { TableHeader } from './TableHeader';
import { TableActionType, TableState, tableReducer } from './TableReducer';
import { Input, InputType } from '../Input';
import { Selection, SelectOption } from '../Select';
import { Pages } from './Pages';
import { IconButton } from '../IconButton';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export interface Column {
    title: string;
    key: string;
    width: number;
}

interface TableProps {
    sourceUrl: string;
    columns: Column[];
    actions: boolean;
    orderBy: string;
}

const limitOptions: SelectOption[] = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
]

export const Table = (props: TableProps) => {
    const { sourceUrl, columns, actions, orderBy } = props;

    const initialState: TableState = {
        limit: limitOptions[0].value,
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        items: [],
        order: Order.Asc,
        search: '',
        headers: [],
        rows: [],
        columnsWidths: [],
        orderBy: orderBy
    };

    const [state, dispatch] = useReducer(tableReducer, initialState);

    const getItems = useCallback(async () => {
        const response = await get(`${sourceUrl}?page=${state.currentPage}&limit=${state.limit}&orderBy=${state.orderBy}&order=${state.order}&search=${state.search}`);

        dispatch({
            type: TableActionType.SetItems,
            payload: { items: response.items, totalItems: response.totalItems, totalPages: response.totalPages }
        });

    }, [sourceUrl, state.limit, state.order, state.search, state.currentPage, state.orderBy])

    const setTableRows = useCallback(() => {
        const rows = state.items.map((item, index) => {
            return (
                <tr key={index}>
                    <td className='table-data' key={'Lp.' + index}>
                        {(state.currentPage - 1) * state.limit + index + 1}
                    </td>
                    {columns.map((column) => {
                        let value = !column.key.includes('.') ? item[column.key] : item[column.key.split('.')[0]][column.key.split('.')[1]]
                        if (column.key === 'address') {
                            value = `ul. ${value.street} ${value.houseNumber}, ${value.postalCode} ${value.town}`
                        }
                        if (value === true) {
                            value = 'Tak';
                        }
                        if (value === false) {
                            value = 'Nie';
                        }
                        return (
                            <td className='table-data' key={column.key}>
                                {value}
                            </td>
                        )
                    })}
                    <td className='table-data' key={'actions' + index}>
                        <div className='table-data__actions actions'>
                            <IconButton className={'actions__button'} icon={<FaEdit />} />
                            <IconButton className={'actions__button actions__button--trash'} icon={<FaTrashAlt />} />
                        </div>
                    </td>
                </tr>
            )
        })

        dispatch({
            type: TableActionType.SetRows,
            payload: rows
        })
    }, [columns, state.items, state.currentPage, state.limit])

    const handleChangeOrdeBy = useCallback((key: string) => {
        console.log(key, state.orderBy);
        if (state.orderBy === key) {
            dispatch({
                type: TableActionType.SetOrder,
                payload: state.order === Order.Asc ? Order.Desc : Order.Asc
            })
        } else {
            dispatch({
                type: TableActionType.SetOrderBy,
                payload: !key.includes('.') ? key : key.split('.')[0]
            })
        }
    }, [state.order, state.orderBy]);

    const setHeaders = useCallback(() => {
        const headers = columns.map((column) => {
            return <TableHeader key={column.key} title={column.title} headerKey={!column.key.includes('.') ? column.key : column.key.split('.')[0]} onClickFn={handleChangeOrdeBy} order={state.order} orderBy={state.orderBy} />
        })
        if (actions) {
            headers.push(<TableHeader key={'actions'} title={'Akcje'} />)
        }
        headers.unshift(<TableHeader key={'order'} title={'Lp.'} />)
        dispatch({
            type: TableActionType.SetHeaders,
            payload: headers
        })

    }, [actions, columns, state.order, state.orderBy, handleChangeOrdeBy])

    const setWidths = useCallback(() => {
        const widths = columns.map((column) => {
            return <col key={column.key} style={{ width: `${column.width}px` }} />
        })
        widths.unshift(<col key={'order'} style={{ width: `40px` }} />)
        if (actions) {
            widths.push(<col key={'actions'} style={{ width: `120px` }} />)
        }
        dispatch({
            type: TableActionType.SetColumnsWidths,
            payload: widths
        })
    }, [actions, columns])

    useEffect(() => {
        getItems();
    }, [getItems]);

    useEffect(() => {
        setHeaders();
        setWidths();
    }, [setHeaders, setWidths])

    useEffect(() => {
        setTableRows()
    }, [setTableRows])

    const handleChangeSearch = (value: string) => {
        dispatch({
            type: TableActionType.SetSearch,
            payload: value
        })
    }

    const handleChangeLimit = (value: number) => {
        dispatch({
            type: TableActionType.SetLimit,
            payload: value
        })
    }

    const handleChangeCurrentPage = (value: number) => {
        dispatch({
            type: TableActionType.SetPage,
            payload: value
        })
    }

    return (
        <div className='table-wrapper'>
            <Input className={'table-wrapper__search'} type={InputType.Text} value={state.search} placeholder='wyszukaj' onChangeFn={handleChangeCurrentPage}></Input>
            <table className='table'>
                <colgroup>
                    {state.columnsWidths}
                </colgroup>
                <thead>
                    <tr>
                        {state.headers}
                    </tr>
                </thead>
                <tbody>
                    {state.rows}
                </tbody>
            </table>
            {state.totalPages > 1 && <Pages className='table-wrapper__pages' currentPage={state.currentPage} totalPages={state.totalPages} onChangeFn={handleChangeCurrentPage} />}
            <Selection className='table-wrapper__select' options={limitOptions} selected={state.limit} onChangeFn={handleChangeLimit} />

        </div >
    )
}