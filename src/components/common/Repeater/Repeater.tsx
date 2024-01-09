import { useCallback, useEffect, useState, DragEvent } from 'react';
import './Repeater.scss';
import { Icon } from '../Icon';
import { FaAlignJustify } from "react-icons/fa6";
import { Button } from '../Button';
import { get } from '../../../functions';

export enum RepeaterItemFlag {
    Deleted = 'deleted',
    Updated = 'updated',
}

interface RepeaterProps<T> {
    sourceUrl: string;
    createFn: Function;
    updateFn: Function;
    deleteFn: Function;
    className?: string;
    draggable: boolean;
    componentType: React.ComponentType<T>;
    createElementFn: Function
}



export const Repeater = <T extends { flag?: RepeaterItemFlag, order: string, id: string }>(props: RepeaterProps<T>) => {


    const { className, draggable, componentType: Component, createElementFn, sourceUrl, createFn, updateFn, deleteFn } = props

    const [items, setItems] = useState<T[]>([])
    const [notDeletedElements, setNotDeletedElements] = useState<T[]>([])
    const [draggedElement, setDraggedElement] = useState<any>()
    const [repeaterKey, setRepeaterKey] = useState<number>(0)


    const getItems = useCallback(async () => {
        const response = await get(sourceUrl)
        setItems(() => response.items)
    }, [setItems, sourceUrl])

    useEffect(() => {
        getItems()
    }, [getItems])

    const changeItemOrder = useCallback((item: T, order: string) => {
        if (order !== item.order) {
            item.order = order as string;
            item.flag = RepeaterItemFlag.Updated
        }
    }, [])

    useEffect(() => {
        setNotDeletedElements(() => items.filter((item) => item.flag !== RepeaterItemFlag.Deleted).map((item, index) => { changeItemOrder(item, index as unknown as string); return item }));
        setRepeaterKey((r) => r + 1)
    }, [items, changeItemOrder])

    const handleAddElement = () => {
        const newElement = createElementFn()
        newElement.id = newElement.id + items.length
        newElement.order = notDeletedElements.length
        setItems([...items, newElement])

    }
    const handleSaveChanges = async () => {
        const promises = items.map(async (item) => {
            if (item.flag === RepeaterItemFlag.Deleted) {
                await deleteFn(item.id);

            } else if (item.flag === RepeaterItemFlag.Updated) {
                if (item.id.includes('new')) {
                    await createFn(item);
                } else {
                    await updateFn(item);
                }
            }

        })
        await Promise.all(promises)
        await getItems()


    }
    const onDragEnter = (event: DragEvent<HTMLDivElement>, index: number) => {
        const target = event.currentTarget as HTMLDivElement; // Cast to specific element type
        if (target.classList.contains('repeater__component-wrapper') && draggedElement !== target) {
            const temp = target.style.order
            items.filter((item) => item.flag !== RepeaterItemFlag.Deleted).map((item) => {
                if ((String)(item.order) === (String)(target.style.order)) {
                    item.order = draggedElement.style.order
                    item.flag = RepeaterItemFlag.Updated
                } else if ((String)(item.order) === (String)(draggedElement.style.order)) {
                    item.order = target.style.order
                    item.flag = RepeaterItemFlag.Updated
                }
                return item
            })
            target.style.order = draggedElement.style.order
            draggedElement.style.order = temp
        }
    };

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        target.classList.add('invisible');
        setDraggedElement(target)
    };

    const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        target.classList.remove('invisible');
        const sortedItems = items.sort((a: T, b: T): number => {
            return (Number)(a.order) - (Number)(b.order)
        })
        setItems(() => sortedItems)
        setRepeaterKey((r) => r + 1)
    };

    return (
        <div key={repeaterKey} className={`repeater ${className}`}>
            {
                items.map((item, index) => {
                    if (item.flag !== RepeaterItemFlag.Deleted) {
                        return (
                            <div key={index} className='repeater__component-wrapper component-wrapper' draggable onDragEnd={onDragEnd} onDragStart={(event) => onDragStart(event)} onDragEnter={(event) => onDragEnter(event, index)} style={{ order: `${item.order}` }} >
                                <div className={`component-wrapper__icon ${draggable ? 'draggable' : ''}`}>
                                    <Icon icon={<FaAlignJustify />} />
                                </div>
                                <div className='component-wrapper__content'>
                                    <Component  {...item} items={items} setItems={setItems} />
                                </div>
                            </div>
                        )
                    } else {
                        return null
                    }
                })
            }
            <Button className={'repeater__add-button'} text={'Dodaj'} onClickFn={handleAddElement} disabled={false} />
            <Button className={'repeater__save-button'} text={'Zapisz'} disabled={false} onClickFn={handleSaveChanges} />
        </div >
    )
}