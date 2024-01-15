import { Route, Routes } from 'react-router-dom';
import { Admins, ChangePwdView, LoginView, Roles, SendCodeView, Settings, StaffMembers, Subjects } from '../..//views';
import './PageContent.scss';


export const PageContent = () => {
    return (
        <section className='page-content'>


            <Routes>
                <Route path='/login' element={<LoginView />} />
                <Route path='/reset-pwd' element={<SendCodeView />} />
                <Route path='/change-pwd/:id/:code' element={<ChangePwdView />} />
                <Route path='/staff' element={<StaffMembers />} />
                <Route path='/roles' element={<Roles />} />
                <Route path='/subjects' element={<Subjects />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/admins' element={<Admins />} />
            </Routes>




        </section>
    )
}