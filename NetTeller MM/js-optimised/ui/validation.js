define(["lib/knockout","config/environment","lib/knockout.validation"],function(e,t){e.validation.insertValidationMessage=function(t){var n=$("<span/>");n.addClass(e.validation.utils.getConfigOptions(t).errorMessageClass),n.css("right",$(t).attr("type")=="number"&&navigator.userAgent.toLowerCase().indexOf("chrome")>0?"21px":"5px");var r=$("<div/>");return r.css("position","relative"),r.append(n),r.insertAfter(t),n.get(0)},e.validation.rules.minAmount={validator:function(e,t){if(e!==undefined){var n=e.toString().indexOf(".")>-1,r=e.toString().length-(e.toString().indexOf(".")+1),i=r>=1&&r<=2;return n?i&&e>=t:e>=t}return!0},message:t.strings["msg.invalidamountentered"]},e.validation.rules.maxAmount={validator:function(e,t){if(e!==undefined){var n=e.toString().indexOf(".")>-1,r=e.toString().length-(e.toString().indexOf(".")+1),i=r>=1&&r<=2;return n?i&&e<=t:e<=t}return!0},message:t.strings["msg.invalidamountentered"]},e.validation.rules.isRequiredAndValidLength={message:"",validator:function(n,r){var i=e.validation.rules.isRequiredAndValidLength,s=r.minLength===r.maxLength,o=r.isNumber!==undefined&&r.isNumber===!0,u=o===!0?"digit":"character",a=o===!0?!isNaN(n):!0;if(s){if(n.length===0||n.length!==r.maxLength||a===!1)return u=r.maxLength===1?u:u+"s",r.fieldOrMessage.indexOf("msg:",0)===0?i.message=r.fieldOrMessage.replace("msg:","").trim():i.message=t.strings["msg.requiredandinvalidexactlength"].replace("{0}",r.fieldOrMessage).replace("{1}",r.maxLength).replace("{2}",u),!1}else if(n.length===0||n.length<r.minLength||n.length>r.maxLength||a===!1)return u+="s",r.fieldOrMessage.indexOf("msg:",0)===0?i.message=r.fieldOrMessage.replace("msg:","").trim():i.message=t.strings["msg.requiredandinvalidlengthrange"].replace("{0}",r.field).replace("{1}",r.minLength).replace("{2}",r.maxLength).replace("{3}",u),!1;return!0}},e.validation.configure({registerExtenders:!0,insertMessages:!0,parseInputAttributes:!0,messageTemplate:null,messagesOnModified:!0,decorateElement:!0,errorMessageClass:"validationMessage",errorElementClass:"validationElement"})})