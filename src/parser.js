import React from 'react';
const esprima = require('esprima');
// const traverse = require('traverse');

const traverseASTForEval = (node) => {
    if (node.type === 'CallExpression' &&
        node.callee.type === 'Identifier' &&
        node.callee.name.toLowerCase() === 'eval') {
            // console.log("hehehhe ",node)
      return true; // Detected the use of the eval() function in AST
    }
    // Continue traversing the AST recursively
    // console.log("Node: ",node);
    for (const key in node) {
        // console.log(key);
      if (node[key] && typeof node[key] === 'object') {
        const result = traverseASTForEval(node[key]);
        if (result) {
          return true; // If eval is detected, stop further traversal
        }
      }
    }
    return false; // eval not detected in this subtree
  };
const traverseASTForcookie = (node) => {
    if (node.type === 'MemberExpression' &&
        node.object.type === 'Identifier' &&
        node.object.name.toLowerCase() === 'document'&&(node.property.name.toLowerCase() === 'cookie'||node.property.name.toLowerCase() === 'write')) {
            // console.log("hehehhe ",node)
      return true; // Detected the use of the eval() function in AST
    }
    // Continue traversing the AST recursively
    // console.log("Node: ",node);
    for (const key in node) {
        // console.log(key);
      if (node[key] && typeof node[key] === 'object') {
        const result = traverseASTForcookie(node[key]);
        if (result) {
          return true; // If eval is detected, stop further traversal
        }
      }
    }
    return false; // eval not detected in this subtree
  };

const Parser = ({ code }) => {
    let isMaliciousByAST = false;
    try {
        const ast = esprima.parseScript(code);
        // console.log(ast.body[0]);
        // console.log(ast.body[1]);
        // console.log(ast.body[2].expression);
        console.log(ast);

       


        isMaliciousByAST = traverseASTForEval(ast)||traverseASTForcookie(ast);
    } catch (error) {
        console.error('Error parsing code with Esprima:', error);
    }

    return (
        <div>
            <p >Malicious code detected by AST parsing: {isMaliciousByAST.toString()}</p>
            {/* {ast} */}
        </div>
    );


};

export default Parser;