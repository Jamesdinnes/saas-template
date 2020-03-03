import * as jwt from 'jsonwebtoken';
import { computed, observable, action } from 'mobx';

class SessionStore {
  @observable isAuthenticated: boolean;

  @observable sessionToken: string;

  @action
  setToken(token: string) {
    this.sessionToken = token;
  }

  @computed
  get checkTokenIsValid() {
    if (this.sessionToken && jwt.decode(this.sessionToken)) {
      const jwtObject = jwt.decode(this.sessionToken) as { [key: string]: any };
      const expiry = jwtObject.exp;
      const now = new Date();
      return now.getTime() < expiry * 1000;
    }
    return false;
  }
}

export default new SessionStore();
