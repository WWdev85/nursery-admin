import { Route, Routes } from 'react-router-dom';
import { ChangePwdView, LoginView, Roles, SendCodeView, StaffMembers } from '../..//views';
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
            </Routes>




        </section>
    )
}