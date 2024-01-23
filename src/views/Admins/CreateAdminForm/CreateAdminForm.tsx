import { ReactNode, useCallback, useEffect, useState } from "react";
import { Alert, AlertType, Button, Form, Loader, Select, SelectOption } from "../../../components";
import { AdminRole, CreateAdminResponse, GetOneAdminResponse } from "../../../types";
import './CreateAdminForm.scss';
import { get, post } from "../../../functions";

interface CreateAdminFormProps {
    id?: string;
    onSubmitFn: Function,
}


export const CreateAdminForm = (props: CreateAdminFormProps) => {
    const { id, onSubmitFn } = props

    const [staffMember, setStaffMember] = useState<SelectOption>({ value: "", label: "--------" })
    const [roleId, setRoleId] = useState<string>('')
    const [disabledOptionsIds, setDisabledOptionsIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<ReactNode>(null)

    const getAdmins = useCallback(async () => {
        setIsLoading(() => true)
        const admins = await get('/admin/get-all?page=1&limit=100')
        setIsLoading(() => false)
        const admin = admins.items.find((admin: GetOneAdminResponse) => admin?.id === id)
        if (admin) {
            setStaffMember({
                value: admin.staff.id,
                label: admin.staff.name + ' ' + admin.staff.surname,
            })

            setRoleId(() => admin.role)
        }


        setDisabledOptionsIds(admins.items.map((admin: GetOneAdminResponse) => admin?.staff?.id))
    }, [id, setDisabledOptionsIds])

    useEffect(() => {
        getAdmins()
    }, [getAdmins])

    const roles = [
        {
            value: AdminRole.SuperAdmin,
            label: "Administrator aplikacji"
        },
        {
            value: AdminRole.GroupAdmin,
            label: "Administrator Grupy"
        },
    ]

    const handleChangeStaffMember = (staffMember: SelectOption) => {
        setStaffMember(staffMember)
    }

    const handleChangeRole = (role: SelectOption) => {
        setRoleId(role.value as string)
    }

    const handleSubmit = async () => {
        let response;
        if (id) {
            response = await post('/admin/add', {
                id: id,
                staffId: staffMember.value as string,
                role: roleId
            })
        } else {
            response = await post('/admin/add', {
                staffId: staffMember.value as string,
                role: roleId
            })
        }
        if (response === CreateAdminResponse.Success) {
            onSubmitFn()
        } else {
            setAlert(<Alert message={'Błąd'} className={''} type={AlertType.Error} />)
            setTimeout(() => {
                setAlert(null)
            }, 2000)
        }


    }

    return (
        <Form onSubmitFn={handleSubmit} className={'admin-form'}>
            {alert}
            <Select className={"admin-form__select"} options={[staffMember]} label="Pracownik" searchInput={true} selected={staffMember.value} optionsUrl={'/staff/get-teachers?page=1&limit=100'} disabledOptionsIds={disabledOptionsIds} onChangeFn={handleChangeStaffMember} />
            <Select className={"admin-form__select"} selected={roleId} label="Rola" options={roles} onChangeFn={handleChangeRole} />
            <Button className={"admin-form__button"} text={"Zapisz"} disabled={false}></Button>
            {isLoading && <Loader />}

        </Form>
    )
}
