define(["lib/jquery","netteller/session","netteller/security","config/client","config/environment","ui/startup"],function(e,t,n,r,i){var s={};s.performLogout=function(){t.logout(),e(document).trigger("tsw-logout")},s.confirmLogout=function(){if(!window.noPhoneGap){function e(e){e===1&&s.performLogout()}navigator.notification.confirm(i.strings["msg.logoutconfirm"],e,"Logout","OK,Cancel")}else{var t=window.confirm(i.strings["msg.logoutconfirm"]);t===!0&&s.performLogout()}},e(".logout-button").on("click",function(e){s.confirmLogout()});var o=null;return document.addEventListener("pause",function(e){o=new Date},!1),document.addEventListener("resume",function(e){if(n.isLoggedIn){var t=new Date,i=Number.MAX_VALUE;o!==null&&(i=(t.getTime()-o.getTime())/1e3),i>r.backgroundApplicationTimeout&&s.performLogout()}o=null},!1),s})