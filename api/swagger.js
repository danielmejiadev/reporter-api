
module.exports = {
  swaggerDefinition: {
    info: {
      title: 'Reporter API documentation',
      version: 'A lightweight server to report metrics',
    },
  },
  apis: ['./api/**/*.router.js'],
};
