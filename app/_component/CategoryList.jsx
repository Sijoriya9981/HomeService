import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
Image
Link
const CategoryList = ({ categorylist }) => {
    return (
        <div className='mx-4 md:mx-22 lg:mx-52  grid grid-cols-3
    md:grid-cols-4 lg:grid-cols-6 gap-4  '>
            {
                categorylist.length > 0 ?
                    categorylist.map((item, index) => (
                        <Link href={'/search/' + item.name} key={item.id} className=' bg-[#faf5ff] flex flex-col items-center justify-center gap-2 pt-5 pb-4 rounded-lg cursor-pointer hover:scale-110 transition-all ease-in-out'>
                            <Image alt='icon' src={item.icon.url} width={35} height={35} />
                            <h2 className='text-purple-500'>{item.name}</h2>
                        </Link>
                    )) :
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} className='h-[100px] w-full bg-slate-200 animate-pulse rounded-lg' ></div>
                    ))
            }
        </div>
    );
}

export default CategoryList;


