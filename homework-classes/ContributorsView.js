'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      this.container.innerHTML = '';
      let contributorsContainer = this.container;
      // TODO: replace this comment and the console.log with your own code
      // console.log('ContributorsView', contributors);
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
  }

  window.ContributorsView = ContributorsView;
}
