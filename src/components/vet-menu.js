import { css, html, LitElement } from 'lit';
import { getRouterInstance } from '../router.js';
import { isNotEnter } from '../utils/event-utils.js';

export class VetMenu extends LitElement {
  static get properties() {
    return {
      router: { type: Object },
      _isOpen: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();

    this._isOpen = false;
  }

  static get styles() {
    return css`
      :host {
        background-color: var(--primary-color);
        display: block;
        box-shadow: 0 2px 4px rgb(0 0 0 / 50%);
        --lumo-icon-size-m: 1em;
      }

      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: block;
        text-aligh: center;
      }

      button {
        background-color: var(--primary-color);
        border: none;
        display: block;
        text-align: center;
        width: 100%;
      }

      a,
      li.responsive-control button {
        text-decoration: none;
        padding: 17px 5px;
        display: block;
        color: var(--primary-text-color);
        text-align: center;
      }

      a:hover,
      li.responsive-control:hover {
        background-color: var(--light-primary-color);
        cursor: pointer;
      }

      .responsive-control.open-menu.toggled {
        display: none;
      }

      span {
        display: none;
      }

      span.toggled {
        display: block;
      }

      @media screen and (min-width: 1200px) {
        a {
          border-bottom: 1px solid var(--light-primary-color);
        }

        ul li:nth-child(2) a {
          border-top: 1px solid var(--light-primary-color);
        }

        .responsive-control {
          display: none;
        }

        span {
          display: block;
          padding-top: 5em;
        }
      }
    `;
  }

  firstUpdated() {
    this.router = getRouterInstance();
  }

  _handleOpenMenu() {
    this._isOpen = true;
  }

  _handleCloseMenu() {
    this._isOpen = false;
  }

  _handleOpenMenuKey(ev) {
    if (isNotEnter(ev)) {
      return;
    }

    this._handleOpenMenu();
  }

  _handleCloseMenuKey(ev) {
    if (isNotEnter(ev)) {
      return;
    }

    this._handleCloseMenu();
  }

  render() {
    if (!this.router) {
      return null;
    }

    const toggleClass = this._isOpen ? 'toggled' : '';

    return html`
      <nav>
        <ul>
          <li class="responsive-control open-menu ${toggleClass}">
            <button
              @click=${this._handleOpenMenu}
              @keypress=${this._handleOpenMenuKey}
            >
              <vet-icon icon="menu" label="Open Menu"> </vet-icon>
            </button>
          </li>
          <span class="${toggleClass}">
            <li class="responsive-control close-menu">
              <button
                @click=${this._handleCloseMenu}
                @keypress=${this._handleCloseMenuKey}
              >
                <vet-icon icon="close" label="Close Menu"></vet-icon>
              </button>
            </li>
            <li>
              <a href="${this.router.urlForPath('/admin/customers')}">
                <vet-icon icon="users"> </vet-icon>
                Customers
              </a>
            </li>
            <li>
              <a href="${this.router.urlForPath('/admin/users/my-profile')}">
                <vet-icon icon="specialist"> </vet-icon>
                My Profile
              </a>
            </li>
            <li>
              <a href="${this.router.urlForPath('/logout')}">Logout</a>
            </li>
          </span>
        </ul>
      </nav>
    `;
  }
}
