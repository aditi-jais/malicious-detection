import React from 'react';
// import {data,Regex} from "./file"
import Parser from "./parser";



const CodeAnalyzer = ({ code, errors1, errors2 }) => {
  // Implement more sophisticated code analysis here if needed

  return (
    <div>
      <h2>Code Analysis Results:</h2>
      <pre>{code}</pre>
      {errors1.length > 0 && 
        <ul >
        <h3>Detected by Regular Expression</h3>
        {errors1.map((val, index) => (
          <li style={{ color: "#e06c75" }} key={index}>{val.message}</li>

        ))}
      </ul>
      }
      {errors2.length > 0 &&
        <ul >
        <h3>Detected by Keyword Matching</h3>
        {errors2.map((pattern, index) => (
          <li style={{ color: "#e06c75" }} key={index}>{pattern}</li>

        ))}
      </ul>
      }
      
      <h3 >AST</h3>
      <Parser code={code} />
    </div>

  );
};

export default CodeAnalyzer;