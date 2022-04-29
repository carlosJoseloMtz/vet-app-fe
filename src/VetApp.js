import { LitElement, html, css } from 'lit';


export class VetApp extends LitElement {
  
  static get styles() {
    return css`
      .page {
        padding: 0 5px;
      }

      @media screen and (min-width: 576px) {
        .page {
          padding: 0 27px;
        }
      }
      @media screen and (min-width: 768px) {
        .page {
          padding: 0 35px;
        }
      }
    `;
  }

  render() {
    return html`
      <main>
        <div class="page">
          <customers-page></customers-page>
        </div>
      </main>
    `;
  }
}
