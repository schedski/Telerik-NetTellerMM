define(["lib/jquery","netteller/session","ui/loader","lib/knockout","netteller/contacts","config/environment","ui/startup"],function(e,t,n,r,i,s){var o={hasPayees:r.observable(!1),hasBillers:r.observable(!1),onPayOtherClick:function(){e.mobile.changePage("#payOther")},onPayBPayClick:function(){e.mobile.changePage("#payBpay")},reset:function(){o.hasPayees(!1),o.hasBillers(!1)}};t.viewModels.push(o),e("#payments").on("pageinit",function(){r.applyBindings(o,e("#payments").get(0))}),e("#payments").on("pageshow",function(){i.selectedContact=null})})