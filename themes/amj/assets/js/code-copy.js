function fallbackCopyText(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  fallbackCopyText(text);
}

function getCodeText(pre) {
  const code = pre.querySelector("code");
  return (code || pre).textContent || "";
}

function setCopiedState(button) {
  const originalLabel = button.dataset.label || "Copy";
  button.textContent = "Copied";
  button.classList.add("is-copied");

  window.setTimeout(() => {
    button.textContent = originalLabel;
    button.classList.remove("is-copied");
  }, 2000);
}

function createCopyButton(pre) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "code-block__copy";
  button.textContent = "Copy";
  button.dataset.label = "Copy";
  button.setAttribute("aria-label", "Copy code to clipboard");

  button.addEventListener("click", async () => {
    try {
      await copyText(getCodeText(pre));
      setCopiedState(button);
    } catch (error) {
      button.textContent = "Failed";
      button.classList.add("is-error");

      window.setTimeout(() => {
        button.textContent = button.dataset.label || "Copy";
        button.classList.remove("is-error");
      }, 2000);
    }
  });

  return button;
}

function enhanceCodeBlock(pre) {
  const root = pre.parentElement && pre.parentElement.classList.contains("highlight")
    ? pre.parentElement
    : pre;

  if (!root.parentElement || root.parentElement.classList.contains("code-block")) {
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "code-block";

  if (root.classList.contains("highlight")) {
    wrapper.classList.add("code-block--highlight");
  }

  root.parentElement.insertBefore(wrapper, root);
  wrapper.appendChild(root);
  wrapper.appendChild(createCopyButton(pre));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".entry__content pre").forEach(enhanceCodeBlock);
});
