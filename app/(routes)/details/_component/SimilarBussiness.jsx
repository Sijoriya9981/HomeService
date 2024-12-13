import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { NotebookPen } from 'lucide-react';
import Link from 'next/link';
import GlobalApi from '@/app/_services/GlobalApi';
import BookingSection from './BookingSection';
import Image from 'next/image';
Image
useState
BookingSection
GlobalApi
useEffect

Link
const SimilarBussiness = ({ bussineesbyid }) => {
    const [businessListByCategory, setBusinessListByCategory] = useState([]);
    const category = bussineesbyid?.category?.name; // Use React.use() to unwrap the params
    useEffect(() => {
        if (bussineesbyid) {
            getBusinessByCategory(category); // Access the unwrapped category property
        }
    }, [bussineesbyid]);

    const getBusinessByCategory = () => {
        GlobalApi.getbussinessListbycategory(category)
            .then((res) => {

                setBusinessListByCategory(res.businessLists);
            })
            .catch((error) => {
                console.error("Error fetching business list:", error);
            });
    };

    return (
        <div className='md:pl-10'>
            {
                bussineesbyid && <BookingSection bussineesbyid={bussineesbyid}>
                    <Button className='bg-purple-500 hover:bg-purple-500 flex gap-2 w-full'>
                        <NotebookPen />
                        Book Appointment
                    </Button >
                </BookingSection>}
            <div className='hidden md:block'>
                <h2 className='font-bold 
      text-lg mt-3 mb-3
      
      '>Similar Business</h2>
                <div className=' '>
                    {businessListByCategory && businessListByCategory.map((business, index) => (
                        <Link key={index} href={'/details/' + business.id} className="flex gap-2 mb-4
          hover:border rounded-lg p-2
          cursor-pointer hover:shadow-md
           border-primary">
                            <Image src={business?.images[0].url}
                                alt={business.name}
                                width={100}
                                height={80}
                                className='rounded-lg object-cover h-[100px] ml-0'
                            />
                            <div className=''>
                                <h2 className='font-bold'>{business.name}</h2>
                                <h2 className='text-primary'>{business.contactPerson}</h2>
                                <h2 className='text-gray-400'>{business.address}</h2>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SimilarBussiness;
