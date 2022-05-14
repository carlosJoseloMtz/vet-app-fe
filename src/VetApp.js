import { LitElement, html, css } from 'lit';
import { getRouterInstance } from './router.js';

export class VetApp extends LitElement {
  static get properties() {
    return {
      router: { type: Object, state: true }
    };
  }

  get root() {
    return this.shadowRoot || this;
  }

  firstUpdated() {
    this.router = getRouterInstance(this.root.querySelector('#pagearea'));
  }

  static get styles() {
    return css`
      #pagearea {
        padding: 0 5px;
      }

      @media screen and (min-width: 576px) {
        #pagearea {
          padding: 0 27px;
        }
      }
      @media screen and (min-width: 768px) {
        #pagearea {
          padding: 0 35px;
        }
      }
    `;
  }

  renderMenu() {
    if (this.router == null) {
      return null;
    }

    return html`<vet-menu router=${this.router}></vet-menu>`;
  }

  render() {
    return html`
      ${this.renderMenu()}
      <main id="pagearea">
      </main>
    `;
  }
}
