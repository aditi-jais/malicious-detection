import React, { useState } from "react";
import CodeAnalyzer from "./CodeAnalyzer";
import {data,Regex} from "./file";

const App = () => {
  const [code, setCode] = useState("");
  const [Malicious, setIsMalicious] = useState("");
  const [results, setresults] = useState(false);
  const [Errors1, setErrors1] = useState([]);
  const [Errors2, setErrors2] = useState([]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const analyzeCode = () => {
    // Implement analysis Regular Expression
    const maliciousRegex=[];
    for (const i in Regex) {
      maliciousRegex.push(Regex[i]);
    }
    const error1 = maliciousRegex.filter(item => item.pattern.test(code));
    
    // Implement analysis Keyword Matching
    const maliciousPatterns = [];
    for (const key in data) {
      maliciousPatterns.push(key);
    }
    const error2 = maliciousPatterns.filter((pattern) => code.includes(pattern));

    // var isMaliciousCode = false;
    if (error1.length > 0||error2.length>0) {
      // isMaliciousCode = true;
      setErrors1(error1);
      setErrors2(error2);
      setresults(true);
      if(error1.length>0&&error2.length>0)
      setIsMalicious("Malicious code detected by both Keyword Matching and Regular Expression.");
      else if(error1.length>0)
      setIsMalicious("Malicious code detected by Regular Expression.");
      else
      setIsMalicious("Malicious code detected by Keyword Matching.");
    }
    else{
      setIsMalicious("Neither of Keyword Matching nor Regular Expression can detect malicious code.");
    }

  };
  const clear = () => {
    setCode("");
    setIsMalicious(false);
    setresults(false);
    setErrors1([]);
    setErrors2([]);
  };
  return (
    <div>
      <h1>Malicious JavaScript Detector</h1>
      <textarea
        rows="10"
        cols="50"
        value={code}
        onChange={handleCodeChange}
        placeholder="Enter JavaScript code here..."
      ></textarea>
      <br />
      <button onClick={analyzeCode}>Analyze Code</button>
      <button onClick={clear}>Clear</button>
      <h3 style={{ color: "#e06c75" }}>{Malicious}</h3>
      {results && (<CodeAnalyzer code={code} errors1={Errors1} errors2={Errors2} />)}

      {/* <EsLint code={code} /> */}

    </div>
  );
};

export default App;
