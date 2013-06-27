define(["lib/jquery","lib/knockout","ui/loader","lib/accounting","netteller/accounts","netteller/payments","netteller/session","netteller/contacts","config/environment","ui/contactHelper","lib/toolkit","ui/validation"],function(e,t,n,r,i,s,o,u,a,f,l){var c=new n.TimedLoader(a.strings["loader.accounts"]),h=new n.TimedLoader(a.strings["loader.payments"]),p=e.Deferred(),d=function(e){var n=this;this.DisplayAccountName=t.observable(e.DisplayAccountName),this.AccountName=t.observable(e.AccountName),this.BSB=t.observable(e.BSBWithDash),this.AccountNumber=t.observable(e.AccountNumber),this.DisplayAccountNumber=t.observable(e.DisplayAccountNumber),this.AvailableBalance=t.observable(Number(e.AvailableBalance)),this.DisplayAvailableBalance=t.computed(function(){return r.formatMoney(n.AvailableBalance())}),this.AccountNumAndName=n.DisplayAccountNumber()+": "+n.DisplayAccountName(),this.AccountNumNameAndAvailBal=n.AccountNumAndName+" ("+n.DisplayAvailableBalance()+")",this.AccountType=t.observable(e.AccountType)},v={allowTransfer:t.observable(!1),transferFromAccounts:t.observableArray([]),payBPayTransferFromSelectedAccount:t.observable(null),payBPayTransferFromSelectedAccountNameAndNum:t.observable(null),selectedContact:t.observable(null),billerCRN:t.observable("").extend({required:{message:a.strings["msg.nobillercrnentered"]}}).extend({number:{message:a.strings["msg.nobillercrnentered"]}}),amount:t.observable("").extend({minAmount:.01}).extend({maxAmount:9999999999}),pageMessage:t.observable(""),HasBillers:t.observable(!1),selectedContactBillerName:t.computed({read:function(){if(v.selectedContact()!==null){var e=v.selectedContact().getDescriptionString();return m.selectedContactBillerName(e),e}return a.strings["lang.label.chooseexistingbiller"]},deferEvaluation:!0}),selectedContactImage:t.computed({read:function(){return v.selectedContact()!==null?f.getContactTypeImageSrc(u.ContactType.Biller):f.getContactTypeImageSrc(u.ContactType.All)},deferEvaluation:!0}),isBillerCRNConstant:t.computed({read:function(){return v.selectedContact()!==null?v.selectedContact().IsCRNConstant:!1},deferEvaluation:!0}),isBillerCRNPAN:t.computed({read:function(){return!1},deferEvaluation:!0}),maskedBillerCRNAndCode:t.computed({read:function(){var e=v.selectedContact();return e!==null&&v.billerCRN()!==null?v.billerCRN().length>0?"Biller code "+e.BillerCode+", CRN "+v.billerCRN():"Biller code "+e.BillerCode:null},deferEvaluation:!0}),getMaskedBillerCRN:function(){return l.applyMasking(v.billerCRN())},reset:function(){v.clear()},clear:function(){v.billerCRN(""),v.amount(""),v.pageMessage(""),v.errors.showAllMessages(!1),v.allowTransfer(!1),v.selectedContact(null),v.HasBillers(!1)},selectContact:function(){u.activeContactsFilter=u.ContactType.Biller;var t=v.HasBillers()?"#contacts":"#addContact";e.mobile.changePage(t,{transition:"none"})},confirmPayBPayDetails:function(){if(v.selectedContact()==null){e("#chooseBillerPopup").popup("open");return}if(v.errors().length>0){v.errors.showAllMessages();return}var t=v.amount();v.amount(parseFloat(isNaN(t)||t===""||t===null?0:t).toFixed(2)),v.payBPayTransferFromSelectedAccountNameAndNum(v.payBPayTransferFromSelectedAccount().DisplayAccountName()+" ("+v.payBPayTransferFromSelectedAccount().DisplayAccountNumber()+")"),e("#payBpayConfirm").popup("open")},performPayBPayTransfer:function(){e("#payBpayConfirm").popup("close"),h.reset(),h.show();var t=v.selectedContact();s.executePayBPayTransfer(v.payBPayTransferFromSelectedAccount().AccountNumber(),t.BillerCode,v.billerCRN(),v.amount(),s.frequency.Immediate,y),p.done(function(t){t!==null&&t!==undefined&&t.length>0&&l.displayPageMessage(v,"pageMessage",t,e("#payBpayMessagePopup")),p=e.Deferred()})},chooseBiller:function(){u.activeContactsFilter=u.ContactType.Biller;var t=v.HasBillers()?"#contacts":"#addContact";e.mobile.changePage(t,{transition:"none"})},addBiller:function(){u.activeContactsFilter=u.ContactType.Biller,e.mobile.changePage("#addContact",{transition:"none"})}};v.errors=t.validation.group(v);var m={transferFromAccountNumAndName:t.observable(""),billerCRN:t.observable(""),billerCode:t.observable(""),selectedContactBillerName:t.observable(""),amount:t.observable(""),cbsReceiptNumber:t.observable(""),reset:function(){m.selectedContactBillerName(""),m.transferFromAccountNumAndName(""),m.billerCRN(""),m.billerCode(""),m.amount(""),m.cbsReceiptNumber("")}};o.viewModels.push(v),o.viewModels.push(m);var g=function(t){var n=function(){v.transferFromAccounts.removeAll(),e.each(t.Accounts,function(e,t){v.transferFromAccounts.push(new d(t))})};t.Accounts===undefined||t.Accounts.length===0?(c.loadFinished(),l.displayPageMessage(v,"pageMessage",a.strings["msg.noaccounts"],e("#payBpayMessagePopup")),v.allowTransfer(!1)):(c.loadFinished(n),v.allowTransfer(!0))},y=function(t){t.Success?(m.transferFromAccountNumAndName(t.FromDisplayAccountName+" ("+t.FromDisplayAccountNumber+")"),m.billerCRN(t.BillerCRN),m.billerCode(t.BillerCode),m.amount(v.amount()),m.cbsReceiptNumber(t.CBSReceiptNumber),h.loadFinished(),e.mobile.changePage("#payBpayReceipt")):(h.loadFinished(function(){p.resolve(t.ErrorMessage)}),e("#payBpayConfirm").popup("close"))};e("#payBpay").on("pageinit",function(){t.applyBindings(v,e("#payBpay").get(0)),t.applyBindings(m,e("#payBpayReceipt").get(0))}),e("#payBpay").on("pagebeforeshow",function(e,t){if(t.prevPage.attr("id")==="payments"||v.transferFromAccounts().length==0)v.clear(),c.reset(),c.startBackgroundLoad(),i.getBpayTransferFromAccounts(g);u.contactTypeCount(u.ContactType.Biller,function(e){v.HasBillers(e>0)})}),e("#payBpay div[data-role='footer'] a").on("click",function(){v.clear(),i.getBpayTransferFromAccounts(g)}),e("#payBpay").on("pageshow",function(){c.show(),v.errors.showAllMessages(!1);var t=u.selectedContact;t!==null&&t.getContactType()==u.ContactType.Biller&&(v.selectedContact(t),v.billerCRN(t.CustomerReferenceNumber),t.IsNew!==undefined&&t.IsNew===!0&&(l.displayPageMessage(v,"pageMessage",a.strings["msg.billersaved"],e("#payBpayMessagePopup")),u.activeContactsFilter=null))})})