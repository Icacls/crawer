import alt from '../alt';

class WebsiteListActions {
  constructor() {
    this.generateActions(
      'getWebsitesSuccess',
      'getWebsitesFail',
      'delWebsiteSuccess',
      'delWebsiteFail',
      'updateWebsiteSuccess',
      'updateWebsiteFail'
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

  delWebsite(siteId) {
    let url = '/api/delSite';
    console.log(siteId);
    $.ajax({
      type: 'POST',
      url: url,
      data: {websiteId: siteId.websiteId}
    })
      .done((data) => {
        this.actions.delWebsiteSuccess(siteId.websiteId);
      })
      .fail((jqXhr) => {
        this.actions.delWebsiteFail(jqXhr);
      });
  }

  updateWebsite(status) {
    let url = '/api/updateSite';
    $.ajax({
      type: 'PUT',
      url: url,
      data: {websiteId: status.websiteId}
    })
      .done((data) => {
        this.actions.updateWebsiteSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.updateWebsiteFail(jqXhr);
      });
  }

}

export default alt.createActions(WebsiteListActions);