import React from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

Button
const Hero = () => {
    return (
        <div className='flex items-center flex-col justify-center pt-14 pb-7'>
            <h2 className='font-bold text-[46px] text-center'>Find Home  <span className='text-purple-600'>Service?Repair </span>  <br></br> Near You</h2>
            <h2 className='text-xl text-grey-400'>Explore Best Home Service & Repair near you</h2>

            <div className='mt-4 flex gap-4 items-center'>
                <Input placeholder='Search' className='rounded-full md:w-[350px]' />
                <Button className='bg-purple-600 h-[45px]  hover:bg-purple-500 rounded-full'>
                    <Search className='h-4 w-4' />
                </Button>
            </div>
        </div>
    );
}

export default Hero;
