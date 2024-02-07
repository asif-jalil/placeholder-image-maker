const generateRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return ['#', '0'.repeat(6 - randomColor.length), randomColor].join('');
};

export default generateRandomColor;
