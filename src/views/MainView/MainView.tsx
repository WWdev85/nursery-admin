import { useState } from 'react';
import { PageContent, PageHeader, PageNavbar } from '../../components';
import './MainView.scss';

export const Main = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
    return (
        <div className='main-view'>
            <PageHeader isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />
            <PageNavbar isNavbarOpen={isNavbarOpen} />
            <PageContent />
        </div>
    )
}