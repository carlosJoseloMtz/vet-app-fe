import { LitElement, html, css } from 'lit';
import { getRouterInstance } from './router.js';

export class VetApp extends LitElement {
  static get properties() {
    return {
      router: { type: Object, state: true },
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
      .app-container {
        height: 100%;
      }

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

      @media screen and (min-width: 1200px) {
        .app-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: stretch;
        }

        .app-container vet-menu {
          flex-basis: 13rem;
        }

        .app-container main {
          flex: 1;
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
      <div class="app-container">
        ${this.renderMenu()}
        <main id="pagearea" role="main"></main>
      </div>
    `;
  }
}
