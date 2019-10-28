chrome.runtime.onMessage.addListener((req) => {
  if (req === "ip") {
    // *** snabbdom packages ***
    const snabbdom = require("./snabb/dist/snabbdom");
    const patch = snabbdom.init([
      // Init patch function with chosen modules
      require("snabbdom/modules/class").default, // makes it easy to toggle classes
      require("snabbdom/modules/props").default, // for setting properties on DOM elements
      require("snabbdom/modules/style").default, // handles styling on elements with support for animations
      require("snabbdom/modules/eventlisteners").default // attaches event listeners
    ]);
    const toVNode = require("./snabb/dist/tovnode").default;
    const oldDom = toVNode(document.body, undefined, false);

    const newDom = toVNode(document.body, undefined, true);
    console.log('hello');
    patch(oldDom, newDom);
  }

});
