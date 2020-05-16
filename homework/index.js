
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

  function fetchJSON(url) {
    return fetch(url).then(response =>{
      if (!response.ok) throw new Error(response.status);
      // console.log(response.json());
      return response.json();
    })
    // handle fetch Promise error
    .catch(error => console.log(error) );
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

  function renderRepoDetails(repo, reposContainer) {
      createAndAppend("ul", reposContainer, {class: "repo-list"});
    
      
      // insert repo name in a li which includes a label tag and anchor tag
      let nameLi = createAndAppend('li', reposContainer, {class: "repo-info"});
      createAndAppend('label', nameLi, { text: `Repository : `, class: "label"});
      createAndAppend('a', nameLi, { text: `${repo.name}  `, class: "info", href:"#"});  
    
    // insert repo description 
      let descLi = createAndAppend('li', reposContainer , {class: "repo-info"});
      createAndAppend('label', descLi, { text: `Description : `, class: "label"});
      let descText = (repo.description === null ? repo.name : repo.description);
      createAndAppend('p', descLi, { text: `${descText}  `, class: "info"});    
    
      // insert repo forks
      let forkLi = createAndAppend('li', reposContainer,{class: "repo-info"});
      createAndAppend('label', forkLi, { text: `Forks : `, class: "label"});
      createAndAppend('a', forkLi, { text: `${repo.forks}  `, class: "info"});
    
      // insert repo updated date 
      let dateLi = createAndAppend('li', reposContainer, {class: "repo-info"});
      createAndAppend('label', dateLi, { text: `Updated : `, class: "label"});
      let date = new Date(repo.updated_at).toLocaleDateString("sq-AL",{ year: 'numeric', month: '2-digit', day: '2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit' });
      createAndAppend('a', dateLi, { text: `${date}  `, class: "info"});
    
  }
  
  function rendercontributors(contributors, contributorsContainer){
    
    contributors.forEach(contributor =>{
      let div = createAndAppend('div', contributorsContainer, { class: "contributorCard"});
      createAndAppend('img', div, {
        class: "contributor-img",
        src: contributor.avatar_url,
      });
      createAndAppend('a', div, {
        href: contributor.html_url,
        class: 'contrib-name',
        target: '_blank',
        text: contributor.login,
      });
      createAndAppend('div', div, {
        class: 'contribution-names',
        text: contributor.contributions,
      });
    }); 
  
  }

  function main(url) {
    const header = document.querySelector('header');
    const reposContainer = document.querySelector('.repo-container');
    const contributorsContainer = document.querySelector('.contributors-container');
    const dropDownList = createAndAppend('select', header, {class: 'dropDownList',});
    createAndAppend('h3', contributorsContainer, {class:"contribu-head", text:"Contributors"});

    // Get pending promise 
    const pendingPromise = fetchJSON(url);
    // console.log(pendingPromise);

    // resolve the promise and fill up the select elemet with options 
    pendingPromise.then(repoArr =>{ 
      // console.log(pendingPromise);
      getSortByName(repoArr);
      repoArr.forEach((repo,index) =>{
        createAndAppend('option', dropDownList, {
          text: repo.name,
          value: index
        })
      })
      
      // default repo info
      pendingPromise
          .then(repoArr => {
            renderRepoDetails(repoArr[0], reposContainer)
          });
      // default contributors info
      pendingPromise
          .then(repoArr => {
            fetchJSON(repoArr[0].contributors_url).then(listOfContributors =>
              rendercontributors(listOfContributors, contributorsContainer),
              // console.log(listOfContributors);
        );
      })

      // onselect change the default repo and contributors info
      dropDownList.addEventListener("change", (e) => {
        const index = e.target.value;
        reposContainer.textContent = '';
        contributorsContainer.textContent = '';
        pendingPromise
          .then(repoArr => {
            renderRepoDetails(repoArr[index], reposContainer)}
            )
            pendingPromise.then(repoArr => {
            fetchJSON(repoArr[index].contributors_url).then(listOfContributors =>
              rendercontributors(listOfContributors, contributorsContainer),
              // console.log(listOfContributors);
            );

          })
          
      });
    })
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
