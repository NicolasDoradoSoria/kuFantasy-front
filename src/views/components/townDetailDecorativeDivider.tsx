const TownDetailDecorativeDivider = () => {
  return (
    <div className="w-full flex justify-center my-4">
      <svg height="16" width="180">
        <line
          x1="0"
          y1="8"
          x2="180"
          y2="8"
          stroke="#bfa14a"
          strokeWidth="4"
          strokeDasharray="12,8"
        />
        <circle cx="90" cy="8" r="6" fill="#bfa14a" />
      </svg>
    </div>
  );
};

export default TownDetailDecorativeDivider;
