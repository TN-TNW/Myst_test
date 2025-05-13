/*  Plugin om exercises ook in pdf formaat te kunnen gebruiken. 
*     - Gebruikt process.argv om te kijken of we een pdf aan het maken zijn. 
*     - Als dat zo is, dan worden de exercises vervangen door een admonition met de title en text van de exercise.
*/

// see (https://next.jupyterbook.org/plugins/directives-and-roles#create-a-transform)
const exerciseTransform = {
  name: "conditional-exercise",
  doc: "Replace exercises in PDF builds.",
  stage: "document",
  plugin: (opts, utils) => (tree) => {
    // Detect if we are building a PDF
    const isPDF = process.argv.some(arg => arg.includes("pdf"));
    const labelMap = new Map();

    if (isPDF) {
      // Only process the main document's children
      const rootChildren = tree.children[0]?.children || [];
      
      rootChildren.forEach((node, index) => {
        if (node.type === "exercise") {
          console.log("[exercise plugin] replacing an exercise inside the pdf");

          const label = node.label || `exercise-${index + 1}`;
          const number = index + 1;
          labelMap.set(label, number);

          node.type = "admonition";
          node.kind = "note";
          node.title = `Exercise ${number}`;
        }
        if (node.type === "solution") {
          console.log("[solution plugin] replacing a solution inside the pdf");
          
          node.type = "admonition";
          node.kind = "tip";
        }
      });
    }
  },
};

const plugin = {
  name: "Conditional Exercise Plugin",
  transforms: [exerciseTransform],
};

export default plugin;
