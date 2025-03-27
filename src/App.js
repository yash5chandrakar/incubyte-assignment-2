import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [inputValue, setInputValue] = useState('');

  const calculateStringValue = (str) => {
    if (!str) {
      return 0;
    }

    let result = 0;
    let defaultSeparator = ","
    let includesDelimiter = str?.includes("//");
    let negativeNumberArray = []

    if (includesDelimiter) {
      let strArray = str?.split('\n', 2);
      let newDelimiter = strArray[0]?.slice(2);
      defaultSeparator = newDelimiter
      str = strArray[1]
    }

    // console.log(str,defaultSeparator)

    str = str.replace(/(?:\r\n|\r|\n)/g, defaultSeparator);

    // console.log(str)


    str?.split(defaultSeparator)?.map((el) => {
      if (parseInt(el) < 0) {
        negativeNumberArray.push(el)
      }
      result += parseInt(el) || 0;
    })

    if (negativeNumberArray?.length > 0) {
      toast.error(`negative numbers not allowed : ${negativeNumberArray?.join(", ")}`)
      return
    }

    return result
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCalculate = () => {
    let calculatedValue = calculateStringValue(inputValue)
    if (calculatedValue) {
      toast.success(`Result is : ${calculatedValue}`)
    }
  }

  return (
    <div className="App">
      <ToastContainer />
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a number"
            className="input"
          />
          <button onClick={handleCalculate} className="button">
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
