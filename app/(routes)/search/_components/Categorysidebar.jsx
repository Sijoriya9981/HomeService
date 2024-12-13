"use client";
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/_services/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Categorysidebar = () => {
    const [categorylist, setcategorylist] = useState([]);
    const [selectedcategory, setselectedcategory] = useState();
    const params = useParams(); // This returns an object

    useEffect(() => {
        getcategorylist();
    }, []);

    useEffect(() => {
        if (params?.category) {
            setselectedcategory(params.category); // Set the selected category based on the URL param
        }
    }, [params]); // Update the selected category when `params` changes

    const getcategorylist = () => {
        GlobalApi.getcategory().then(resp => {
            setcategorylist(resp.categories); // Set the category list from API response
        });
    };

    return (
        <div className='ml-3 mt-4'>
            <h2 className='font-bold mb-3 text-lg text-purple-500'>Categories</h2>
            <div className=''>
                {categorylist.map((item, index) => (
                    <Link
                        href={'/search/' + item.name}
                        key={index}
                        className={`flex gap-2 p-3 mb-3 md:mr-10 cursor-pointer hover:bg-purple-200 items-center hover:shadow-md hover:border-purple-300 border rounded-lg ${selectedcategory === item.name && 'border-purple-700'}`}
                    >
                        <Image src={item.icon.url} alt="icon" width={30} height={30} />
                        <h2>{item.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categorysidebar;
