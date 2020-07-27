import React from "react";

const Game = React.forwardRef(
  ({ className, role, style, tabIndex, title }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        tabIndex={tabIndex}
        style={{
          display: "inline-block",
          ...style,
        }}
        title={title}
        role={role}
      />
    );
  }
);

export default Game;
