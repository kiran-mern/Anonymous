import React from 'react';
import Leftbar from '../../components/user/Leftbar';
import AllGroup from '../../components/user/AvailableGroup';

const AvailableGroup = () => {
  return (
    <div className="flex">
      <Leftbar />
      <div className="flex-grow">
        <AllGroup />
      </div>
    </div>
  );
}

export default AvailableGroup;
