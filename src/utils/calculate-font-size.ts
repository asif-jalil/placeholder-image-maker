const calculateFontSize = (width: number, height: number): number => {
  let widthFactor: number;
  let heightFactor: number;

  if (height < 150) {
    heightFactor = height / 6;
  } else if (height < 250) {
    heightFactor = height / 7;
  } else {
    heightFactor = height / 2;
  }

  if (width < 200) {
    widthFactor = width / 5;
  } else {
    widthFactor = width / 9;
  }

  return Math.min(widthFactor, heightFactor);
};

export default calculateFontSize;
