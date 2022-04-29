import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@vaadin/icon';
import '@vaadin/icons';


import { VetApp } from './VetApp.js';
import { LoginPage } from './pages/login-page.js';
import { CustomersPage } from './pages/customers/pages/customers-page.js';
import { VetResponsiveTable } from './components/responsive-table.js';
import { VetButton } from './components/vet-button.js';
import { CreateCustomer } from './pages/customers/components/create-customer.js';
import { VetCrudModal } from './components/vet-crud-modal.js';
import { VetIcon } from './components/vet-icon.js';
import { VetAlert } from './components/vet-alert.js';

customElements.define('vet-app', VetApp);
customElements.define('login-page', LoginPage);
customElements.define('customers-page', CustomersPage);
customElements.define('vet-table', VetResponsiveTable);
customElements.define('vet-button', VetButton);
customElements.define('customer-form', CreateCustomer);
customElements.define('vet-crud-modal', VetCrudModal);
customElements.define('vet-icon', VetIcon);
customElements.define('vet-alert', VetAlert);