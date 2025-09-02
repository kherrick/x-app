export function nodeSelectorAll(node, selector, doc = document) {
  const nodes = [...node.querySelectorAll(selector)];
  const nodeIterator = doc.createNodeIterator(
    node,
    NodeFilter.SHOW_ELEMENT,
    function (node) {
      if (node instanceof Element) {
        if (node.shadowRoot) {
          return NodeFilter.FILTER_ACCEPT;
        }
      }

      return NodeFilter.FILTER_REJECT;
    }
  );

  let currentNode = nodeIterator.nextNode();

  while (currentNode) {
    nodes.push(...nodeSelectorAll(currentNode.shadowRoot, selector));
    currentNode = nodeIterator.nextNode();
  }

  return nodes;
}

export function nodeSelect(node = document, selector) {
  return nodeSelectorAll(node, selector)[0];
}
