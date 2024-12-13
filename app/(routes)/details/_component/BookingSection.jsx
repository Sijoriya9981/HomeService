import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button';
import GlobalApi from '@/app/_services/GlobalApi';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import moment from 'moment/moment';

const BookingSection = ({ children, bussineesbyid }) => {
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTime, setSelectedTime] = useState();
    const { data: session } = useSession();

    const [bookedslot, setbookedslot] = useState([])
    const user = session?.user;

    useEffect(() => {
        generateTimeSlots();

    }, []);

    const generateTimeSlots = () => {
        const timeList = [];
        for (let i = 10; i <= 12; i++) {
            timeList.push(`${i}:00 AM`, `${i}:30 AM`);
        }
        for (let i = 1; i <= 6; i++) {
            timeList.push(`${i}:00 PM`, `${i}:30 PM`);
        }
        setTimeSlot(timeList);
    };

    const saveBooking = () => {
        if (!bussineesbyid || !user) {
            toast("Unable to book. Missing business or user information.");
            return;
        }
        // const date = new Date(); // Current date and time
        // const formattedDate = date.toISOString().split('T')[0];
        GlobalApi.createnewbooking(bussineesbyid.id, moment(date).format('DD-MMM-yyyy'), selectedTime, user.email, user.name)

            .then((response) => {

                setDate();
                setSelectedTime('');
                toast("Service booked successfully!");
            })
            .catch((error) => {
                console.error("GraphQL Error: ", error);
                toast(error.message || "Failed to book service. Please try again.");
            });

    };


    const BussinessBookedslot = () => {

        GlobalApi.getbookeedslot(bussineesbyid.id, moment(date).format('DD-MMM-yyyy'))
            .then(resp => {
                setbookedslot(resp.bookings)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        date && BussinessBookedslot();
    }, [date])


    const isslotbooked = (time) => {
        return bookedslot.some(item => item.time === time);
    }
    return (
        bussineesbyid && (
            <div>
                <Sheet>
                    <SheetTrigger asChild>
                        {children}
                    </SheetTrigger>
                    <SheetContent className="overflow-auto">
                        <SheetHeader>
                            <SheetTitle>Book a Service</SheetTitle>
                            <SheetDescription>
                                Select Date and Time slot to book a service.
                            </SheetDescription>

                            {/* Date Picker */}
                            <div className="flex flex-col gap-5 items-baseline  ">
                                <h2 className="mt-5 font-bold">Select Date</h2>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border"
                                />
                            </div>

                            {/* Time Slot Picker */}
                            <h2 className="my-5 font-bold  text-left  ">Select Time Slot</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {timeSlot.map((item, index) => (
                                    <Button
                                        key={index}
                                        disabled={isslotbooked(item)}
                                        variant='outline'
                                        className={`border rounded-full p-2 px-3
                bg-white text-black
                hover:bg-purple-500 hover:text-white
                ${selectedTime === item ? "bg-purple-500 text-white" : ""}`}
                                        onClick={() => setSelectedTime(item)}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </div>
                        </SheetHeader>

                        {/* Footer Buttons */}
                        <SheetFooter className="mt-5">
                            <SheetClose asChild>
                                <div className="flex gap-5">
                                    <Button variant="destructive" className="">
                                        Cancel
                                    </Button>

                                    <Button
                                        className="bg-green-500 hover:bg-green-600"
                                        disabled={!(selectedTime && date)}
                                        onClick={() => saveBooking()}
                                    >
                                        Book
                                    </Button>
                                </div>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        )
    );
};

export default BookingSection;
