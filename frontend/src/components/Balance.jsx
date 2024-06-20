import React from "react";

const Balance = ({ balance }) => {
  return (
    <div className="flex gap-5 p-4 bg-gray-100 rounded-sm border justify-center">
      <h1 className="font-normal">Yor Balance</h1>
      <p className="text-green-800 font-bold">{`Rs.${balance}`}</p>
    </div>
  );
};

export default Balance;
