import { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, InputType, Loader, Repeater, RepeaterItemFlag, SelectOption } from "../../../components";
import { CurriculumSubject, CurriculumSubjectInterface, CurriculumSubjectProps } from "./CurriculumSubject/CurriculumSubject";
import { get, patch, post } from "../../../functions";
import './CreateCurriculum.scss'

interface CreateCurriculumProps {
    id?: string;
    onSubmitFn: Function
}

export const CreateCurriculum = (props: CreateCurriculumProps) => {
    const { id, onSubmitFn } = props;
    const [name, setName] = useState<string>("");
    const [subjects, setSubjects] = useState<CurriculumSubjectInterface[] | undefined>(undefined);
    const [subjectOptions, setSubjectOptions] = useState<SelectOption[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getCurriculum = useCallback(async (options: SelectOption[]) => {
        const response = await get(`/curriculum/get-one/${id}`);
        setName(response.name)
        setSubjects(() =>
            response.curriculumSubjects?.map((sub: any) => {
                return {
                    id: sub.subject?.id,
                    name: sub.subject?.name,
                    weeklyHours: sub?.weeklyHours,
                    options: options
                }
            })
        )
    }, [id])


    const getSubjectOptions = useCallback(async () => {
        setIsLoading(true)
        const options = await get('/subject/get-all?page=1&limit=1000&orderBy=name&order=ASC');
        const selectOptions = options.items.map((sub: any) => {
            return {
                value: sub.id,
                label: sub.name,
            }
        })
        setSubjectOptions(() => selectOptions)
        if (id) {
            getCurriculum(selectOptions)
        } else {
            setSubjects([])
        }
        setIsLoading(false)
    }, [setSubjectOptions, getCurriculum, id])




    useEffect(() => {
        getSubjectOptions()
    }, [getSubjectOptions]);

    const addNewCurriculumSubject = (): CurriculumSubjectInterface => {
        return {
            id: 'new',
            name: '',
            weeklyHours: 0,
            options: subjectOptions,
            flag: RepeaterItemFlag.Updated
        }
    }
    const handleChanageName = (name: string) => {
        setName(name)
    }

    const handleSubmit = () => {
        const curriculumSubjects = subjects?.map((subject) => {
            return {
                subjectId: subject.id,
                hours: subject.weeklyHours
            }
        })
        if (id) {
            const response = patch('/curriculum/update', {
                id: id,
                name,
                subjects: curriculumSubjects
            })
        } else {
            const response = post('/curriculum/add', {
                name,
                subjects: curriculumSubjects
            })
        }


        if (onSubmitFn) {
            onSubmitFn()
        }
    }

    return (
        <Form onSubmitFn={handleSubmit} className={'curriculum-form'}>
            {isLoading && <Loader />}
            <Input className={"curriculum-form__input"} type={InputType.Text} value={name} label='Nazwa' onChangeFn={handleChanageName} />
            {subjects !== undefined && <Repeater<CurriculumSubjectProps> draggable={false} componentType={CurriculumSubject} createElementFn={addNewCurriculumSubject} source={subjects} setSource={setSubjects} noSaveButton={true} label={'Przedmioty'} />}
            <Button className={"curriculum-form__button"} type="submit" text={"Zapisz"} disabled={false}></Button>
        </Form>
    )
}
