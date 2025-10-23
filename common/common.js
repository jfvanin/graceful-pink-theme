export default {
  name: "inline-composer-dock",
  initialize() {
    // Wait until Discourse is ready
    api.onPageChange((url, title) => {
      const composer = document.querySelector("#reply-control");

      if (!composer) return;

      // Add listener for when composer opens
      const observer = new MutationObserver(() => {
        const isOpen = composer.classList.contains("open");
        if (isOpen && !composer.classList.contains("docked")) {
          // Find topic container
          const topicBody = document.querySelector(".topic-posts");
          if (topicBody) {
            // Move composer into topic
            topicBody.appendChild(composer);
            composer.classList.add("docked");
          }
        }
      });

      observer.observe(composer, { attributes: true, attributeFilter: ["class"] });
    });
  },
};
