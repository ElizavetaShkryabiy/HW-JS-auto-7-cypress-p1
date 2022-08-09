module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {      
      
    },    
      "retries":1,   
      "pageLoadTimeout": 60000,     
      "screenshotOnRunFailure" : true ,
      
  },
};
