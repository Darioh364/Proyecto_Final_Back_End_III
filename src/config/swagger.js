import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'AdoptMe API',
      description: 'Documentación del módulo de usuarios',
    },
  },
  apis: ['./src/routes/*.js'], // ruta donde están tus rutas con comentarios Swagger
};

const specs = swaggerJSDoc(swaggerOptions);

const swaggerDocs = (app) => {
  app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
};

export default swaggerDocs;
