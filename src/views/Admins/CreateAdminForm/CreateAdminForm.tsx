import { ReactNode, useCallback, useEffect, useState } from "react";
import { Alert, AlertType, Button, Form, Loader, Select, SelectOption } from "../../../components";
import { AdminRole, CreateAdminResponse, GetOneAdminResponse, GetOneGroupResponse, UpdateAdminResponse } from "../../../types";
import './CreateAdminForm.scss';
import { get, patch, post } from "../../../functions";

interface CreateAdminFormProps {
    id?: string;
    onSubmitFn: Function,
}


export const CreateAdminForm = (props: CreateAdminFormProps) => {
    const { id, onSubmitFn } = props

    const [staffMember, setStaffMember] = useState<SelectOption>({ value: "", label: "--------" })
    const [roleId, setRoleId] = useState<string>('')
    const [groups, setGroups] = useState<string[]>([]);
    const [groupsOptions, setGroupsOptions] = useState<SelectOption[]>([]);
    const [disabledOptionsIds, setDisabledOptionsIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<ReactNode>(null)

    const getAdmins = useCallback(async () => {
        setIsLoading(() => true)
        const admins = await get('/admin/get-all?page=1&limit=1000')
        console.log(admins)
        setIsLoading(() => false)
        const admin = admins.items.find((admin: GetOneAdminResponse) => admin?.id === id)

        if (admin) {
            setStaffMember({
                value: admin.staff.id,
                label: admin.staff.name + ' ' + admin.staff.surname,
            })
            setRoleId(() => admin.role)
            setGroups(() => admin.groups.map((group: GetOneGroupResponse) => group?.id))
        }
        setDisabledOptionsIds(admins.items.map((admin: GetOneAdminResponse) => admin?.staff?.id))
    }, [id, setDisabledOptionsIds])

    const getGroups = useCallback(async () => {
        const groups = await get('/group/get-all?page=1&limit=1000')
        setGroupsOptions(groups.items.map((group: any) => {
            return {
                value: group?.id,
                label: group?.name,
            }
        }))
    }, []);

    useEffect(() => {
        getGroups()
        getAdmins()
    }, [getAdmins, getGroups])

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
        if (role.value === AdminRole.SuperAdmin) {
            setGroups([])
        }
        setRoleId(role.value as string)
    }

    const handleChangeGroups = (groups: string[]) => {
        setGroups(groups)
    }

    const handleSubmit = async () => {
        let response;
        if (id) {
            response = await patch('/admin/update', {
                id: id,
                staffId: staffMember.value as string,
                role: roleId,
                groupIds: groups,
            })
        } else {
            response = await post('/admin/add', {
                staffId: staffMember.value as string,
                role: roleId,
                groupIds: groups,
            })
        }
        console.log(response, UpdateAdminResponse.Success)
        if (response === CreateAdminResponse.Success || response === UpdateAdminResponse.Success) {
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
            <Select className={"admin-form__select"} options={[staffMember]} label="Pracownik" disabled={id ? true : false} searchInput={true} selected={staffMember.value} optionsUrl={'/staff/get-teachers?page=1&limit=100'} disabledOptionsIds={disabledOptionsIds} onChangeFn={handleChangeStaffMember} />
            <Select className={"admin-form__select"} selected={roleId} label="Rola" options={roles} onChangeFn={handleChangeRole} />
            <Select className={"admin-form__select"} selected={groups} multi={true} disabled={roleId !== AdminRole.GroupAdmin ? true : false} searchInput={true} label="Grupy" options={groupsOptions} onChangeFn={handleChangeGroups} />
            <Button className={"admin-form__button"} text={"Zapisz"} disabled={false}></Button>
            {isLoading && <Loader />}

        </Form>
    )
}
