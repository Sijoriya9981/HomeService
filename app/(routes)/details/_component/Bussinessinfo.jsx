import Image from 'next/image';
import React from 'react';
Image
import { Clock, Mail, Share, User } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import serviceimaage from '../../../../public/image.png'
const Bussinessinfo = ({ bussineesbyid }) => {
    const imageUrl = bussineesbyid?.images?.length > 0
        ? bussineesbyid.images[0].url
        : serviceimaage;
    return (
        <div className='flex gap-4 items-center'>
            <Image
                src={imageUrl}
                alt={bussineesbyid.name || "service"}
                width={150}
                height={200}
                className='rounded-full h-[150px] object-cover'
            />

            <div className='flex justify-between items-center w-full'>
                <div className='flex flex-col mt-4 md:mt-0 items-baseline gap-3'>
                    <h2 className='text-primary p-1 px-3
        text-lg 
        bg-purple-100 rounded-full'>{bussineesbyid?.category?.name}</h2>
                    <h2 className='text-[40px] font-bold'>{bussineesbyid.name}</h2>
                    <h2 className='flex gap-2 text-lg text-gray-500'><MapPin /> {bussineesbyid.address}</h2>
                    <h2 className='flex gap-2 text-lg text-gray-500'>
                        <Mail />
                        {bussineesbyid?.email}</h2>
                </div>
                <div className='flex flex-col gap-5 items-end'>
                    <Button className='bg-purple-600 hover:bg-purple-600'><Share /></Button>
                    <h2 className='flex gap-2 text-xl text-purple-500'><User /> {bussineesbyid.contactPerson} </h2>
                    <h2 className='flex gap-2 text-xl text-gray-500'><Clock /> Available 8:00 AM to 10:PM </h2>

                </div>
            </div>
        </div>

    );
}

export default Bussinessinfo;
