import { Calendar, Clock, MapPin, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';

const Bookinghistory = ({ userbooking }) => {
    console.log(userbooking);

    const cancelAppointment = (booking) => {
        GlobalApi.deleteBooking(booking.id).then(resp => {
            if (resp) {
                toast('Booking Deleted Successfully!');
            }
        }, (e) => {
            toast('Error while canceling booking!');
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {userbooking?.map((booking, index) => (
                <div key={index} className="border rounded-lg p-4 mb-5">
                    {/* Check if businessList and its elements exist */}
                    {booking?.businessList?.[0]?.name && (
                        <div className="flex gap-4">
                            {/* Business Image */}
                            <Image
                                src={booking?.businessList[0]?.images[0]?.url}
                                alt="business-image"
                                width={120}
                                height={120}
                                className="rounded-lg object-cover"
                            />
                            <div className="flex flex-col gap-2">
                                {/* Business Name */}
                                <h2 className="font-bold">{booking?.businessList[0]?.name}</h2>
                                {/* Contact Person */}
                                <h2 className="flex gap-2 text-purple-500">
                                    <User /> {booking?.businessList[0]?.contactPerson}
                                </h2>
                                {/* Address */}
                                <h2 className="flex gap-2 text-gray-500">
                                    <MapPin className="text-purple-500" /> {booking?.businessList[0]?.address}
                                </h2>
                                {/* Service Date */}
                                <h2 className="flex gap-2 text-gray-500">
                                    <Calendar className="text-purple-500" />
                                    Service on : <span className="text-black">{booking?.date}</span>
                                </h2>
                                {/* Service Time */}
                                <h2 className="flex gap-2 text-gray-500">
                                    <Clock className="text-purple-500" />
                                    Service on : <span className="text-black">{booking?.time}</span>
                                </h2>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Bookinghistory;
