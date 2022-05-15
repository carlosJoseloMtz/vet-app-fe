import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
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
import { CustomerPets } from './pages/customers/components/customer-pets.js';
import { VetMenu } from './components/vet-menu.js';
import { MyProfilePage } from './pages/users/pages/my-profile-page.js';

// pages
customElements.define('vet-app', VetApp);
customElements.define('login-page', LoginPage);
customElements.define('customers-page', CustomersPage);
customElements.define('user-profile-page', MyProfilePage);

// components
customElements.define('vet-table', VetResponsiveTable);
customElements.define('vet-button', VetButton);
customElements.define('customer-form', CreateCustomer);
customElements.define('vet-crud-modal', VetCrudModal);
customElements.define('vet-icon', VetIcon);
customElements.define('vet-alert', VetAlert);
customElements.define('customer-pets', CustomerPets);
customElements.define('vet-menu', VetMenu);
