define(["lib/jquery","netteller/security","netteller/localstorage","config/environment"],function(e,t,n,r){var i=[],s=!1,o=function(){i=[],s=!1},u=function(n,r){return function(i,s,o){try{i.IsSessionExpired?(t.isLoggedIn&&t.endSession(),e(document).trigger("tsw-session-expired")):(i.SessionToken!==undefined&&(t.sessionToken=i.SessionToken),i.NextMessageCheck!==undefined&&(t.nextMessageCheck=i.NextMessageCheck));var u=n(i,s,o);return r.resolve(),u}catch(a){window.alert("An unexpected error has occurred.")}}},a=function(n,r){return function(s){try{var u=["Session/Login","Session/PinLogin","Session/VerifyToken","Session/PreLoginWorkflow"];if(s&&s.readyState===0&&s.status===0&&s.responseText===""&&n.tried<2){i.unshift(n),r.resolve();return}o(),t.isLoggedIn||u.indexOf(n.uri)>=0?t.isLoggedIn?(t.endSession(),e(document).trigger("tsw-session-expired")):e(document).trigger("tsw-communications-error"):(t.isLoggedIn&&t.endSession(),document.location.href="#home",document.location.reload())}catch(a){window.alert("An unexpected error has occurred.")}}},f=function(n){var r=["Session/Login","Session/ChangePassword","Session/AcceptLogin","Session/GetClientVersioningData"],i=n.uri,s=!1;e.each(r,function(e,t){i.indexOf(t,i.length-t.length)!==-1&&(s=!0)});if(s)return;var o=t.isLoggedIn===!0?t.sessionToken:null,u=t.isLoggedIn===!0?t.getAuthCode():null;e.extend(n.data,{SessionToken:o,AuthCode:u})},l=function(){if(i.length>0)try{s=!0;var t=i.shift();t.tried+=1,f(t);var n="?_="+(new Date).getTime(),r=e.Deferred();r.done(l),e.ajax({url:h.webApiUrl+t.uri+n,cache:!1,data:t.data||{},dataType:"json",success:u(t.success,r),error:a(t,r),type:"POST"})}catch(o){window.alert("An unexpected error has occurred.")}else s=!1},c=window.noPhoneGap===!0?"../":r.strings["app.rest.endpoint"];c.charAt(c.length-1)!=="/"&&(c+="/"),c+="NetTellerServices/";var h={ntsRoot:c,webApiUrl:c+"api/",globalEnable:!0,callService:function(e,t,n){if(!h.globalEnable)return;var r={uri:e,data:t,success:n,tried:0};i.push(r),s||l()}};return h})