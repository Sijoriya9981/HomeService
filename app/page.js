"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Hero from "./_component/Hero";
import dotenv from 'dotenv';
dotenv.config();
import CategoryList from "./_component/CategoryList";
import GlobalApi from '../app/_services/GlobalApi'
import BussinessList from "./_component/BussinessList";
export default function Home() {
  const [categorylist, setcategorylist] = useState([])
  const [bussinesslist, setbussinesslist] = useState([])
  useEffect(() => {

    getcategorylist();
    getbussinesslist()
  }, []);

  const getcategorylist = () => {
    GlobalApi.getcategory().then(resp => {
      setcategorylist(resp.categories)
    })
  }
  const getbussinesslist = () => {
    GlobalApi.getbussinessList().then(resp => {
      setbussinesslist(resp.businessLists)
    })
  }
  return (
    <>
      <Hero />
      <CategoryList categorylist={categorylist} />
      <BussinessList bussinesslist={bussinesslist} title="Popular Bussiness" />


    </>
  );
}
