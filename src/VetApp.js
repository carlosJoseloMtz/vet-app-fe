import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

export class VetApp extends LitElement {
  static get properties() {
    return {
      router: { type: Object },
    };
  }

  get root() {
    return this.shadowRoot || this;
  }

  firstUpdated() {
    const outlet = this.root.querySelector('#pagearea');
    console.log('binding router to outlet', outlet);
    this.router = new Router(outlet);

    this.router.setRoutes([
      { path: '/login', component: 'login-page' },
      { path: '/customers', component: 'customers-page' },
    ]);
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

  render() {
    return html`
      <main>
        <div id="pagearea"></div>
      </main>
    `;
  }
}
