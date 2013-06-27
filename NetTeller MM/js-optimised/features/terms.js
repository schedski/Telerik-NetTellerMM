define(["lib/jquery","netteller/session","lib/knockout","lib/toolkit","netteller/login","netteller/security","netteller/localstorage","ui/startup"],function(e,t,n,r,i,s,o){var u,a=function(){var e=this;this.message=n.observable(""),this.messageXML=n.observable(""),this.messageUrl=n.observable(""),this.hasMessageUrl=n.computed(function(){return r.hasValue(e.messageUrl())}),this.acceptClick=function(){i.loginLoader.reset(),i.loginLoader.show(),i.loginMode()===i.loginModeEnum.Password?i.doLoginWorkFlowStep(i.customerNumber,i.password,i.requestCommand.TermsAndConditionsAccepted,u):i.loginMode()===i.loginModeEnum.Pin&&t.pinLogin(i.pinCode(),o.getPinLoginToken(),o.getTokenId(),!0,u)},this.reset=function(){e.message(""),e.messageXML(""),e.messageUrl("")}},f=new a;t.viewModels.push(a),u=function(e,t,n){var r=function(){e&&(n.State===i.responseCommand.AcceptLogin?i.doAcceptLoginWorkFlowStep(u):n.State===i.responseCommand.LoginProcessAccepted&&(s.isLoggedIn=!0,i.pinCode(""),i.customerNumber(""),i.password(""),i.doLoginProcessAcceptedStep(n.HasPinCodeRegistered)))};i.loginLoader.loadFinished(r)},n.applyBindings(f,e("#loginTerms").get(0)),e("#loginTerms").on("pagehide",function(){f.reset()}),e("#loginTerms").on("pagebeforeshow",function(){f.message(i.termsAndConditions.Message()),f.messageXML(i.termsAndConditions.MessageXML()),f.messageUrl(i.termsAndConditions.MessageUrl())})})