window.CONZQ = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(rootEl) {

    new CONZQ.Router.AppRouter({
      $rootEl: rootEl
    });


  }
};


