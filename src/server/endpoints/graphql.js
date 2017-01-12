var apollo = require('apollo-server');
var casual = require('casual');

function graphqlModule(app, spec) {
  registerGraphqlEndpoints(app, spec.graphqlEndpoints)
}

var mocks = {
  Int: function () {
    return casual.integer(200000, 400000);
  },

  String: function () {
    return casual.name;
  },

  Float: function () {
    return 22.1;
  },

  Email: function () {
    return "lol@testpruebas.com";
  },

  Datetime: function () {
    return new Date();
  },

  Url: function () {
    return "https://comparamejor.com";
  }
};

function registerGraphqlEndpoints(app, endpoints) {
  for (var i = 0; i < endpoints.length; i++) {
    var endpoint = endpoints[i];
    app.use(endpoint.url, apollo.apolloServer({
      graphiql: true,
      pretty: true,
      schema: endpoint.schema,
      mocks: mocks
    }));
  }
}

module.exports = graphqlModule;