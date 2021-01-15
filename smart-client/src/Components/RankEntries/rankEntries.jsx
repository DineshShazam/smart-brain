import React from 'react';
import {useStateValue} from '../../Core/state';


const RankEntries = () => {

    const [{userDetails,entriesValueBol,entriesValue}] = useStateValue();
    console.log(entriesValueBol);
    console.log(entriesValue);
   return (
        <div>
        <div className='black f3'>
            {/* <p> your current entry count is...</p> */}
          {`${userDetails.name}, your current entry count is...`}
        </div>
        <div className='black f1'>
          {entriesValueBol ? entriesValue : userDetails.entries}
        </div>
      </div>
    )
}

export default RankEntries