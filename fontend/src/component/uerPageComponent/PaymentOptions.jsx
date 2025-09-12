import { useState } from "react";
import { UseContext } from "../../contextApi/context";

function PaymentOptions({ onClose }) {
  const [useUberCash, setUseUberCash] = useState(false);


  const {paymentMethod , setPaymentMethod} = UseContext();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" >
      <div className="bg-gray-100 w-full max-w-md rounded-2xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Payment options</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>

        <div className="p-4 space-y-4">
          {/* Uber Cash Toggle */}
          <div>
            <p className="font-medium">Savari Cash: ₹0.00</p>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center space-x-2">
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/uber-10-761688.png"
                  alt="Uber"
                  className="w-6 h-6"
                />
                <span>Savari Cash: ₹0.00</span>
              </div>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={useUberCash}
                  onChange={() => setUseUberCash(!useUberCash)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-300 peer-checked:bg-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <p className="font-medium">Payment method</p>
            <div className="mt-2 space-y-2">
              {/* Cash Option 1 */}
              <label className="flex items-center space-x-2 p-2 border-b border-b-gray-300  cursor-pointer">
                <img
                  src="https://p1.hiclipart.com/preview/754/703/590/background-green-money-cash-document-email-funding-games-png-clipart.jpg"
                  alt="Cash"
                  className="w-6 h-6"
                />
                <span>Cash</span>
                <input
                  type="radio"
                  name="payment"
                  value="Cash"
                  checked={paymentMethod === "Cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="ml-auto"
                />
              </label>

              {/* Cash Option 2 */}
              <label className="flex items-center space-x-2 p-2 border-b border-b-gray-300 cursor-pointer">
                <img
                  src="https://www.citypng.com/public/uploads/preview/download-black-qr-code-barcode-png-704081694711798fcch0jaztk.png"
                  alt="Cash Alt"
                  className="w-6 h-6"
                />
                <span className=''>UPI Scan and Pay</span>
                <input
                  type="radio"
                  name="payment"
                  value="UPI Scan and Pay"
                  checked={paymentMethod === "UPI Scan and Pay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="ml-auto"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="p-4 ">
          <button onClick={onClose}  className="w-full bg-black text-white py-3 rounded-lg font-medium">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

 export default PaymentOptions;