import { ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import './Pages.scss';
import { IconButton } from '../../IconButton';


interface PagesProps {
    className: string,
    currentPage: number,
    totalPages: number,
    onChangeFn: Function
}

export const Pages = (props: PagesProps) => {
    const { className, currentPage, totalPages, onChangeFn } = props;
    const [pageNumbers, setPageNumbers] = useState<ReactNode[]>([]);

    const pagesClass = clsx(`${className} pages`)

    const handleChange = (value: number) => {
        if (onChangeFn) {
            onChangeFn(value);
        }
    }

    useEffect(() => {
        const pages: ReactNode[] = [];
        if (currentPage > 4 && totalPages > 4) {
            pages.push(<div className='pages__page pages__page--inactive'>{'...'}</div>)
        }
        let j = 0
        for (let i = currentPage - 2; i < totalPages; i++) {
            console.log(i, j)
            if (i > 1 && j < 5) {
                pages.push(<div key={i} className={i == currentPage ? 'pages__page pages__page--active' : 'pages__page'} onClick={() => handleChange(i)}>{i}</div>)
                j++
            }
            if (i > currentPage + 1) {
                break
            }
        }
        if (currentPage < (totalPages - 2) && (totalPages > currentPage + 3)) {
            pages.push(<div className='pages__page pages__page--inactive'>{'...'}</div>)
        }

        setPageNumbers(pages)
    }, [currentPage, totalPages])

    return (
        <div className={pagesClass}>
            <IconButton className={'pages__button'} icon={<FaChevronLeft />} onClickFn={() => handleChange(currentPage - 1)} disabled={currentPage < 2} />
            <div className={1 == currentPage ? 'pages__page pages__page--active' : 'pages__page'} onClick={() => handleChange(1)} >1</div>
            {pageNumbers}
            <div className={totalPages == currentPage ? 'pages__page pages__page--active' : 'pages__page'} onClick={() => handleChange(totalPages)}>{totalPages}</div>
            <IconButton className={'pages__button'} icon={<FaChevronRight />} onClickFn={() => handleChange(currentPage + 1)} disabled={currentPage > totalPages - 1} />
        </div>
    )
}