"use client"
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
import React, { useEffect } from 'react';
Button
Link
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';

const Header = () => {

    const { data } = useSession();
    useEffect(() => {
    }, [data])
    return (
        <>
            <div className='p-2 shadow-sm flex justify-between items-center px-5'>
                <div className='flex'>


                    <Image src="/logo.svg" width={60} height={70} alt="" />
                    <Link href={'/'}>  <h3 className="text-2xl from-neutral-950 font-bold text-black-200 tracking-wide drop-shadow-lg">
                        CasaCare
                    </h3></Link>



                    <div className='md:flex mt-2 gap-8 hidden'>
                        <h2 className='ml-8 hover:scale-105 hover:text-purple-600 cursor-pointer' >Home</h2>
                        <h2 className='ml-8 hover:scale-105 hover:text-purple-600' >Service</h2>
                        <h2 className='ml-8 hover:scale-105 hover:text-purple-600' >About</h2>
                    </div>
                </div>
                <div>
                    {data?.user ? <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Image alt='user' width={40} height={40} className='rounded-full' src={data?.user?.image} />
                        </DropdownMenuTrigger >
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{data?.user.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem> <Link href={'/MyBooking'}>My Bookings</Link></DropdownMenuItem>
                            <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                        : <Button className="bg-purple-600 hover:bg-purple-500" onClick={() => signIn('descope')}>Login/Sign Up</Button>
                    }
                </div>
            </div>
        </>
    );
}

export default Header;
