import { FaChevronDown } from "react-icons/fa";
import { FaQrcode } from "react-icons/fa";
import { IoMdCash } from "react-icons/io";
import Lookingfordriver from '../../component/uerPageComponent/Lookingfordriver';
import { UseContext } from "../../contextApi/context";
import { useState } from "react";
import PaymentOptions from "./PaymentOptions"

function PaymentBar () {
      const [isPaymentOption , setIsPaymentOption]=useState(false);
      const {paymentMethod } = UseContext();

     const handlePaymetoptionShow = () => {
        setIsPaymentOption(!isPaymentOption);
     }     

    return (
        <>
         <div className='h-full w-full p-4 flex flex-row justify-between '>
            <div onClick={() =>  setIsPaymentOption(!isPaymentOption)} className='flex flex-row items-center gap-4 ml-4 cursor-pointer'>
                <div className='flex gap-2' >
                     <img
                  src={`${paymentMethod !== "Cash" ?
                              "https://www.citypng.com/public/uploads/preview/download-black-qr-code-barcode-png-704081694711798fcch0jaztk.png" :
                            "https://p1.hiclipart.com/preview/754/703/590/background-green-money-cash-document-email-funding-games-png-clipart.jpg" 
                             }`}
                  alt="Cash"
                  className="w-6 h-6"
                />
                <p>{paymentMethod}</p>
                </div>
                 <FaChevronDown />
            </div>
            <div>
               
            </div>
            {isPaymentOption &&  <PaymentOptions onClose={handlePaymetoptionShow}/>}
         </div>
        </>
    )
}

export default PaymentBar