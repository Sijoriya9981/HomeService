"use client";

import BussinessList from '@/app/_component/BussinessList';
import GlobalApi from '@/app/_services/GlobalApi';
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
    const [businessListByCategory, setBusinessListByCategory] = useState([]);
    const category = React.use(params); // Use React.use() to unwrap the params

    useEffect(() => {
        if (category) {
            getBusinessByCategory(category.category); // Access the unwrapped category property
        }
    }, [category]);

    const getBusinessByCategory = (category) => {
        GlobalApi.getbussinessListbycategory(category)
            .then((res) => {
                console.log(res);
                setBusinessListByCategory(res.businessLists);
            })
            .catch((error) => {
                console.error("Error fetching business list:", error);
            });
    };

    return (
        <div className=''>
            <BussinessList title={category.category} bussinesslist={businessListByCategory} />
        </div>
    );
};

export default Page;
