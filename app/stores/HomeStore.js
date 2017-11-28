import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.characters = [];
    this.pwd = '';
  }

  updatePwd(event) {
    this.pwd = event.target.value;
  }

  onGetTwoCharactersSuccess(data) {
    this.characters = data;
  }

  onGetTwoCharactersFail(errorMessage) {
    toastr.error(errorMessage);
  }

  onVoteFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(HomeStore);