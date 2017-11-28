import alt from '../alt';

class AddWebsiteActions {
  constructor() {
    this.generateActions(
      'addWebsiteSuccess',
      'addWebsiteFail',
      'updateName',
      'updateUrl',
      'invalidName',
      'invalidUrl'
    );
  }

  addWebsite(name, url) {
    $.ajax({
      type: 'POST',
      url: '/api/Website',
      data: { name: name, url: url }
    })
      .done((data) => {
        this.actions.addWebsiteSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addWebsiteFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddWebsiteActions);