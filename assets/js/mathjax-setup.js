window.MathJax = {
  tex: {
    tags: "ams",
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
  },
  startup: {
    ready() {
      MathJax.startup.defaultReady();
      // kramdown with math_engine: mathjax outputs <script type="math/tex"> tags;
      // MathJax 3 doesn't process these by default, so we convert them here.
      MathJax.startup.promise.then(() => {
        document.querySelectorAll('script[type^="math/tex"]').forEach(function (node) {
          const display = !!node.type.match(/; *mode=display/);
          const math = new MathJax.startup.document.options.MathItem(
            node.textContent,
            MathJax.startup.inputJax[0],
            display
          );
          const text = document.createTextNode("");
          node.parentNode.insertBefore(text, node);
          math.start = { node: text, delim: "", n: 0 };
          math.end = { node: text, delim: "", n: 0 };
          MathJax.startup.document.math.push(math);
          node.parentNode.removeChild(node);
        });
        MathJax.startup.document.render();
      });
    },
  },
  options: {
    renderActions: {
      addCss: [
        200,
        function (_doc) {
          const style = document.createElement("style");
          style.innerHTML = `
          .mjx-container {
            color: inherit;
          }
        `;
          document.head.appendChild(style);
        },
        "",
      ],
    },
  },
};
