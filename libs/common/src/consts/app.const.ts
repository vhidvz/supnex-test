export const APP = {
  GATEWAY: {
    API_PORT: parseInt(process.env.GATEWAY_API_PORT ?? '3010'),
  },
  // gRPC services
  MATERIALS: {
    SERVICE: { NAME: 'MaterialsService' },
    API_PORT: parseInt(process.env.MATERIALS_API_PORT ?? '3050'),
    GRPC_PORT: parseInt(process.env.MATERIALS_GRPC_PORT ?? '5050'),
    PACKAGE: { NAME: 'materials', SYMBOL: Symbol('MATERIALS_PACKAGE') },
  },
  SUPPLIERS: {
    SERVICE: { NAME: 'SuppliersService' },
    API_PORT: parseInt(process.env.SUPPLIERS_API_PORT ?? '3051'),
    GRPC_PORT: parseInt(process.env.SUPPLIERS_GRPC_PORT ?? '5051'),
    PACKAGE: { NAME: 'suppliers', SYMBOL: Symbol('SUPPLIERS_PACKAGE') },
  },
  PRODUCTS: {
    SERVICE: { NAME: 'ProductsService' },
    API_PORT: parseInt(process.env.PRODUCTS_API_PORT ?? '3052'),
    GRPC_PORT: parseInt(process.env.PRODUCTS_GRPC_PORT ?? '5052'),
    PACKAGE: { NAME: 'products', SYMBOL: Symbol('PRODUCTS_PACKAGE') },
  },
  // Kafka services
  STOCKS: {
    CLIENT: { ID: 'stocks-client' },
    CONSUMER: { GROUP_ID: 'stocks-group' },
    SERVICE: { SYMBOL: Symbol('STOCKS_SERVICE') },
    API_PORT: parseInt(process.env.STOCKS_API_PORT ?? '3053'),
  },
};
