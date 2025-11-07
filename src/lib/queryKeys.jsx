export const queryKeys = {
  masoko: {
    auth: {
      all: () => ['auth'],
      user: () => [...queryKeys.masoko.auth.all(), 'user'],
      login: () => [...queryKeys.masoko.auth.all(), 'login'],
      logout: () => [...queryKeys.masoko.auth.all(), 'logout'],
      resetPassword: () => [...queryKeys.masoko.auth.all(), 'resetPassword'],
      changePassword: () => [...queryKeys.masoko.auth.all(), 'changePassword'],
    },

    products: {
      all: () => ['products'],
      list: (filters) => [...queryKeys.masoko.products.all(), 'list', filters],
      detail: (id) => [...queryKeys.masoko.products.all(), 'detail', id],
      search: (query) => [...queryKeys.masoko.products.all(), 'search', query],
      byCategory: (categoryId) => [
        ...queryKeys.masoko.products.all(),
        'category',
        categoryId,
      ],
      featured: () => [...queryKeys.masoko.products.all(), 'featured'],
      trending: () => [...queryKeys.masoko.products.all(), 'trending'],
      recommendations: (userId) => [
        ...queryKeys.masoko.products.all(),
        'recommendations',
        userId,
      ],
      masokoProducts: ({ amount, organization, channel }) => [
        'masoko-products',
        amount,
        organization,
        channel,
      ],
    },

    categories: {
      all: () => ['categories'],
      list: () => [...queryKeys.masoko.categories.all(), 'list'],
      detail: (id) => [...queryKeys.masoko.categories.all(), 'detail', id],
      tree: () => [...queryKeys.masoko.categories.all(), 'tree'],
    },

    cart: {
      all: () => ['cart'],
      user: (userId) => [...queryKeys.masoko.cart.all(), 'user', userId],
      add: () => [...queryKeys.masoko.cart.all(), 'add'],
      update: () => [...queryKeys.masoko.cart.all(), 'update'],
      remove: () => [...queryKeys.masoko.cart.all(), 'remove'],
      clear: () => [...queryKeys.masoko.cart.all(), 'clear'],
    },

    orders: {
      all: () => ['orders'],
      list: (filters) => [...queryKeys.masoko.orders.all(), 'list', filters],
      detail: (id) => [...queryKeys.masoko.orders.all(), 'detail', id],
      byUser: (userId) => [...queryKeys.masoko.orders.all(), 'user', userId],
      status: (status) => [...queryKeys.masoko.orders.all(), 'status', status],
      tracking: (orderId) => [
        ...queryKeys.masoko.orders.all(),
        'tracking',
        orderId,
      ],
    },

    customers: {
      all: () => ['customers'],
      list: (filters) => [...queryKeys.masoko.customers.all(), 'list', filters],
      detail: (id) => [...queryKeys.masoko.customers.all(), 'detail', id],
      search: (query) => [...queryKeys.masoko.customers.all(), 'search', query],
      addresses: (id) => [...queryKeys.masoko.customers.all(), 'addresses', id],
      wishlist: (id) => [...queryKeys.masoko.customers.all(), 'wishlist', id],
    },

    payments: {
      all: () => ['payments'],
      list: (filters) => [...queryKeys.masoko.payments.all(), 'list', filters],
      detail: (id) => [...queryKeys.masoko.payments.all(), 'detail', id],
      byOrder: (orderId) => [
        ...queryKeys.masoko.payments.all(),
        'order',
        orderId,
      ],
      methods: () => [...queryKeys.masoko.payments.all(), 'methods'],
      process: () => [...queryKeys.masoko.payments.all(), 'process'],
    },

    inventory: {
      all: () => ['inventory'],
      levels: () => [...queryKeys.masoko.inventory.all(), 'levels'],
      lowStock: () => [...queryKeys.masoko.inventory.all(), 'lowStock'],
      byProduct: (productId) => [
        ...queryKeys.masoko.inventory.all(),
        'product',
        productId,
      ],
    },

    dashboard: {
      all: () => ['dashboard'],
      stats: () => [...queryKeys.masoko.dashboard.all(), 'stats'],
      sales: () => [...queryKeys.masoko.dashboard.all(), 'sales'],
      orders: () => [...queryKeys.masoko.dashboard.all(), 'orders'],
      customers: () => [...queryKeys.masoko.dashboard.all(), 'customers'],
    },

    reports: {
      all: () => ['reports'],
      sales: (params) => [...queryKeys.masoko.reports.all(), 'sales', params],
      products: (params) => [
        ...queryKeys.masoko.reports.all(),
        'products',
        params,
      ],
      customers: (params) => [
        ...queryKeys.masoko.reports.all(),
        'customers',
        params,
      ],
      analytics: () => [...queryKeys.masoko.reports.all(), 'analytics'],
    },

    settings: {
      all: () => ['settings'],
      user: () => [...queryKeys.masoko.settings.all(), 'user'],
      store: () => [...queryKeys.masoko.settings.all(), 'store'],
      shipping: () => [...queryKeys.masoko.settings.all(), 'shipping'],
      taxes: () => [...queryKeys.masoko.settings.all(), 'taxes'],
    },

    oders: {
      createOrder: () => ['bnpl-create-order'],
      getAllOrders: () => ['bnpl-get-all-orders'],
      getOrder: (orderId) => ['bnpl-get-order', orderId],
      saveLoanLimit: () => ['bnpl-save-loan-limit'],
      savePersonalInfo: () => ['bnpl-save-personal-info'],
      saveDeliveryDetails: () => ['bnpl-save-delivery-details'],
      saveOrderSummary: () => ['bnpl-save-order-summary'],
      saveTermsConsents: () => ['bnpl-save-terms-consents'],
    },

    regions: () => ['masoko-regions'],
    pickUpPoints: () => ['masoko-pick-up-points'],
  },
}
