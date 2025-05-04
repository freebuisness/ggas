let a = false;
function toggle() {
  a=false;
}

document.addEventListener('keydown', function(event) {
    if (event.key.toLowerCase() === 'g') {
      a=true;
      setTimeout(toggle, 1000);
    } else if (event.key.toLowerCase() === 'n') {
      const newUrl = "https://cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/singlefile.html";
  
      fetch(newUrl)
        .then(response => response.text())
        .then(html => {
          const temp = document.createElement('html');
          temp.innerHTML=html;

          // Replace head and body
          document.head.innerHTML = temp.querySelector('head').innerHTML;
          document.body.innerHTML = temp.querySelector('body').innerHTML;
          document.body.classList.add("dark-mode")

          // Manually re-run scripts
          temp.querySelectorAll('script').forEach(oldScript => {
              const newScript = document.createElement('script');
              if (oldScript.src) {
                  newScript.src = oldScript.src;
              } else {
                  newScript.textContent = oldScript.textContent;
              }
              document.body.appendChild(newScript);
          });
        })
        .catch(error => {
          alert("Failed to load content.");
          console.error(error);
        });
    }
  });
  