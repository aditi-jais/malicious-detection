const Regex = [
    { pattern: /\b(?:eval)\b/, message: "Use of Eval" },
    { pattern: /^(a+)+$/, message: "Infinite repetative unknown input" }
  ];

const data = {
    "eval": "the eval function in JavaScript is considered risky, opt for safer alternatives like JSON.parse or the Function constructor",

    "document.write": "document.write in JavaScript is discouraged due to its potential to disrupt page loading, block rendering, create accessibility issues, and complicate maintenance.",
    "document.cookie": "document.write in JavaScript is discouraged due to its potential to disrupt page loading, block rendering, create accessibility issues, and complicate maintenance."
}    

export {data,Regex};