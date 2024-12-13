import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BussinessList = ({ bussinesslist, title }) => {
    return (
        <>
            <div className="mt-5 mx-4 md:mx-10">
                <h2 className="font-bold text-[18px]">{title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
                    {bussinesslist.length > 0 ? (
                        bussinesslist.map((item, index) => (
                            <Link
                                href={'/details/' + item.id}
                                key={index}
                                className="shadow-md rounded-lg hover:shadow-lg cursor-pointer hover:shadow-purple-400 hover:scale-105 transition-all ease-in-out"
                            >
                                <Image
                                    src={item.images[0]?.url}
                                    alt={item.name}
                                    width={500}
                                    height={200}
                                    className="h-[150px] md:h-[200px] object-cover rounded-t-lg"
                                />
                                <div className="flex flex-col items-baseline p-3 gap-1">
                                    <h2 className="p-1 text-purple-900 bg-purple-200 rounded-full px-2 text-[12px] whitespace-nowrap">
                                        {item.category?.name || 'No Category'}
                                    </h2>
                                    <h2 className="font-bold text-md truncate">{item.name}</h2>
                                    <h2 className="text-purple-800 truncate">{item.contactPerson}</h2>
                                    <h2 className="text-gray-500 text-sm truncate">{item.address}</h2>
                                    <Button className="bg-purple-500  hover:bg-purple-400 mt-2">
                                        Book Now
                                    </Button>
                                </div>
                            </Link>
                        ))
                    ) : (
                        [1, 2, 3, 4, 5, 6].map((item, index) => (
                            <div
                                key={index}
                                className="h-[300px] w-full bg-slate-200 animate-pulse rounded-lg"
                            ></div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default BussinessList;
