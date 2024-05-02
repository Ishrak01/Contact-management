"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { FaPhoneVolume } from "react-icons/fa6";
import { IoMan } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useSaveContactMutation } from "./Features/Contact/contactApi";

const Page = () => {

  const [saveContact,{data}]=useSaveContactMutation()

  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");

  const handleCreateContact = (e) => {
    e.preventDefault();

    saveContact({
      name,
      email,
      phone
    });
  }

  useEffect(() => {
    if (data) {
      toast.success('Successfully created')
      setName("");
      setEmail("");
      setPhone("");
     
    }
  }, [data, ]);




  return (
    <div className="mx-auto space-y-10 h-screen">
      <div className="text-center items-center p-3">
        <Link href="/AdminPage" className="text-center font-bold text-red-600  ">Go to Admin Page</Link>

      </div>
      <div className="bg-blue-500 justify-between flex mx-4">
        <p1 className="text-white font-bold m-3" >DEMO LOGO</p1>
        <input
          type="text"
          placeholder="Search"
          onChange
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>


      <div className="mx-10 flex justify-between ">
        <form onSubmit={handleCreateContact} className="w-[500px] space-y-8">


          <span className="flex items-center gap-2">
            <IoMan />
            <input

              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </span>
          <span className="flex items-center gap-2">
            <MdEmail />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
          <span className="flex items-center gap-2">
            <FaPhoneVolume />
            <input
              type="phone"
              id="phone"

              placeholder="Phone"
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </span>
          <span className="flex items-center gap-2">

            <button className="px-4 py-2 border border-gray-300 bg-blue-500 text-white rounded-md w-full focus:outline-none focus:border-blue-500">
              Send Message

            </button>
          </span>
        </form>

        <Image src="/contact.svg" width={400} height={300} alt="contact" />

      </div>





    </div>
  )
}

export default Page