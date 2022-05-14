import { css, html, LitElement } from 'lit';
import { getRouterInstance } from '../router.js';

export class VetMenu extends LitElement {
  static get properties() {
    return {
      router: { type: Object },
      _isOpen: { type: Boolean, state: true }
    };
  }

  static get styles() {
    return css`
    :host {
      background-color: var(--secondary-color);
      display: block;
      box-shadow: 0 2px 4px rgb(0 0 0 / 50%);
      --lumo-icon-size-m: 1em;
    }

    a {
      text-decoration: none;
      padding: 17px 5px;
      display: block;
      color: var(--secondary-text-color);
      text-align: center;
    }

    a:hover {
      background-color: var(--light-secondary-color);
    }
    `;
  }

  firstUpdated() {
    this.router = getRouterInstance();
  }

  render() {
    if (!this.router) {
      return null;
    }

    return html`
    <a href="${this.router.urlForPath('/login')}">Login</a>
    <a href="${this.router.urlForPath('/customers')}">
      <vet-icon icon="users">
      </vet-icon>
      Customers
    </a>
    `
  }
}
