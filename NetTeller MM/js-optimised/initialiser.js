define(["lib/jquery","lib/deviceReady!"],function(e){var t=["ui/startup","netteller/versioning","features/backnavigation","features/pinkeypad","features/passwordlogin","features/passwordchange","features/terms","features/register","features/logout","features/balances","features/transactions","features/payments","features/payown","features/payother","features/paybpay","features/settings","features/contacts","features/addcontact","features/editcontact","features/home"],n=e.Deferred(),r=function(e){if(e<t.length){var i=function(){r(e+1)};window.setTimeout(function(){require([t[e]],i)},10)}else n.resolve()};return r(0),n})