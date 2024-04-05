import React,{useEffect, useState} from 'react'
import axios from "axios";

export default function Main() {
    // states for the form feileds
      const [date, setDate] = useState(null);
      const [sourceCurrency, setSourceCurrency] = useState();
      const [targetCurrency, setTargetCurrency] = useState();
      const [amountInSourceCurrency, setamountInSourceCurrency] =useState(0);
      const [amountInTargetCurrency ,setamountInTargetCurrency]=useState(0);
      const [currencyNames , setCurrencyNames] =useState([]);
      

    // handle submit method  
      const handlesubmit= async(e) =>{
          e.preventDefault();
          try{
               const responce = await axios.get("http://localhost:5000/covert", {params:{
               date,
               sourceCurrency,
               targetCurrency,
               amountInSourceCurrency,
          }
          }
               )
               // todo
                
          }catch(err){
            console.error(err);
          }
          
          
      };

    // get all currency names 
    useEffect (() => {
      const getCurrencyNames = async() => {
        try{
            const responce =await axios.get("http://localhost:5000/getAllCurrencies")
            setCurrencyNames (responce.data);

        } catch (err){
            console.error(err);
        }
      }; 
      getCurrencyNames();  
    },[]);
    
 
 
 
  return (
    <div>
      <h1 className='text-5xl text-green-500 font-bold lg:mx-20'> Convert Your Currencies Today</h1>
      <p className='lg:mx-30 opacity-40  py-6'>
        welcome to "convert currencies today "! this application allows you to easily convert currencies
         based on the latest echange rates. whether your are planning a trip , managing your fitneces, or 
         simply curious about the value of your money in different currencies , this is here to help.
    </p>
        <div className='mt-5 flex items-center justify-center flex-col'> 
            <section className='w-full lg:w-1/2'>
                <form onSubmit={handlesubmit}>
                     <div className='date mb-4'> 
                        <label 
                        htmlFor={date}
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                        <input 
                        onChange={(e)=> setDate(e.target.value)}
                        type="date"  name={date} id={date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="date" required />
                    </div>
                    <div className='sourceCurrency'>
                      <label
                      htmlFor={sourceCurrency}
                      >Source Currency</label>
                      <select 
                        onChange={(e) =>setSourceCurrency(e.target.value)}
                        type="text" name={sourceCurrency} id={sourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="date" required  >
                        <option value={sourceCurrency}>Select the source Currency</option>
                        {Object.keys(currencyNames).map((currency)=>(
                          <option className="p-1" key ={currency} value={currency}>
                            {currencyNames[currency]}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='target-currency'>
                      <label
                      htmlFor={targetCurrency}
                      >Target Currency</label>
                      <select 
                        onChange={(e)=>setTargetCurrency(e.target.value)}
                        type="text" id={targetCurrency} name={targetCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="date" required  >
                        <option value={targetCurrency}>Select the Target Currency</option>
                        {Object.keys(currencyNames).map((currency)=>{
                          <option className="p-1" key ={currency} value={currency}>
                            {currencyNames[currency]}
                          </option>
                        })}
                      </select>
                    </div>
                    <div className='date mb-4'> 
                        <label
                        htmlFor={amountInSourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in source currency</label>
                        <input 
                          onChange={(e)=>setamountInSourceCurrency(e.target.value)}
                          type="number" name={amountInSourceCurrency} id={amountInSourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount in source currency" required />
                    </div>
                      
                      <button className="bg-green-600 rounded hover:bg-green-700 text-cyan-50 font-medium  py-2 px-4">Get the target Currency</button>
                    
                </form > 
                      
                
            </section>
        </div>
    </div>

    
  )
}

