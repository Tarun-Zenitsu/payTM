import React from "react";

const Appbar = () => {
  return (
    <div className="flex justify-between p-3 bg-slate-200">
      <div className="bg-white p-3 rounded-xl text-center">PayTM App</div>
      <div className="flex items-center gap-2">
        <div>Hellow</div>
        <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center">
          U
        </div>
      </div>
    </div>
  );
};

export default Appbar;
