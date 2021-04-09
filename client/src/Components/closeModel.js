import React,{useState} from 'react';


const CloseModel = () => {

    const[values,setvalues] = useState({
        show:false
    })

    const {show} = values;
    const toggleModal=()=>{
        setvalues({show:!show});
    }

    return (
        <div>
        <button onClick={()=>{toggleModal()}} >X</button>
        </div>
    );
}

export default CloseModel;
