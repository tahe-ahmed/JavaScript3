'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      this.container.innerHTML = '';
      const reposContainer = this.container;
      // TODO: replace this comment and the console.log with your own code
      // console.log('RepoView', repo);

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
  }

  window.RepoView = RepoView;
}
