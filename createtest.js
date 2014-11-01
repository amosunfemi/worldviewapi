/**
 * Created by sundayamosun on 10/29/14.
 */
var loopback = require('loopback');

var dataSource  = loopback.createDataSource('db', {
  "host": "localhost",
  "port": 5433,
  "database": "test",
  "password": "sunday123",
  "name": "db",
  "connector": "postgresql",
  "user": "postgres"
});
var User = loopback.User;
var AccessToken = loopback.AccessToken;
var Role = loopback.Role;
var ACL = loopback.ACL;
User.attachTo(dataSource);
AccessToken.attachTo(dataSource);
Role.attachTo(dataSource);
ACL.attachTo(dataSource);



User.hasMany(AccessToken, {as: 'accessTokens'});


User.create(
  {username: 'timbo', email: 'test@gmail.com', password: 'monkey123'},
  function(err, user) {
    // TODO: handle err != null
    if (err) throw err;
    User.login(
      {username: 'timbo', password: 'monkey123'},
      function(err, accesstoken) {
        console.log("This is the token: " + accesstoken);
      });
  });
/*var Account = server.models.account;
var accounts = [
  { email: 'foo@bar.com',
    created: new Date(),
    modified: new Date()
  }, {
    email: 'bar@bar.com',
    created: new Date(),
    modified: new Date()
  } ];*/

//var count = accounts.length;

dataSource.automigrate('User', function(er) {});
//  if (er) throw er;
  /*accounts.forEach(function(account) {
    Account.create(account, function(er, result) {
      if (er) return;
      console.log('Record created:', result);
      count--;
      if(count === 0) {
        console.log('done');
        dataSource.disconnect();
      }
    });
  });*/
//});
/*

dataSource.automigrate('account', function(er) {
  if (er) throw er;
  accounts.forEach(function(account) {
    Account.create(account, function(er, result) {
      if (er) return;
      console.log('Record created:', result);
      count--;
      if(count === 0) {
        console.log('done');
        dataSource.disconnect();
      }
    });
  });
});
*/
