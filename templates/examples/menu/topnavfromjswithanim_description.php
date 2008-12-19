<p>
Begin by placing the markup for the two-column Grid on the page (this 
example uses the <a href="../grids/grids-t1.html">Grids Preset Template 1, 
160px left</a>).  Add the markup for the root MenuBar instance to the 
right column of the grid, appending the class of "yuimenubarnav" to 
the root element.  The application of the "yuimenubarnav" class  
will render each item in the MenuBar instance with arrows to the right of each 
text label, providing a visual cue that the item contains a submenu.
</p>
<textarea name="code" class="HTML" cols="60" rows="1">
<div id="productsandservices" class="yuimenubar yuimenubarnav">
    <div class="bd">
        <ul class="first-of-type">
            <li class="yuimenubaritem first-of-type">
                <a class="yuimenubaritemlabel" href="#communication">Communication</a>
            </li>
            <li class="yuimenubaritem">
                <a class="yuimenubaritemlabel" href="http://shopping.yahoo.com">Shopping</a>
            </li>
            <li class="yuimenubaritem">
                <a class="yuimenubaritemlabel" href="http://entertainment.yahoo.com">Entertainment</a>
            </li>
            <li class="yuimenubaritem">
                <a class="yuimenubaritemlabel" href="#">Information</a>
            </li>
        </ul>
    </div>
</div>
</textarea>
<p>
Use the <a href="../../event/#onavailable"><code>onContentReady</code> 
method of the Event</a> utility to instantiate the MenuBar as soon as 
its markup is available for scripting.
</p>
<textarea name="code" class="JScript" cols="60" rows="1">
YAHOO.util.Event.onContentReady("productsandservices", function () {

    /*
         Instantiate a MenuBar:  The first argument passed to the 
         constructor is the id of the element in the page 
         representing the MenuBar; the second is an object literal 
         of configuration properties.
    */

    var oMenuBar = new YAHOO.widget.MenuBar("productsandservices", { 
                                                autosubmenudisplay: true, 
                                                hidedelay: 750, 
                                                lazyload: true });

});
</textarea>
<p>
This MenuBar instance makes use of several configuration properties.  Setting 
the "autosubmenudisplay" configuration property to "true" modifies its default 
behavior so that mousing over any item in the MenuBar automatically triggers 
the display of its submenu.  The "hidedelay" configuration property is set to 
"750" so each submenu automatically hides 750ms after the user's mouse has left
the menu.  Lastly, the "lazyload" property is set to "true" to help 
speed up the initial load time of the MenuBar instance by deferring the 
initialization and rendering of each submenu until just before it is initially
made visible.
</p>
<p>
Submenus are added to each item in the MenuBar by subscribing to the 
"beforeRender" event and setting the "submenu" configuration property of each 
MenuBarItem instance to an object literal containing the necessary data to 
create the submenu.
</p>
<textarea name="code" class="JScript" cols="60" rows="1">
/*
     Define an array of object literals, each containing 
     the data necessary to create a submenu.
*/

var aSubmenuData = [

    {
        id: "communication", 
        itemdata: [ 
            { text: "360", url: "http://360.yahoo.com" },
            { text: "Alerts", url: "http://alerts.yahoo.com" },
            { text: "Avatars", url: "http://avatars.yahoo.com" },
            { text: "Groups", url: "http://groups.yahoo.com " },
            { text: "Internet Access", url: "http://promo.yahoo.com/broadband" },
            {
                text: "PIM", 
                submenu: { 
                            id: "pim", 
                            itemdata: [
                                { text: "Yahoo! Mail", url: "http://mail.yahoo.com" },
                                { text: "Yahoo! Address Book", url: "http://addressbook.yahoo.com" },
                                { text: "Yahoo! Calendar",  url: "http://calendar.yahoo.com" },
                                { text: "Yahoo! Notepad", url: "http://notepad.yahoo.com" }
                            ] 
                        }
            
            }, 
            { text: "Member Directory", url: "http://members.yahoo.com" },
            { text: "Messenger", url: "http://messenger.yahoo.com" },
            { text: "Mobile", url: "http://mobile.yahoo.com" },
            { text: "Flickr Photo Sharing", url: "http://www.flickr.com" },
        ]
    },

    {
        id: "shopping", 
        itemdata: [
            { text: "Auctions", url: "http://auctions.shopping.yahoo.com" },
            { text: "Autos", url: "http://autos.yahoo.com" },
            { text: "Classifieds", url: "http://classifieds.yahoo.com" },
            { text: "Flowers & Gifts", url: "http://shopping.yahoo.com/b:Flowers%20%26%20Gifts:20146735" },
            { text: "Real Estate", url: "http://realestate.yahoo.com" },
            { text: "Travel", url: "http://travel.yahoo.com" },
            { text: "Wallet", url: "http://wallet.yahoo.com" },
            { text: "Yellow Pages", url: "http://yp.yahoo.com" }                    
        ]    
    },
    
    {
        id: "entertainment", 
        itemdata: [
            { text: "Fantasy Sports", url: "http://fantasysports.yahoo.com" },
            { text: "Games", url: "http://games.yahoo.com" },
            { text: "Kids", url: "http://www.yahooligans.com" },
            { text: "Music", url: "http://music.yahoo.com" },
            { text: "Movies", url: "http://movies.yahoo.com" },
            { text: "Radio", url: "http://music.yahoo.com/launchcast" },
            { text: "Travel", url: "http://travel.yahoo.com" },
            { text: "TV", url: "http://tv.yahoo.com" }              
        ] 
    },
    
    {
        id: "information",
        itemdata: [
            { text: "Downloads", url: "http://downloads.yahoo.com" },
            { text: "Finance", url: "http://finance.yahoo.com" },
            { text: "Health", url: "http://health.yahoo.com" },
            { text: "Local", url: "http://local.yahoo.com" },
            { text: "Maps & Directions", url: "http://maps.yahoo.com" },
            { text: "My Yahoo!", url: "http://my.yahoo.com" },
            { text: "News", url: "http://news.yahoo.com" },
            { text: "Search", url: "http://search.yahoo.com" },
            { text: "Small Business", url: "http://smallbusiness.yahoo.com" },
            { text: "Weather", url: "http://weather.yahoo.com" }
        ]
    }                    
];


/*
     Subscribe to the "beforerender" event, adding a submenu 
     to each of the items in the MenuBar instance.
*/

oMenuBar.subscribe("beforeRender", function () {

    if (this.getRoot() == this) {

        this.getItem(0).cfg.setProperty("submenu", aSubmenuData[0]);
        this.getItem(1).cfg.setProperty("submenu", aSubmenuData[1]);
        this.getItem(2).cfg.setProperty("submenu", aSubmenuData[2]);
        this.getItem(3).cfg.setProperty("submenu", aSubmenuData[3]);

    }

});


/*
     Call the "render" method with no arguments since the 
     markup for this MenuBar instance is already exists in 
     the page.
*/

oMenuBar.render();    
</textarea>
<p>
Setup the animation for the submenus by subscribing to their "beforeShow" 
and "show" events.  The "beforeShow" event handler will be used to collapse the 
height of the Menu instance before it is made visible.  The "show" event 
handler will kick off an animation that increments the "marginTop" 
style property of each submenu's <code>&#60;ul&#62;</code> element from a
negative value equal to its height to 0, causing the submenu to slowly 
expand to its original height as it is displayed.
</p>
<textarea name="code" class="JScript" cols="60" rows="1">
var ua = YAHOO.env.ua,
    oAnim;  // Animation instance


/*
     "beforeshow" event handler for each submenu of the MenuBar
     instance, used to setup certain style properties before
     the menu is animated.
*/

function onSubmenuBeforeShow(p_sType, p_sArgs) {

    var oBody,
        oElement,
        oShadow,
        oUL;


    if (this.parent) {

        oElement = this.element;

        /*
             Get a reference to the Menu's shadow element and 
             set its "height" property to "0px" to syncronize 
             it with the height of the Menu instance.
        */

        oShadow = oElement.lastChild;
        oShadow.style.height = "0px";

        
        /*
            Stop the Animation instance if it is currently 
            animating a Menu.
        */ 
    
        if (oAnim && oAnim.isAnimated()) {
        
            oAnim.stop();
            oAnim = null;
        
        }


        /*
            Set the body element's "overflow" property to 
            "hidden" to clip the display of its negatively 
            positioned <ul> element.
        */ 

        oBody = this.body;


        //  Check if the menu is a submenu of a submenu.

        if (this.parent && 
            !(this.parent instanceof YAHOO.widget.MenuBarItem)) {
        

            /*
                There is a bug in gecko-based browsers where 
                an element whose "position" property is set to 
                "absolute" and "overflow" property is set to 
                "hidden" will not render at the correct width when
                its offsetParent's "position" property is also 
                set to "absolute."  It is possible to work around 
                this bug by specifying a value for the width 
                property in addition to overflow.
            */

            if (ua.gecko) {
            
                oBody.style.width = oBody.clientWidth + "px";
            
            }
            
            
            /*
                Set a width on the submenu to prevent its 
                width from growing when the animation 
                is complete.
            */
            
            if (ua.ie == 7) {

                oElement.style.width = oElement.clientWidth + "px";

            }
        
        }


        oBody.style.overflow = "hidden";


        /*
            Set the <ul> element's "marginTop" property 
            to a negative value so that the Menu's height
            collapses.
        */ 

        oUL = oBody.getElementsByTagName("ul")[0];

        oUL.style.marginTop = ("-" + oUL.offsetHeight + "px");
    
    }

}


/*
    "tween" event handler for the Anim instance, used to 
    syncronize the size and position of the Menu instance's 
    shadow and iframe shim (if it exists) with its 
    changing height.
*/

function onTween(p_sType, p_aArgs, p_oShadow) {

    if (this.cfg.getProperty("iframe")) {
    
        this.syncIframe();

    }

    if (p_oShadow) {

        p_oShadow.style.height = this.element.offsetHeight + "px";
    
    }

}


/*
    "complete" event handler for the Anim instance, used to 
    remove style properties that were animated so that the 
    Menu instance can be displayed at its final height.
*/

function onAnimationComplete(p_sType, p_aArgs, p_oShadow) {

    var oBody = this.body,
        oUL = oBody.getElementsByTagName("ul")[0];

    if (p_oShadow) {
    
        p_oShadow.style.height = this.element.offsetHeight + "px";
    
    }


    oUL.style.marginTop = "";
    oBody.style.overflow = "";
    

    //  Check if the menu is a submenu of a submenu.

    if (this.parent && 
        !(this.parent instanceof YAHOO.widget.MenuBarItem)) {


        // Clear widths set by the "beforeshow" event handler

        if (ua.gecko) {
        
            oBody.style.width = "";
        
        }
        
        if (ua.ie == 7) {

            this.element.style.width = "";

        }
    
    }
    
}


/*
     "show" event handler for each submenu of the MenuBar 
     instance - used to kick off the animation of the 
     <ul> element.
*/

function onSubmenuShow(p_sType, p_sArgs) {

    var oElement,
        oShadow,
        oUL;

    if (this.parent) {

        oElement = this.element;
        oShadow = oElement.lastChild;
        oUL = this.body.getElementsByTagName("ul")[0];
    

        /*
             Animate the <ul> element's "marginTop" style 
             property to a value of 0.
        */

        oAnim = new YAHOO.util.Anim(oUL, 
            { marginTop: { to: 0 } },
            .5, YAHOO.util.Easing.easeOut);


        oAnim.onStart.subscribe(function () {

            oShadow.style.height = "100%";
        
        });


        oAnim.animate();


        /*
            Subscribe to the Anim instance's "tween" event for 
            IE to syncronize the size and position of a 
            submenu's shadow and iframe shim (if it exists)  
            with its changing height.
        */

        if (YAHOO.env.ua.ie) {
            
            oShadow.style.height = oElement.offsetHeight + "px";


            /*
                Subscribe to the Anim instance's "tween"
                event, passing a reference Menu's shadow 
                element and making the scope of the event 
                listener the Menu instance.
            */

            oAnim.onTween.subscribe(onTween, oShadow, this);

        }


        /*
            Subscribe to the Anim instance's "complete" event,
            passing a reference Menu's shadow element and making 
            the scope of the event listener the Menu instance.
        */

        oAnim.onComplete.subscribe(onAnimationComplete, oShadow, this);
    
    }

}


/*
     Subscribe to the "beforerender" event, adding a submenu 
     to each of the items in the MenuBar instance.
*/

oMenuBar.subscribe("beforeRender", function () {

    if (this.getRoot() == this) {

        this.getItem(0).cfg.setProperty("submenu", aSubmenuData[0]);
        this.getItem(1).cfg.setProperty("submenu", aSubmenuData[1]);
        this.getItem(2).cfg.setProperty("submenu", aSubmenuData[2]);
        this.getItem(3).cfg.setProperty("submenu", aSubmenuData[3]);

    }

});


/*
     Subscribe to the "beforeShow" and "show" events for 
     each submenu of the MenuBar instance.
*/

oMenuBar.subscribe("beforeShow", onSubmenuBeforeShow);
oMenuBar.subscribe("show", onSubmenuShow);
</textarea>