document.addEventListener('keydown', function(event) {
    if (event.key.toLowerCase() === 'g') {
      const newUrl = "https://cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/singlefile.html";
  
      fetch(newUrl)
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
  
          const content = doc.body;
          const scripts = content.querySelectorAll('script');
  
          document.documentElement.innerHTML = content.innerHTML;
  
          scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
              newScript.src = script.src;
            } else {
              newScript.textContent = script.textContent;
            }
            document.body.appendChild(newScript);
          });
  
          history.pushState(null, '', newUrl);
        })
        .catch(error => {
          alert("Failed to load content.");
          console.error(error);
        });
    }
  });
  