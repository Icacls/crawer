import alt from '../alt';

class WebsiteListActions {
  constructor() {
    this.generateActions(
      'getWebsitesSuccess',
      'getWebsitesFail',
      'delWebsiteSuccess',
      'delWebsiteFail'
    );
  }

  getWebsites(payload) {
    let url = '/api/websites';

    $.ajax({ url: url, data: {} })
      .done((data) => {
        this.actions.getWebsitesSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getWebsitesFail(jqXhr);
      });
  }

  delWebsite(websiteId) {
    let url = '/api/delSite';
    console.log('siteId',websiteId)
    $.ajax({
      type: 'POST',
      url: url,
      data: {websiteId: websiteId}
    })
      .done((data) => {
        this.actions.delWebsiteSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.delWebsiteFail(jqXhr);
      });
  }

}

export default alt.createActions(WebsiteListActions);