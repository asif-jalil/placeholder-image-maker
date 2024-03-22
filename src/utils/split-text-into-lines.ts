const splitTextIntoLines = (context: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
  const words = text.split(' ');

  return words.reduce((lines: string[], word: string) => {
    const line = lines[lines.length - 1];
    const updatedLine = line ? [line, word].join(' ') : word;
    const metrics = context.measureText(updatedLine);
    const testWidth = metrics.width;

    if (line && testWidth > maxWidth) {
      lines.push(word);
    } else if (line) {
      lines[lines.length - 1] = updatedLine; // Update the current line
    } else {
      lines.push(updatedLine); // Push the first word as the first line
    }

    return lines;
  }, []);
};

export default splitTextIntoLines;
