"use client"
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Bookinghistory from './_component/Bookinghistory';
import { useSession } from 'next-auth/react'
import GlobalApi from '@/app/_services/GlobalApi';
GlobalApi
Bookinghistory
const MyBooking = () => {
    const [userbooking, setuserbooking] = useState([]);
    const { data } = useSession();
    useEffect(() => {
    }, [data])
    useEffect(() => {
        data?.user?.email && getuserbookingdetail()
    }, [data])
    const getuserbookingdetail = () => {
        GlobalApi.getbookingofuser(data?.user?.email)
            .then(res => {
                setuserbooking(res.bookings)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const filterData = (type) => {
        const result = userbooking.filter(item =>
            type == 'booked' ?
                new Date(item.date) >= new Date()
                : new Date(item.date) <= new Date());

        return result;
    }
    return (
        <div className='my-10 mx-5 md:mx-36'>
            <h2 className='font-bold  text-[20px] my-2'>My Bookings</h2>
            <Tabs defaultValue="booked" className="w-full">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="booked">Booked</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="booked">

                    <Bookinghistory userbooking={filterData('booked')} />
                </TabsContent>
                <TabsContent value="completed">
                    <Bookinghistory userbooking={filterData('completed')} />
                </TabsContent>
            </Tabs>

        </div>
    );
}

export default MyBooking;
