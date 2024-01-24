import { ChangeEvent, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Alert, AlertType, Button, Form, Input, InputType, Loader, Select, SelectOption } from "../../../components";
import { AdminRole, CreateGroupResponse, UpdateGroupResponse } from "../../../types";
import './CreateGroupForm.scss';
import { get, getFile, patch, post } from "../../../functions";
import { AuthContext } from "../../../contexts";

interface CreateGroupFormProps {
    id?: string;
    onSubmitFn: Function,
}


export const CreateGroupForm = (props: CreateGroupFormProps) => {
    const { admin } = useContext(AuthContext) || {}
    const { id, onSubmitFn } = props;
    const [name, setName] = useState<string>("");
    const [teacher, setTeacher] = useState<string>("");
    const [admins, setAdmins] = useState<string[]>([]);
    const [teacherOptions, setTeacherOptions] = useState<SelectOption[]>([]);
    const [curriculumOptions, setCurriculumOptions] = useState<SelectOption[]>([]);
    const [adminsOptions, setAdminsOptions] = useState<SelectOption[]>([]);
    const [curriculum, setCurriculum] = useState<string>("");
    const [imageSrc, setImageSrc] = useState<string>("");
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<ReactNode>(null);

    const getOptions = useCallback(async () => {
        const teachers = await get('/staff/get-teachers?page=1&limit=1000')
        const curriculums = await get('/curriculum/get-all?page=1&limit=1000')
        const admins = await get('/admin/get-all?page=1&limit=1000')
        setCurriculumOptions(() => curriculums.items.map((curriculum: { id: string; name: string; }) => {
            return {
                value: curriculum.id,
                label: curriculum.name
            }
        }))
        setTeacherOptions(() => teachers.items.map((teacher: { id: string; name: string; }) => {
            return {
                value: teacher.id,
                label: teacher.name
            }
        }))
        setAdminsOptions(() => admins.items.map((admin: any) => {
            return {
                value: admin.id,
                label: admin.staff.name + " " + admin.staff.surname
            }
        }))
    }, [])


    const getGroup = useCallback(async () => {
        setIsLoading(() => true)
        const group = await get(`/group/get-one/${id}`)
        const photo = await getFile(`/group/get-photo/${id}`);
        console.log(group)
        setTeacher(() => group.teacher?.id)
        setCurriculum(() => group.curriculum.id)
        setAdmins(() => group.admins.map((admin: { id: string }) => admin.id))
        setName(() => group.name)
        setImageSrc(() => photo.url);
        setIsLoading(() => false)
    }, [id])

    useEffect(() => {
        if (admin?.role !== AdminRole.GroupAdmin)
            getOptions()
        if (id) {
            getGroup()
        }
    }, [id, getGroup, getOptions, admin])

    const handleChangeGroupName = (name: string) => {
        setName(name)
    }

    const handleChangeTeacher = (option: SelectOption) => {
        setTeacher(option.value as string)
    }

    const handleChangeCurriculum = (option: SelectOption) => {
        setCurriculum(option.value as string)
    }
    const handleChangeAdmins = (admins: string[]) => {
        setAdmins(admins)
    }

    const handleChangePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
            setPhotoFile(file)
        }
    };

    const handleSubmit = async () => {
        console.log(admins)
        const file = photoFile ? { label: 'photo', content: photoFile } : undefined
        const group = {
            name: name,
            teacherId: teacher,
            curriculumId: curriculum,
            adminIds: admins,
        }
        let response;
        if (id) {
            response = await patch('/group/update', {
                id: id,
                ...group
            },
                file,
            )
        } else {
            response = await post('/group/add', {
                ...group
            },
                file,
            )
        }
        if (response === CreateGroupResponse.Success || response === UpdateGroupResponse.Success) {
            onSubmitFn()
        } else {
            setAlert(<Alert message={'Błąd'} className={''} type={AlertType.Error} />)
            setTimeout(() => {
                setAlert(null)
            }, 2000)
        }


    }

    return (
        <Form onSubmitFn={handleSubmit} className={'group-form'}>
            {alert}
            <Input className={"group-form__select"} type={InputType.Text} onChangeFn={handleChangeGroupName} label="Nazwa" value={name} disabled={admin?.role === AdminRole.GroupAdmin ? true : false} />
            {admin?.role !== AdminRole.GroupAdmin && <><Select className={"group-form__select"} options={teacherOptions} label="Wychowawca" searchInput={true} selected={teacher} onChangeFn={handleChangeTeacher} />
                <Select className={"group-form__select"} selected={curriculum} label="Program" searchInput={true} options={curriculumOptions} onChangeFn={handleChangeCurriculum} />
                <Select className={"group-form__select"} selected={admins} multi={true} label="Administratorzy" searchInput={true} options={adminsOptions} onChangeFn={handleChangeAdmins} /> </>}
            <Input className={"staff-form__input"} type={InputType.File} label={'Zdjęcie'} onChangeFn={handleChangePhoto} photo={imageSrc} />
            <Button className={"group-form__button"} text={"Zapisz"} disabled={false}></Button>
            {isLoading && <Loader />}

        </Form>
    )
}
