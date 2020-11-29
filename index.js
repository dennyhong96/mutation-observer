const fruits = document.querySelector("#fruits");

const mutationObserver = new MutationObserver(function (mutations) {
  mutations.forEach((mutation) => {
    // console.log(mutation);

    // Element's attributes were mutated
    if (mutation.type === "attributes") {
      const changedAttrName = mutation.attributeName;
      const changedAttrValue = mutation.target.getAttribute(changedAttrName);

      console.log(
        `"${changedAttrName}" attribute has changed, new value is "${changedAttrValue}".`
      );
    }

    // Element's childList is mutated
    if (mutation.type === "childList") {
      // Childlist change
      if (mutation.addedNodes.length) {
        console.log(`${mutation.addedNodes.length} new children added.`);
      }

      // Tracks changes of text content / innerHTML, etc
      if (
        mutation.addedNodes.length === 1 &&
        mutation.removedNodes.length === 1 &&
        mutation.addedNodes[0].nodeType === Node.TEXT_NODE &&
        mutation.removedNodes[0].nodeType === Node.TEXT_NODE
      ) {
        console.log(
          `Text node value changed from "${mutation.removedNodes[0].nodeValue}" to "${mutation.addedNodes[0].nodeValue}"`
        );
      }
    }
  });
});

// Starts observing
mutationObserver.observe(fruits, {
  attributes: true,
  attributeFilter: ["class"],
  attributeOldValue: true,
  childList: true,
  subtree: true,
  characterData: true, // Tracks text changes on text node itself
  characterDataOldValue: true,
});

// Finishes observing
mutationObserver.disconnect();

const btn = document.querySelector("button");
btn.addEventListener("click", function () {
  fruits.classList.add("new-class");
  fruits.setAttribute("id", "random-id");
  fruits.insertAdjacentHTML("afterbegin", `<li id="burger">Burger</li>`);

  // Text content - removing previous node, adding new node
  fruits.firstElementChild.textContent = "Something else.";
});
