import { NeuralNetwork } from "brain.js";
import { useEffect, useState } from "react";

const { random, round } = Math;

interface IColor {
  r: number;
  g: number;
  b: number;
}

function App() {
  const [result, setResult] = useState<number>(0);
  const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
  const [trainingData, setTrainingData] = useState([
    { input: { r: 0, g: 0, b: 0 }, output: [1] },
    { input: { r: 1, g: 1, b: 1 }, output: [0] },
  ]);

  const net = new NeuralNetwork();

  function train() {
    const color = generateColor();
    setColor(color);
    net.train(trainingData);
    const resultColor = net.run(color) as Float32Array;
    setResult(round(resultColor[0]));
  }

  function generateColor() {
    return { r: random(), g: random(), b: random() };
  }

  function convertObjectToColor(color: IColor) {
    const { r, g, b } = color;
    return `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
  }

  useEffect(() => {
    train();
  }, []);

  function addTrainingData(differenter: number) {
    setTrainingData((trainingData) => [
      ...trainingData,
      {
        input: color,
        output: [Math.abs(result - differenter)],
      },
    ]);

    train();
    console.log(trainingData);
  }

  return (
    <div className="App">
      <div
        className="w-10 h-10 mt-5"
        style={{ backgroundColor: convertObjectToColor(color) }}
      >
        <p
          style={{
            color: convertObjectToColor({ r: result, g: result, b: result }),
          }}
        >
          Text
        </p>
      </div>
      <button onClick={() => train()}>Train</button>
      <h2>Is it suitable text color?</h2>
      <button
        className="w-16 bg-slate-400 py-2 text-center mr-3"
        onClick={() => addTrainingData(0)}
      >
        Yes
      </button>
      <button
        className="w-16 bg-slate-400 py-2 text-center"
        onClick={() => addTrainingData(1)}
      >
        No
      </button>
    </div>
  );
}

export default App;
