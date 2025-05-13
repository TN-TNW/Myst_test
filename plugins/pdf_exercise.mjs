const exerciseTransform = {
  name: "conditional-exercise",
  doc: "Replace exercises and solutions in PDF builds.",
  stage: "document",
  plugin: (opts, utils) => (tree) => {
    const isPDF = process.argv.some(arg => arg.includes("pdf"));
    const labelMap = new Map();

    if (isPDF) {
      const rootChildren = tree.children[0]?.children || [];

      rootChildren.forEach((node, index) => {
        if (node.type === "exercise") {
          const label = node.label || `exercise-${index + 1}`;
          labelMap.set(label, index + 1);

          node.type = "admonition";
          node.kind = "note";
          node.title = `Exercise ${index + 1}`;
        }

        if (node.type === "solution") {
          const label = node.label;
          const exNum = labelMap.get(label) || "?";

          node.type = "admonition";
          node.kind = "tip";
          node.title = `Solution to Exercise ${exNum}`;
        }
      });
    }
  },
};
