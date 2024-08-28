import {React, useEffect, useState} from 'react'

const RepairEstimate = () => {
    const [sparepart, setSparepart] = useState({
        name:"",
        amount:""
    });
    const [estimateList, setEstimateList] = useState([]);
    
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setSparepart((prev) => ({
            ...prev,
            [name]:value,
        }));
        calcTotal(sparepart);
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        try {  
            setEstimateList((preList) => [...preList, sparepart,]);
            setSparepart({name:"", amount:""});
            console.log(estimateList);
        } catch (error) {
            console.log('errrrrorrr');
        }
    }

    const calculateSubtotal = () => {
        return estimateList.reduce((total, item) => total + parseFloat(item.amount || 0), 0).toFixed(2);
    };

  return (
    <div style={{backgroundColor:'white', padding:'30px'}}>
        <h1 style={{textAlign:'center', fontSize:'30px', fontWeight:'bold'}}>Repair Estimate Calculator</h1>
        <form onSubmit={handleOnSubmit}>
            <label>Spare Part Name:</label>
            <input type='text' 
                   style={{border:'1px solid black', borderRadius:'10px', margin:'20px', padding:'5px'}}
                   placeholder='Spare Part Name'
                   name='name'
                   value={sparepart.name}
                   onChange={handleOnChange}
                   >        
            </input>
            <br/>
            <label>Spare Part Amount:</label>
            <input type='number' 
                   style={{border:'1px solid black', borderRadius:'10px', margin:'20px', padding:'5px'}}
                   placeholder='Spare Part Amount'
                   name='amount'
                   value={sparepart.amount}
                   onChange={handleOnChange}
                   >
            </input>
            <br/>
            <button type='submit'
                    style={{backgroundColor:'black', borderRadius:'10px', color:'white', padding:'5px'}}
            >Add To List</button>
        </form>

        <div>
            
            {estimateList.length <= 0 ? (<p>no list</p>) : (
                <ul>
                    {estimateList.map((item, index) => (
                        <li key={index}>
                            <strong>Name: </strong>{item.name}
                            <strong>Amount: </strong>{item.amount}
                        </li>
                    ))}
                    <strong>Subtotal: </strong>{calculateSubtotal()}
                </ul>
            )}
        </div>
    </div>
  )
}

export default RepairEstimate