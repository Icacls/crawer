import alt from '../alt';
import WebsiteListActions from '../actions/WebsiteListActions';

class WebsiteListStore {
  constructor() {
    this.bindActions(WebsiteListActions);
    this.websites = [];
  }

  onGetWebsitesSuccess(data) {
    this.websites = data;
  }

  onGetWebsitesFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  delWebsiteSuccess() {
    toastr.success('删除网站成功！')
  }

  delWebsiteFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(WebsiteListStore);