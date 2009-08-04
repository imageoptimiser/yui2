(function () {

	var Event = YAHOO.util.Event,
		UA = YAHOO.env.ua,
		Lang = YAHOO.lang,
		
		FOCUS = "focus",
		BLUR = "blur",
		MOUSEENTER = "mouseenter",
		MOUSELEAVE = "mouseleave",
		MOUSEOVER = "mouseover",
		MOUSEOUT = "mouseout",
		FOCUS_EVENT_NAME = UA.ie ? "focusin" : FOCUS,
	    BLUR_EVENT_NAME = UA.ie ? "focusout" : BLUR,

		delegates = [];


	Lang.augmentObject(Event, {

		/**
		 * Creates a delegate function used to call event listeners specified 
		 * via the <code>YAHOO.util.Event.delegate</code> method.
		 *
		 * @method _createDelegate
		 *
		 * @param {Function} fn        The method (event listener) to call.
		 * @param {Object}   obj	An arbitrary object that will be 
		 *                             passed as a parameter to the listener.
		 * @param {Boolean|object}  overrideContext  If true, the obj passed in becomes
		 *                             the execution context of the listener. If an
		 *                             object, this object becomes the execution
		 *                             context.
		 * @param {HTMLElement}	The element that was specified as the 
		 * delegation container. 
		 * @return {Function} Function that will call the event listener 
		 * specified by the <code>YAHOO.util.Event.delegate</code> method.
         * @private
		 * @static
		 */
		_createDelegate: function (fn, filter, obj, overrideContext) {

			return function (event, args) {

				var container = this,
					target = Event.getTarget(event),
					matchedEl,
					context,
					elements,
					element,
					nElements,
					i;


				if (Lang.isFunction(filter)) {
					matchedEl = filter(target);
				}
				else if (Lang.isString(filter)) {

					elements = YAHOO.util.Selector.query(filter, container);
					nElements = elements.length;

					if (nElements > 0) {

						i = elements.length - 1;

						do {
							element = elements[i];
		                    if (element === target || YAHOO.util.Dom.isAncestor(element, target)) {
								matchedEl = element;
							}
						}
						while (i--);
					}

				}


				if (matchedEl) {

					//	The default context for delegated listeners is the 
					//	element that matched the filter.

					context = matchedEl;

		            if (overrideContext) {
		                if (overrideContext === true) {
		                    context = obj;
		                } else {
		                    context = overrideContext;
		                }
		            }

					//	Call the listener passing in the container and the 
					//	element that matched the filter in case the user 
					//	needs those.

					return fn.call(context, event, matchedEl, container, obj);

				}

			};

		},


        /**
         * Appends a delegated event listener.  Delegated event listeners 
		 * receive three arguments by default: the DOM event, the element  
		 * specified by the filtering function or CSS selector, and the 
		 * container element (the element to which the event listener is 
		 * bound).
         *
         * @method delegate
         *
         * @param {String|HTMLElement|Array|NodeList} container An id, an element 
         *  reference, or a collection of ids and/or elements to assign the 
         *  listener to.
         * @param {String}   type     The type of event listener to append
         * @param {Function} fn        The method the event invokes
		 * @param spec {Function|string}  Function or CSS selector used to 
		 * determine for what element(s) the event listener should be called. 
		 * When a function is specified, the function should return an 
		 * HTML element.  Using a CSS Selector requires the inclusion of the 
		 * CSS Selector utility (YAHOO.util.Selector).
         * @param {Object}   obj    An arbitrary object that will be 
         *                             passed as a parameter to the listener
         * @param {Boolean|object}  overrideContext  If true, the obj passed in becomes
         *                             the execution context of the listener. If an
         *                             object, this object becomes the execution
         *                             context.
         * @return {Boolean} True if the action was successful or defered,
         *                        false if one or more of the elements 
         *                        could not have the listener attached,
         *                        or if the operation throws an exception.
         * @static
         */
		delegate: function (container, type, fn, filter, obj, overrideContext) {

			var bUseCapture = false,
				sType = type,
				fnMouseDelegate,
				fnDelegate,
				returnVal = false;


			if (Lang.isString(filter) && !YAHOO.util.Selector) {
		        return false;
			}


			if (type == MOUSEENTER || type == MOUSELEAVE) {

				sType = (type == MOUSEENTER) ? MOUSEOVER : MOUSEOUT;

				if (!Event._createMouseDelegate) {
			        return false;				
				}

				fnMouseDelegate = Event._createMouseDelegate(fn, obj, overrideContext);

				fnDelegate = Event._createDelegate(function (event, matchedEl, container) {

					return fnMouseDelegate.call(matchedEl, event, container);

				}, filter, obj, overrideContext);

				delegates.push([container, sType, fn, fnDelegate]);			

				returnVal = Event.on(container, sType, fnDelegate);

			}
			else {

				if (type == FOCUS || type == BLUR) {

					bUseCapture = true;
					sType = (type == FOCUS) ? FOCUS_EVENT_NAME : BLUR_EVENT_NAME;

					if (YAHOO.env.ua.opera) {
						Event._captureHack(sType, container);
					}

				}

				fnDelegate = Event._createDelegate(fn, filter, obj, overrideContext);

				delegates.push([container, sType, fn, fnDelegate]);

				//	Using "_addListener" here instead of "addListener/on"
				//	in order to be able to specify the use of capture mode 
				//	for the focus and blur events.

				returnVal = Event._addListener(container, sType, fnDelegate, null, null, bUseCapture);

			}
			
			return returnVal;

		},


        /**
         * Removes a delegated event listener.
         *
         * @method removeDelegate
         *
         * @param {String|HTMLElement|Array|NodeList} container An id, an element 
         *  reference, or a collection of ids and/or elements to remove
         *  the listener from.
         * @param {String} sType the type of event to remove.
         * @param {Function} fn the method the event invokes.  If fn is
         *  undefined, then all event listeners for the type of event are 
         *  removed.
         * @return {boolean} true if the unbind was successful, false 
         *  otherwise.
         * @static
         */
		removeDelegate: function (container, type, fn) {

			var sType = type,
				returnVal = false,
				index,
				cacheItem;

			switch (type) {
				case MOUSEENTER:
					sType = MOUSEOVER;
					break;
				case MOUSELEAVE:
					sType = MOUSEOUT;
					break;		
				case FOCUS:
					sType = FOCUS_EVENT_NAME;
					break;
				case BLUR:
					sType = BLUR_EVENT_NAME;
					break;
			}


			index = Event._getCacheIndex(delegates, container, sType, fn);


		    if (index >= 0) {
		        cacheItem = delegates[index];
		    }


		    if (container && cacheItem) {

		        returnVal = Event.removeListener(cacheItem[0], cacheItem[1], cacheItem[3]);

				if (returnVal) {
	                delete delegates[index][2];
	                delete delegates[index][3];
	                delegates.splice(index, 1);
				}		
		
		    }

			return returnVal;

		}
		
	});

}());
YAHOO.register("event-delegate", YAHOO.util.Event, {version: "@VERSION@", build: "@BUILD@"});
