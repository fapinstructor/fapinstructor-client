/**
 * Borrowed parts from jest-styled-components with a customized print function.
 * Instead of injecting styles and modifying classes, this custom
 * serializer will remove them completely.
 */
import { styleSheetSerializer } from "jest-styled-components";

const KEY = "__jest-styled-components__";

type NodeType = {
  [KEY]: boolean;
  children: NodeType[];
};

const markNodes = (nodes: NodeType[]) =>
  nodes.forEach((node) => (node[KEY] = true));

const getNodes = (node: NodeType, nodes: NodeType[] = []) => {
  if (typeof node === "object") {
    nodes.push(node);
  }

  if (node.children) {
    Array.from(node.children).forEach((child) => getNodes(child, nodes));
  }

  return nodes;
};

/**
 * Remove all class attributes from the specified code
 */
const removeClassNames = (code: string) =>
  code
    // Remove the class and whitespace before it
    .replace(new RegExp('\\s+class=".+"', "g"), "")
    // When there are no other attributes, remove all whitespace after it
    .replace(new RegExp("(\\<\\w+)\\s+\\>", "g"), "$1>");

expect.addSnapshotSerializer({
  test: styleSheetSerializer.test,
  print(value, serialize) {
    /**
     * Mark the nodes we will serialize. The `styleSheetSerializer.test`
     * will skip anything we have already processed.
     */
    const nodes = getNodes(value as NodeType);
    markNodes(nodes);

    const code = serialize(value);
    const result = removeClassNames(code);

    return result;
  },
});
