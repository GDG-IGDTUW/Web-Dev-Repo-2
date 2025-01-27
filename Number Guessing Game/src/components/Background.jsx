const numbers = [
    { value: 3, style: { top: "5%", left: "2%", transform: "rotate(15deg)" } },
    { value: 7, style: { top: "10%", right: "5%", transform: "rotate(-10deg)" } },
    { value: 1, style: { bottom: "10%", left: "3%", transform: "rotate(5deg)" } },
    { value: 8, style: { bottom: "5%", right: "2%", transform: "rotate(-15deg)" } },
    { value: 9, style: { top: "3%", left: "45%", transform: "rotate(20deg)" } },
    { value: 5, style: { bottom: "3%", right: "30%", transform: "rotate(-5deg)" } },
    { value: 4, style: { top: "50%", left: "2%", transform: "rotate(10deg)" } },
    { value: 6, style: { top: "35%", right: "2%", transform: "rotate(15deg)" } },
    { value: 2, style: { bottom: "15%", left: "25%", transform: "rotate(-10deg)" } },
  ];
  
  export default function Background() {
    return (
      <div className="absolute inset-0 random-numbers">
        {numbers.map(({ value, style }, index) => (
          <span key={index} style={{ ...style, position: "absolute" }}>
            {value}
          </span>
        ))}
      </div>
    );
  }
  