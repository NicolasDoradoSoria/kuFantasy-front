import React from "react";

const Loader: React.FC = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-700 border-opacity-80" style={{ borderLeft: "4px solid #b4a078", borderRight: "4px solid #e9d8a6" }}></div>
  </div>
);

export default Loader;
