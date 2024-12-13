import React from 'react';
import Image from 'next/image';
const Busniessdescription = ({ bussineesbyid }) => {
    return bussineesbyid && (
        <div>
            <h2 className='font-bold text-[25px] '>Description</h2>
            <p className='mt-4 text-lg text-gray-600'>{bussineesbyid.about}</p>

            <h2 className='font-bold text-[25px] mt-8'>Gallary</h2>
            <div className='grid grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 gap-5 mt-5'>
                {bussineesbyid?.images?.map((item, index) => (
                    <Image src={item?.url} key={index}
                        alt='image'
                        width={700}
                        height={100}
                        className='rounded-lg h-[200px]' />
                ))}
            </div>
        </div>
    );
}

export default Busniessdescription;
