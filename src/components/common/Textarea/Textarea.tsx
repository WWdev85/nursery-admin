import clsx from 'clsx';
import './Textarea.scss';

interface TextareaProps {
    className: string;
    label?: string;
    value: string;
    onChangeFn?: Function;
}

export const Textarea = (props: TextareaProps) => {
    const { className, label, value, onChangeFn } = props;

    const textareaClass = clsx(`${className} textarea`)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChangeFn) {
            onChangeFn(e.target.value)
        }
    }
    return (
        <div className={textareaClass} >
            {label && <label className={'input__label'}>{label}</label>}
            <textarea className='textarea__content' value={value} onChange={handleChange}></textarea>
        </div>
    )
}