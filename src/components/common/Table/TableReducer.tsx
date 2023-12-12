import { ReactNode } from "react";
import { Order } from "../../../types";

interface Item {
    [key: string]: any;
}

export interface TableState {
    limit: number;
    currentPage: number;
    order: Order;
    totalPages: number;
    totalItems: number;
    items: Item[];
    search: string;
    headers: ReactNode[];
    rows: ReactNode[];
    columnsWidths: ReactNode[];
    orderBy: string;
}

export enum TableActionType {
    SetLimit = 'SET_LIMIT',
    SetPage = 'SET_PAGE',
    SetOrder = 'SET_ORDER',
    SetTotalPages = 'SET_TOTAL_PAGES',
    SetTotalItems = 'SET_TOTAL_ITEMS',
    SetItems = 'SET_ITEMS',
    SetSearch = 'SET_SEARCH',
    SetHeaders = 'SET_HEADERS',
    SetRows = 'SET_ROWS',
    SetColumnsWidths = 'SET_COLUMNS_WIDTHS',
    SetOrderBy = 'SET_ORDER_BY'
}

type TableAction =
    | { type: TableActionType.SetLimit; payload: number }
    | { type: TableActionType.SetPage; payload: number }
    | { type: TableActionType.SetOrder; payload: Order }
    | { type: TableActionType.SetItems; payload: { items: Item[]; totalItems: number; totalPages: number } }
    | { type: TableActionType.SetSearch; payload: string }
    | { type: TableActionType.SetHeaders; payload: ReactNode[] }
    | { type: TableActionType.SetRows; payload: ReactNode[] }
    | { type: TableActionType.SetColumnsWidths; payload: ReactNode[] }
    | { type: TableActionType.SetOrderBy; payload: string };


export const tableReducer = (state: TableState, action: TableAction): TableState => {
    switch (action.type) {
        case TableActionType.SetLimit:
            return { ...state, limit: action.payload };
        case TableActionType.SetPage:
            return { ...state, currentPage: action.payload };
        case TableActionType.SetOrder:
            return { ...state, order: action.payload };
        case TableActionType.SetItems:
            return { ...state, ...action.payload };
        case TableActionType.SetSearch:
            return { ...state, search: action.payload };
        case TableActionType.SetHeaders:
            return { ...state, headers: action.payload };
        case TableActionType.SetRows:
            return { ...state, rows: action.payload };
        case TableActionType.SetColumnsWidths:
            return { ...state, columnsWidths: action.payload };
        case TableActionType.SetOrderBy:
            return { ...state, orderBy: action.payload };
        default:
            return state;
    }
};



