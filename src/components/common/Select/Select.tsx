
import './Select.scss'
import { Dropdown } from './Dropdown';

export interface SelectOption {
    value: number,
    label: string
}

interface SelectProps {
    className?: string;
    selected: number;
    label?: string;
    options?: SelectOption[],
    onChangeFn?: Function;
}

export const Selection = (props: SelectProps) => {
    const { className, label, options, selected, onChangeFn } = props

    return (
        <div className={`select ${className}`}>
            {label ? <label className={`select__label`}>{label}</label> : null}
            {options && <Dropdown options={options} value={selected} onClickFn={onChangeFn} />}
        </div>
    )
}