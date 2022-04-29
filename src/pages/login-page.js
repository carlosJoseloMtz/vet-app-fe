import { LitElement, html } from 'lit';


export class LoginPage extends LitElement {
  static properties = {
    username: { type: String, state: true },
    password: { type: String },
  };

  constructor() {
    super();

    this.username = '';
    this.password = '';
  }

  _handleLogin(ev) {
    ev.preventDefault();
    const usernameField = this.shadowRoot.querySelector('#username');
    const passwordField = this.shadowRoot.querySelector('#password');

    const isFailureFound = !usernameField.validate() |
      !passwordField.validate();

    if (isFailureFound) {
      return false;
    }

    console.log('logging in', this.username, this.password);
  }

  _updateUsername(ev) {
    this.username = ev.target.value;
  }

  _updatePassword(ev) {
    this.password = ev.target.value;
  }

  render() {
    return html`
    <h1>Login Page</h1>
    <paper-input
      label="Username"
      placeholder="sample@email.com"
      type="email"
      id="username"
      required
      value=${this.username}
      error-message="Email should be valid"
      @change=${this._updateUsername}
    >
    </paper-input>
    <paper-input
      outlined
      label="Password"
      type="password"
      id="password"
      required
      error-message="Password should be at least 8 characters long"
      pattern=".{8,}"
      required
      @change=${this._updatePassword}
    >
    </paper-input>
    <paper-button
      @click=${this._handleLogin}
      aria-label="Login button"
      label="Login button">
      Login
    </paper-button>
    `;
  }
}