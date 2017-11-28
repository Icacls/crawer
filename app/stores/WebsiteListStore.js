import alt from '../alt';
import WebsiteListActions from '../actions/WebsiteListActions';

class WebsiteListStore {
  constructor() {
    this.bindActions(WebsiteListActions);
    this.websites = [];
    this.siteId = '';
  }

  onUpdateSiteId(siteId) {
    this.siteId = siteId;
  }

  onGetWebsitesSuccess(data) {
    this.websites = data;
  }

  onGetWebsitesFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  delWebsiteSuccess(siteId) {
    this.websites = this.websites.filter((item) => {
      return item.websiteId !=siteId;
    })
    toastr.success('删除网站成功！')
  }

  delWebsiteFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  updateWebsiteSuccess(data) {
    this.websites = data
    toastr.success('更新网站状态成功！')
  }

  updateWebsiteFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(WebsiteListStore);