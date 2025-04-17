import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 text-primary text-sm">
      <span>Someone is typing</span>
      <div className="flex space-x-1">
        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-0"></div>
        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-150"></div>
        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
