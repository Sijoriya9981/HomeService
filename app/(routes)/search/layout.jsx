import React from 'react';
import Categorysidebar from './_components/Categorysidebar';

const Layout = ({ children }) => {
    return (
        <div>
            <div className='grid  grid-cols-1 md:grid-cols-4 mt-7 ml-5'>
                <div className='hidden md:block '>
                    <Categorysidebar />
                </div>
                <div className='md:col-span-3'>

                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
