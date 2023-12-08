import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChangePwdView, LoginView, SendCodeView, StaffMembers } from '../..//views';
import './PageContent.scss';
import { AuthContextProvider } from '../..//contexts';

export const PageContent = () => {
    return (
        <section className='page-content'>


            <Routes>
                <Route path='/login' element={<LoginView />} />
                <Route path='/reset-pwd' element={<SendCodeView />} />
                <Route path='/change-pwd/:id/:code' element={<ChangePwdView />} />
                <Route path='/staff' element={<StaffMembers />} />

            </Routes>




        </section>
    )
}