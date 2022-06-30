export default ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('publish-gcp-fhir')
      .service('myService')
      .getWelcomeMessage();
  },
});
