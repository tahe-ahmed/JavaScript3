'use strict';

{
  function getSortByName(obj){
    // to sort the JSON object alphabetically susing .sort and small function
    obj.sort((first, second) => {
      if (first.name.toLowerCase() < second.name.toLowerCase()) return -1;
      if (first.name.toLowerCase() > second.name.toLowerCase()) return 1;
      return 0;
      });
    return obj;
  }

  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        // sort the response using pre-defined function
        let sortedResponse = getSortByName(xhr.response);
        cb(null, sortedResponse);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderRepoDetails(repo, innerul) {
    {
      // insert repo name in a li which includes a label tag and anchor tag
      let li = createAndAppend('li', innerul);
      createAndAppend('label', li, { text: `Repository : `, class: "label"});
      createAndAppend('a', li, { text: `${repo.name}  `, class: "info", href:"#"});  
    }
  
    // insert repo description 
    if(repo.description === null){
      let li = createAndAppend('li', innerul);
      createAndAppend('label', li, { text: `Description : `, class: "label"});
      createAndAppend('p', li, { text: `${repo.name}  `, class: "info"});
    }else{
      let li = createAndAppend('li', innerul);
      createAndAppend('label', li, { text: `Description : `, class: "label"});
      createAndAppend('p', li, { text: `${repo.description}  `, class: "info"});
    }
    {
      // insert repo forks
      let li = createAndAppend('li', innerul);
      createAndAppend('label', li, { text: `Forks : `, class: "label"});
      createAndAppend('a', li, { text: `${repo.forks}  `, class: "info"});
    }

    {
      // insert repo updated date 
      let li = createAndAppend('li', innerul);
      createAndAppend('label', li, { text: `Updated : `, class: "label"});
      let date = new Date(repo.updated_at).toLocaleDateString("sq-AL",{ year: 'numeric', month: '2-digit', day: '2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit' });

      createAndAppend('a', li, { text: `${date}  `, class: "info"});
    }

  }

  function main(url) {
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      // outerul to include indivial innerul for each repo
      const outerul = createAndAppend('ul', root);
      // create the Header
      createAndAppend('h2', outerul, {
        text: "HYF Repositories",
        class: "title",
      })
      if (err) {
        createAndAppend('li', outerul, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }

      repos.forEach(repo => {
        // insert innerul for each repo information
        const innerul = createAndAppend('ul', outerul, {
          class: 'rep-item',
        });
        // insert he repo information within its own ul
        renderRepoDetails(repo, innerul);
      });
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=10';
  window.onload = () => main(HYF_REPOS_URL);
}
