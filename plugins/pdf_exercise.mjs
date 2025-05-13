/*  Plugin om exercises ook in pdf formaat te kunnen gebruiken. 
*     - Gebruikt process.argv om te kijken of we een pdf aan het maken zijn. 
*     - Als dat zo is, dan worden de exercises vervangen door een admonition met de title en text van de exercise.
*/

const exerciseTransform = {
  name: "conditional-exercise",
  doc: "Replace exercises in PDF builds.",
  stage: "document",
  plugin: (opts, utils) => (tree) => {
    // Detect if we are building a PDF
    const isPDF = process.argv.some(arg => arg.includes("pdf"));
    const labelMap = new Map();
    let exerciseCounter = 0;

    if (isPDF) {
      // Recursive function to process all nodes
      const processNode = (node) => {
        if (Array.isArray(node.children)) {
          node.children.forEach(processNode);
        }

        if (node.type === "exercise") {
          exerciseCounter++;
          console.log("[exercise plugin] replacing an exercise inside the pdf");

          const label = node.label || `exercise-${exerciseCounter}`;
          const number = exerciseCounter;

          
          labelMap.set(label, number);

          // Create the numbered title node
          const titleNode = {
            type: "paragraph",
            children: [{
              type: "text",
              value: `Exercise ${number}:`
            }]
          };

          // Convert to admonition with explicit title node
          node.type = "admonition";
          node.kind = "note";
          // Add the title node at the start of the children array
          node.children = [titleNode, ...(node.children || [])];
        }
        
        if (node.type === "solution") {
          console.log("[solution plugin] replacing a solution inside the pdf");

          // const label = node.label;
          const label = node.title;
          const exNum = labelMap.get(label) || "??";
          
          // Create the numbered solution title node
          const titleNode = {
            type: "paragraph",
            children: [{
              type: "text",
              value: `Solution to Exercise ${exNum}`
            }]
          };

          node.type = "admonition";
          node.kind = "tip";
          // Add the title node at the start of the children array
          node.children = [titleNode, ...(node.children || [])];
        }
      };

      // Process the entire tree
      processNode(tree);
    }
  },
};

const plugin = {
  name: "Conditional Exercise Plugin",
  transforms: [exerciseTransform],
};

export default plugin;

// /*  Plugin om exercises ook in pdf formaat te kunnen gebruiken. 
// *     - Gebruikt process.argv om te kijken of we een pdf aan het maken zijn. 
// *     - Als dat zo is, dan worden de exercises vervangen door een admonition met de title en text van de exercise.
// */

// // see (https://next.jupyterbook.org/plugins/directives-and-roles#create-a-transform)
// const exerciseTransform = {
//   name: "conditional-exercise",
//   doc: "Replace exercises in PDF builds.",
//   stage: "document",
//   plugin: (opts, utils) => (tree) => {
//     // Detect if we are building a PDF
//     const isPDF = process.argv.some(arg => arg.includes("pdf"));
//     const labelMap = new Map();

//     if (isPDF) {
//       // Only process the main document's children
//       const rootChildren = tree.children[0]?.children || [];
      
//       rootChildren.forEach((node, index) => {
//         if (node.type === "exercise") {
//           console.log("[exercise plugin] replacing an exercise inside the pdf");

//           const label = node.label || `exercise-${index + 1}`;
//           const number = index + 1;
//           const originalTitle = node.title || "Untitled exercise";
          
//           labelMap.set(label, number);

//           node.type = "admonition";
//           node.kind = "note";          
//           node.title = `Exercise ${number}: ${originalTitle}`;
//         }
//         if (node.type === "solution") {
//           console.log("[solution plugin] replacing a solution inside the pdf");

//           const label = node.label;
//           const exNum = labelMap.get(label) || "??";
          
//           node.type = "admonition";
//           node.kind = "tip";

//           node.title = `Solution to Exercise ${exNum}`;
//         }
//       });
//     }
//   },
// };

// const plugin = {
//   name: "Conditional Exercise Plugin",
//   transforms: [exerciseTransform],
// };

// export default plugin;
