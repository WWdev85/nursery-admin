
import { Button, Column, ContentWrapper, Table } from "../../components"

export const StaffMembers = () => {


    const columns: Column[] = [
        {
            title: "Nazwisko",
            key: "surname",
            width: 200
        },
        {
            title: "Imię",
            key: "name",
            width: 200
        },
        {
            title: "E-mail",
            key: "email",
            width: 200
        },
        {
            title: "Numer telefonu",
            key: "phone",
            width: 200
        },
        {
            title: "Rola",
            key: "role.name",
            width: 200
        },
        {
            title: "Widoczny",
            key: "isVisible",
            width: 150
        },
        {
            title: "Adres",
            key: "address",
            width: 400
        },
    ]



    return (
        <div className='staff'>

            <ContentWrapper title={'Pracownicy'}>
                <Table sourceUrl={'/staff/get-all'} columns={columns} actions={true} orderBy="surname" />
                <Button className={'content-wrapper__add-button'} text={"Dodaj"} disabled={false} />
            </ContentWrapper>

        </div>
    )
}