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

    if (isPDF) {
      // Only process the main document's children
      const rootChildren = tree.children[0]?.children || [];
      
      rootChildren.forEach((node, index) => {
        if (node.type === "exercise") {
          console.log(node);
          console.log("[exercise plugin] replacing exercise");
          node.type = "admonition";
          node.kind = "note";
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
