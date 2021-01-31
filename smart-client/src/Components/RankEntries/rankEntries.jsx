import React from 'react';
import {useStateValue} from '../../Core/state';


const RankEntries = () => {

    const {
          state:{entriesValueBol,entriesValue},
          authState:{userDetails}
          } = useStateValue();
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