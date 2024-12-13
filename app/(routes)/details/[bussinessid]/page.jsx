"use client"
import GlobalApi from '@/app/_services/GlobalApi';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Bussinessinfo from '../_component/Bussinessinfo';
import Busniessdescription from '../_component/Busniessdescription';
import SimilarBussiness from '../_component/SimilarBussiness';
import { useParams } from 'next/navigation';

const Bussinessdetail = () => {
    const { data, status } = useSession();
    const [bussineesbyid, setbussineesbyid] = useState([]);
    const params = useParams()
    const getbussineesbyidfun = () => {

        GlobalApi.getbussinessByid(params.bussinessid).then(resp => {
            setbussineesbyid(resp.businessList);
        })


    }
    const checkUserAuth = () => {
        if (status == 'loading') {
            return <p>Loading...</p>
        }

        if (status == 'unauthenticated') {
            signIn('descope');
        }


    }


    useEffect(() => {
        if (params?.bussinessid) {
            getbussineesbyidfun();
        }
    }, [params?.bussinessid]);

    useEffect(() => {
        checkUserAuth();
    }, []);
    return status == 'authenticated' && bussineesbyid && (
        <div className='py-8 md:py-20
        px-10 md:px-36'>

            <Bussinessinfo bussineesbyid={bussineesbyid} />

            <div className='grid grid-cols-3 mt-16'>
                <div className='col-span-3 md:col-span-2 order-last md:order-first'>
                    <Busniessdescription bussineesbyid={bussineesbyid} />
                </div>
                <div className=''>
                    <SimilarBussiness bussineesbyid={bussineesbyid} />
                </div>
            </div>

        </div>


    );
}

export default Bussinessdetail;
