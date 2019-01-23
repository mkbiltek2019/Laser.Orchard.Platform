/**
 * Copyright (C) 2012 Chris Wharton (chris@weare2ndfloor.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
 * HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
 * FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
 * OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
 * COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
 * BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
 * DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://gnu.org/licenses/>.
 
 Documentation available at http://cookiecuttr.com
 
 */
(function ($) {
    function load() {
        $.cookieCuttr = function (options) {
            var defaults = {
                cookieCutter: false, // you'd like to enable the div/section/span etc. hide feature? change this to true
                cookieAcceptButton: true, // this will disable non essential cookies
                cookieResetButton: false,
                cookieOverlayEnabled: false, // don't want a discreet toolbar? Fine, set this to true
				cookiePolicyLink: '/privacy-policy/', // if applicable, enter the link to your privacy policy here...
				cookieTitle: "This website uses cookies",
                cookieMessage: 'We use cookies on this website, you can <a href="{{cookiePolicyLink}}" title="read about our cookies">read about them here</a>. To use the website as intended please...',
                cookieErrorMessage: "We\'re sorry, this feature places cookies in your browser and has been disabled. <br>To continue using this functionality, please",
                cookieWhatAreTheyLink: "http://www.allaboutcookies.org/",
                cookieDisable: '',
                cookieExpires: 365,
                cookieAcceptButtonText: "ACCEPT COOKIES",
                cookieResetButtonText: "RESET COOKIES FOR THIS WEBSITE",
                cookieWhatAreLinkText: "What are cookies?",
                cookieNotificationLocationBottom: false, // top or bottom - they are your only options, so true for bottom, false for top            
                cookiePolicyPage: false,
                cookiePolicyPageMessage: 'Please read the information below and then choose from the following options',
                cookieDiscreetReset: false,
                cookieDiscreetPosition: "topleft", //options: topleft, topright, bottomleft, bottomright         
                cookieNoMessage: false, // change to true hide message from all pages apart from your policy page
				cookieDomain: "",
				cookiePoweredBy: "",
				cookiePoweredByIcon: ""
            };
            var options = $.extend(defaults, options);
			var message = defaults.cookieMessage; //.replace('{{cookiePolicyLink}}', defaults.cookiePolicyLink);
            defaults.cookieMessage = 'We use cookies on this website, you can <a href="' + defaults.cookiePolicyLink + '" title="read about our cookies">read about them here</a>. To use the website as intended please...';
            //convert options
			var cookieTitle = options.cookieTitle;
            var cookiePolicyLinkIn = options.cookiePolicyLink;
            var cookieCutter = options.cookieCutter;
            var cookieAcceptButton = options.cookieAcceptButton;
            var cookieResetButton = options.cookieResetButton;
            var cookieOverlayEnabled = options.cookieOverlayEnabled;
            var cookiePolicyLink = options.cookiePolicyLink;
            var cookieMessage = message;
            var cookieErrorMessage = options.cookieErrorMessage;
            var cookieDisable = options.cookieDisable;
            var cookieWhatAreTheyLink = options.cookieWhatAreTheyLink;
            var cookieExpires = options.cookieExpires;
            var cookieAcceptButtonText = options.cookieAcceptButtonText;
            var cookieResetButtonText = options.cookieResetButtonText;
            var cookieWhatAreLinkText = options.cookieWhatAreLinkText;
            var cookieNotificationLocationBottom = options.cookieNotificationLocationBottom;
            var cookiePolicyPage = options.cookiePolicyPage;
            var cookiePolicyPageMessage = options.cookiePolicyPageMessage;
            var cookieDiscreetReset = options.cookieDiscreetReset;
            var cookieDiscreetPosition = options.cookieDiscreetPosition;
            var cookieNoMessage = options.cookieNoMessage;
            var cookieExpectedValue = options.cookieExpectedValue;
			var cookieAccepted = options.cookieAccepted;
			var cookiePoweredBy = options.cookiePoweredBy;
			var cookiePoweredByIcon = options.cookiePoweredByIcon;
            // cookie identifier

            var manageCookieResetButton = function (options) {
                // write cookie reset button
                if ((options.cookieResetButton) && (options.cookieDiscreetReset)) {
                    if (appOrPre) {
						$('body').append('<div class="cc-cookies-reset cc-discreet"><div class="cc-cookie-frame"><div class="cc-cookie-box"><a class="cc-cookie-reset" href="#" title="' + options.cookieResetButtonText + '">' + options.cookieResetButtonText + '</a></div></div></div>');
                    } else {
						$('body').prepend('<div class="cc-cookies-reset cc-discreet"><div class="cc-cookie-frame"><div class="cc-cookie-box"><a class="cc-cookie-reset" href="#" title="' + options.cookieResetButtonText + '">' + options.cookieResetButtonText + '</a></div></div></div>');
                    }
                    //add appropriate CSS depending on position chosen
					if (cookieNotificationLocationBottom) {
						$('div.cc-cookies-reset').css("bottom", "0");
						$('div.cc-cookies-reset').css("left", "0");
						$('div.cc-cookies-reset').css("width", "100%");
					} else {
						$('div.cc-cookies-reset').css("top", "0");
						$('div.cc-cookies-reset').css("left", "0");
						$('div.cc-cookies-reset').css("width", "100%");
					}
                } else if (options.cookieResetButton) {
                    if (appOrPre) {
						$('body').append('<div class="cc-cookies-reset"><div class="cc-cookie-frame"><div class="cc-cookie-box"><a href="#" class="cc-cookie-reset">' + options.cookieResetButtonText + '</a></div></div></div>');
                    } else {
						$('body').prepend('<div class="cc-cookies-reset"><div class="cc-cookie-frame"><div class="cc-cookie-box"><a href="#" class="cc-cookie-reset">' + options.cookieResetButtonText + '</a></div></div></div>');
                    }
                } else {
                    options.cookieResetButton = "";
                }
                //reset cookies
                $('a.cc-cookie-reset').click(function (f) {
                    f.preventDefault();
                    $.cookie("cc_cookie_accept", null, {
                        path: '/'
                    });
                    $(".cc-cookies-reset").fadeOut(function () {
                        // reload page to activate cookies
                        location.reload();
                    });
                });
                $('div.cc-cookies-reset').show();
            }

            var $cookieAccepted = cookieAccepted;
            $.cookieAccepted = function () {
                return $cookieAccepted;
            };
            // write cookie accept button
            if (cookieAcceptButton) {
                var cookieAccept = ' <a href="#accept" class="cc-cookie-accept">' + cookieAcceptButtonText + '</a> ';
            } else {
                var cookieAccept = "";
            }
            // to prepend or append, that is the question?
            if (cookieNotificationLocationBottom) {
                var appOrPre = true;
            } else {
                var appOrPre = false;
            }
            if ($cookieAccepted) {
                manageCookieResetButton(options);
            } else {
                // add message to just after opening body tag
				var htmlBanner = '<div class="cc-cookies"><div class="cc-cookie-box"><h3>' + cookieTitle + "</h3>" + cookieMessage + '<div style="position:relative"><div id="ccPoweredBy" style="height:34px"><div style="position:absolute;bottom:0px;margin-bottom:6px">GDPR Cookies <img src="' + cookiePoweredByIcon + '" style="width:20px"> ' + cookiePoweredBy + '</div></div><div style="position:absolute;right:0;bottom:0">' + cookieAccept + '</div></div></div></div></div>';
				var htmlOverlay = '<div class="cc-cookies cc-overlay"><div class="cc-cookie-frame"><div class="cc-cookie-box"><h3>' + cookieTitle + "</h3><p>" + cookieMessage + "</p>" + cookieAccept + '<hr/><p id="ccPoweredBy">GDPR Cookies <img src="' + cookiePoweredByIcon + '" style="width:20px"> ' + cookiePoweredBy + '</p></div></div></div>';
                if (cookiePolicyPage) { // show policy page overlay
					$('body').prepend(htmlBanner);
				} else { // show privacy policy option
					if (cookieOverlayEnabled) {
						$('body').append(htmlOverlay);
					} else if (appOrPre) {
						$('body').append(htmlBanner);
                    } else {
						$('body').prepend(htmlBanner);
                    }
                }
            }
			//add appropriate CSS depending on position chosen
			if (cookiePolicyPage) {
				$('div.cc-cookies').css("position", "relative");
			}
			if (cookieOverlayEnabled) {
				$('div.cc-cookies').css("top", "0");
			} else if (cookieNotificationLocationBottom) {
				$('div.cc-cookies').css("bottom", "0");
				$('div.cc-cookies').css("background-color", "black");
				$('div.cc-cookies').css("box-shadow", "#121212 2px 2px 14px 2px");
				$('div.cc-cookie-box').css("width", "90%");
				$('div.cc-cookie-box').css("max-width", "670px");
				$('div.cc-cookie-box').css("margin", "0px auto");
				$('div.cc-cookie-box a.cc-cookie-accept').css("width", "auto");
				$('div.cc-cookie-box').css("padding", "0px");
			} else {
				$('div.cc-cookies').css("top", "0");
				$('div.cc-cookies').css("background-color", "black");
				$('div.cc-cookies').css("box-shadow", "#121212 2px 2px 14px 2px");
				$('div.cc-cookie-box').css("width", "90%");
				$('div.cc-cookie-box').css("max-width", "670px");
				$('div.cc-cookie-box').css("margin", "0px auto");
				$('div.cc-cookie-box a.cc-cookie-accept').css("width", "auto");
				$('div.cc-cookie-box').css("padding", "0px");
			}
            // setting the cookies

            // for top bar
            $('.cc-cookie-accept').click(function (e) {
                e.preventDefault();

                var aux1 = "";
                if ($("#chkPreferences").prop("checked")) {
                    aux1 = aux1 + "1";
                } else {
                    aux1 = aux1 + "0";
                }
                if ($("#chkStatistical").prop("checked")) {
                    aux1 = aux1 + "1";
                } else {
                    aux1 = aux1 + "0";
                }
                if ($("#chkMarketing").prop("checked")) {
                    aux1 = aux1 + "1";
                } else {
                    aux1 = aux1 + "0";
                }
                $.cookie("cc_cookie_accept", cookieExpectedValue + aux1, {
                    expires: cookieExpires,
                    path: '/'
                });
                $(".cc-cookies").fadeOut(function () {
                    // reload page to activate cookies
                    //location.reload();
                    manageCookieResetButton(options);
                });
            });
            //cookie error accept
            $('.cc-cookies-error a.cc-cookie-accept').click(function (g) {
                g.preventDefault();
                $.cookie("cc_cookie_accept", "cc_cookie_accept", {
                    expires: cookieExpires,
                    path: '/'
                });
                // reload page to activate cookies
                location.reload();
            });
        };
    }
    return load();
})(jQuery);