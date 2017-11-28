import alt from '../alt';
import AddWebsiteActions from '../actions/AddWebsiteActions';

class AddWebsiteStore {
  constructor() {
    this.bindActions(AddWebsiteActions);
    this.name = '';
    this.url = '';
  }

  onAddWebsiteSuccess(successMessage) {
    this.nameValidationState = 'has-success';
    this.helpBlock = successMessage;
    toastr.success('添加网址成功！');
  }

  onAddWebsiteFail(errorMessage) {
    this.nameValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateName(event) {
    this.name = event.target.value;
    this.nameValidationState = '';
    this.helpBlock = '';
  }

  onUpdateUrl(event) {
    this.url = event.target.value;
    this.urlValidationState = '';
  }

  onInvalidName() {
    this.nameValidationState = 'has-error';
    this.helpBlock = 'Please enter a Website name.';
  }

  onInvalidUrl() {
    this.urlValidationState = 'has-error';
  }
}

export default alt.createStore(AddWebsiteStore);