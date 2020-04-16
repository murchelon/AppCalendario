//Get the current message opened
function TestBIB()
{ 
    logStack("TestBIB");

    //getPeople(searchText, fieldToSearch, coverage, orderBy, unifyOrderBy)

    // var retFunc = getPeople("marcelo", "ALL", "ALL", "EMAIL", true);
    // //var retFunc = getPeople(" oliveira ", "ALL", "ALL");
    // console.log("retFunc: " + retFunc);

}


//Get the current message opened
function TEST_GetProfilePhotosFromPeople()
{ 
    logStack("TEST_GetProfilePhotosFromPeople");

    var people = People.People.Connections.list('people/me', {
        personFields: 'names,photos'
    });

    
    var json1 = JSON.parse(people);

    //Logger.log(JSON.stringify(json1));
    
 
    Logger.log("============================");


    for (var item in json1)
    {
        if (item == "totalItems")
        {
            var totalItensFound = json1[item]
        }
        
        if (item == "connections")
        {        
            //Logger.log("ITEM: " + item + " = " + json1[item]);
            
            for (var connection in json1[item])
            {
                //Logger.log("== CONNECTION: " + connection + " = " + json1[item][connection]);
                
                for (var attributes in json1[item][connection])
                {
                    //Logger.log("== ATTR: " + attributes + " = " + json1[item][connection][attributes]);

                    if (attributes == "resourceName")
                    {
                        var contact_resourceName = json1[item][connection][attributes];
                    }
                    
                    if (attributes == "etag")
                    {
                        var contact_etag = json1[item][connection][attributes];
                    }
                        
                    if (attributes == "names")
                    {
                        for (var names in json1[item][connection][attributes])
                        {
                            for (var name_detail in json1[item][connection][attributes][names])
                            {
                                //Logger.log("== NAME_DETAIL: " + name_detail + " = " + json1[item][connection][attributes][names][name_detail]);
                                
                                if (name_detail == "displayName")
                                {
                                    var contact_name = json1[item][connection][attributes][names][name_detail];
                                }
                                
                                if (name_detail == "metadata")
                                {
                                    for (var metadata in json1[item][connection][attributes][names][name_detail])
                                    {                                    
                                        //Logger.log("== NAME_DETAIL_METADATA: " + metadata + " = " + json1[item][connection][attributes][names][name_detail][metadata]);
                                        
                                        if (metadata == "source")
                                        {
                                            for (var source in json1[item][connection][attributes][names][name_detail][metadata])
                                            {                                            
                                                //Logger.log("== NAME_DETAIL_METADATA_SOURCE: " + source + " = " + json1[item][connection][attributes][names][name_detail][metadata][source]);
                                                
                                                if (source == "id")
                                                {                                                
                                                    var contact_id = json1[item][connection][attributes][names][name_detail][metadata][source]
                                                }
                                                
                                            }

                                        }
                                     
                                    }                                
                                
                                }

                            }
                        
                        }
                        
                    }
                    
                    
                    if (attributes == "photos")
                    {
                        for (var photos in json1[item][connection][attributes])
                        {
                            //Logger.log("== PHOTOS: " + photos + " = " + json1[item][connection][attributes][photos]);
                            
                            for (var photo_detail in json1[item][connection][attributes][photos])
                            {
                                //Logger.log("== PHO_DETAIL: " + photo_detail + " = " + json1[item][connection][attributes][photos][photo_detail]);
                                
                                if (photos == "0")
                                {
                                    //Logger.log("== PHO_DETAIL: " + photo_detail + " = " + json1[item][connection][attributes][photos][photo_detail]);
                                    
                                    if (photo_detail == "url")
                                    {
                                        var contact_photo = json1[item][connection][attributes][photos][photo_detail];
                                    }
                                
                                }
                                
                            }
                        
                        }                        

                    }                                
                    
                }
                
                Logger.log("FINAL: contact_id = " + contact_id);
                Logger.log("FINAL: contact_name = " + contact_name);
                Logger.log("FINAL: contact_photo = " + contact_photo);
                Logger.log("FINAL: contact_resourceName = " + contact_resourceName);
                Logger.log("FINAL: contact_etag = " + contact_etag);
                Logger.log("============================");     

            }
        }
    }
    
    Logger.log("FINAL: totalItensFound = " + totalItensFound);
    
    // accountId = "a6d2e8a8e8166ab";

    // var people = People.People.get('people/' + accountId, {
    //     personFields: 'names,emailAddresses,coverPhotos,photos'
    // });

    // Logger.log('Public Profile: %s', JSON.stringify(people, null, 2));

    Logger("ok estou no final");
    
}




function getCurrentMessage(event)
{
    logStack("getCurrentMessage");
    var accessToken = event.messageMetadata.accessToken;
    var messageId = event.messageMetadata.messageId;

    GmailApp.setCurrentMessageAccessToken(accessToken);

    return GmailApp.getMessageById(messageId);
}


//Get a string in ISO date format, from a given date. returns string: YYYY-MM-DD HH:MM:SS
function isoDate(theDate)
{
    var ret = "";

    if (theDate != "" && theDate != null)
    {
        var ret = theDate.toISOString();

        ret = trim(ret);
        ret = ret.replace("T", " ");
        ret = left(ret, 19);
    }
 
    return ret; 
}


//Get the left-most N caracters from a string
function left(theString, Size)
{
    var ret = "";

    if (theString != "" && theString != null)
    {
        ret = theString.substring(0, Size);
    }
 
    return ret; 
}


//Get the right-most N caracters from a string
function right(theString, Size)
{
    var ret = "";

    if (theString != "" && theString != null)
    {
        ret = theString.substring(theString.length - Size, theString.length);
    }
 
    return ret; 
}


// trim the string
function trim(theString)
{  
    var ret = "";

    if (theString != "" && theString != null)
    {
        ret = theString.replace(/^\s+|\s+$/g,'');
    }
 
    return ret; 
}


// clean the string removing non printable chars and others that might be handfull. Also trims the string
function clean(theString)
{  
    var ret = "";


    if (theString != "" && theString != null)
    {
        ret = theString.toString();
        ret = trim(ret);
        ret = ret.replace(String.fromCharCode(160), "");
        ret = ret.replace(String.fromCharCode(150), "");
        ret = ret.replace("'", "´");
    }
 
    return ret; 
}


// Shows a popup msg in the user screen. Usage: return showPopMsg("this is a test");
// usage: return showPopMsg("texto to show");
function showPopMsg(Message) 
{
    logStack("showPopMsg");
    return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification()
        .setText(Message))
    .build();
}

function logStack(theFunc)
{
    Logger.log("STACK>> " + theFunc + "()");
}


function Log(Message)
{
    Logger.log("LOG>> " + Message);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * addBtnToBtnSet: add an button to be used in a buttonset
 * @param {string} id - The ID defined for the button
 * @param {string} Text - the text that will appear in the button
 * @param {string} onClickFunction - The function that will be called when the button is clicked
 * @param {string} isFilled - optional - true or false: defines the visual style of the button
 * @returns {button} returns the created button to be added to a buttonSet
*/
function addBtnToBtnSet(id, Text, onClickFunction, isFilled) 
{
    logStack("addBtnToBtnSet");

    var local_function = onClickFunction.toString();

    // Button
    var action = CardService.newAction()
        .setFunctionName(local_function)
        .setLoadIndicator(CardService.LoadIndicator.SPINNER)
        .setParameters({'id': id.toString()});
    
    if (isFilled == true)
    {
        var TypeButton = CardService.TextButtonStyle.FILLED
    }   
    else
    {
        var TypeButton = CardService.TextButtonStyle.TEXT
    } 
    
    var button = CardService.newTextButton()
        .setText(Text)
        .setTextButtonStyle(TypeButton)
        .setBackgroundColor("#315c7a")
        .setOnClickAction(action);
    
    return button;
}


function render_Alert(Message, funcToReturn)
{
    logStack("render_Alert");

    
    var buttonSet_Back = CardService.newButtonSet();
    buttonSet_Back.addButton(addBtnToBtnSet(1, "Back", funcToReturn.toString(), true));    

    // Render the page, adding all widgets
    var card = CardService.newCardBuilder()
        //.setHeader(cardHeader)
        .addSection(CardService.newCardSection()
            .addWidget(CardService.newTextParagraph().setText(Message))
            .addWidget(buttonSet_Back)
        )

        .build();

    var nav = CardService.newNavigation().pushCard(card);
        return CardService.newActionResponseBuilder()
            .setNavigation(nav)
            .build();
}







// show some text in the screen, for debug
// usage: return writeDebugTxtInScreen("texto to show");
function writeDebugTxtInScreen(theText)
{
    logStack("writeDebugTxtInScreen");

    var card_section1 = CardService.newCardSection()
        .addWidget(CardService.newTextParagraph().setText(theText));
 
    var card = CardService.newCardBuilder()
        .addSection(card_section1)
        .build();

    return [card];
}


// In javascript the replace function only replaces the first occorence. So, this funcion replaces ALL ocorrences.
// This IS CASE SENSITIVE
function replaceALL(stringSearched, findString, replaceWith)
{
    return stringSearched.split(findString).join(replaceWith);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * getPeople: Search for people in google personal contacs and/or company directory, choosing the order of the results and unifying (or not) the contacts and directory results. Function 100% compilant with the javaScript V8 Engine.
 * @param {string} searchText - The text being searched. Can be used to search by email, name, etc. If empty, returns ALL contacts/directory entrys
 * @param {string} fieldToSearch - (optional) (default: ALL): EMAIL|NAME|ALL . Allow searching for email or name or both. ALL search for both email and name
 * @param {string} coverage - (optional) (default: ALL): CONTACTS|DIRECTORY|ALL . Allow searching contacts only, or directory only or both
 * @param {string} orderBy - (optional) (default: NAME): NONE|NAME|EMAIL . Order the results by name or email or.. doesnt order by anything (in this case, show the results in the order that they were retrieved from google)
 * @param {string} unifyOrderBy - (optional) (default: true): true|false . Mix the ordering with CONTACTS and DIRECTORY. if true, the results will be ordered mixing contacts and directory results. If false, will show first the contacs then the directory results.
 * @returns {string} - returns a string indicating if the function succeded or not. If an error ocurred, the ErrodCode and Description are returned. Else, the total os results and a JSON with the results.
*/
function getPeople(searchText, fieldToSearch="ALL", coverage="ALL", orderBy="NAME", unifyOrderBy=true)
{

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // History:
    // 16:23:00 14/04/2020 (murch): added: function searchs for the contact profile photo, in the People API
    // 12:31:00 09/04/2020 (murch): function creation
    // 
    // ==========================================
    //
    // Calling examples: ("" can default to "ALL" or "NAME" or true, depending on witch parameter we are looking)
    //
    // var retFunc = getPeople("Marcelo", "NAME", "ALL", "NAME", true);
    // console.log(JSON.stringfy(retFunc));
    //
    // var retFunc = getPeople("Joao");
    // console.log(JSON.stringfy(retFunc));
    //
    // var retFunc = getPeople("", "", "CONTACTS", "NAME"); // get all contacts 
    // console.log(JSON.stringfy(retFunc));
    //
    // var retFunc = getPeople("Andre", "ALL", "ALL", "NAME", false);
    // console.log(JSON.stringfy(retFunc));
    //
    //
    // ------------------------------------------
    // Auth scope needed, in appscript.json:
    // ------------------------------------------
    //
    // for admin contacts (Admin Directory API):
    // "https://www.google.com/m8/feeds",
    // "https://www.googleapis.com/auth/admin.directory.user",
    //
    // for profile photo (People API):
    // "https://www.googleapis.com/auth/userinfo.profile"
    //
    // ------------------------------------------
    // Return:
    // ------------------------------------------
    // if an error occours:
    // returns: -1|description of the error
    // 
    // if the search resulted zero results found:
    // returns: 0|No results found for searched text
    //
    // if the search resulted in one or more results:
    // returns: intWithTheTotalNumberOfResults|theJSONbellow
    //
    // The JSON with the results,:
    // JSON with an array of people that were found, in the following example format:
    //
    // {
    //     [
    //         {
    //             "index": 0,
    //             "id": "http://www.google.com.br/ewe/longandstrangegoogleid",
    //             "source": "CONTACTS",
    //             "name": "Marcelo Josefino",
    //             "primaryEmail": "marcelo@wefwef.com",
    //             "thumbnailPhotoUrl": "http://www.qwdqwd.com/foto2.png"
    //         },    
    //         {
    //             "index": 1,
    //             "id": "JKS62H2K3",
    //             "source": "DIRECTORY",
    //             "name": "Marcelo Rocha",
    //             "primaryEmail": "murch@pobox.com",
    //             "thumbnailPhotoUrl": "http://www.qwdqwd.com/foto.png"
    //         }
    //     ]
    // }
    //
    // Using the example above, the return would be:
    // 2|{[{"index": 0,"id": "http://www.google.com.br/ewe/longandstrangegoogleid", "sour... the rest of the json.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    logStack("getPeople");

    var retFunc = "";
    
    var lookInContacts = false;
    var lookInDirectory = false;

    var lookInEmail = false;
    var lookInName = false;

    var aRetResults_temp = [];
    var aRetResults_NoDuplicated = [];
    var aRetResults_final = [];
    var countResult = 0;    
    
    var aTemp_Name = [];

    var param_SearchProfilePhotoInPeopleAPI = true;     // param that can be set to true or false, to look for the profile picture for contacts



    // define default values, if not supplied
    if ((typeof fieldToSearch === 'undefined') || (fieldToSearch == "")) { fieldToSearch = 'ALL'; }
    if ((typeof coverage === 'undefined') || (coverage == "")) { coverage = 'ALL'; }
    if ((typeof orderBy === 'undefined') || (orderBy == "")) { orderBy = 'NAME'; }
    if ((typeof unifyOrderBy === 'undefined') || (unifyOrderBy == "")) { unifyOrderBy = true; }

    // // debug:
    // console.log("fieldToSearch = " + fieldToSearch);
    // console.log("coverage = " + coverage);
    // console.log("orderBy = " + orderBy);
    // console.log("unifyOrderBy = " + unifyOrderBy);
    // return;

    // clean input to remote unwanted chars
    searchText = clean(searchText);
    searchText = replaceALL(searchText, "*", "");
    
    fieldToSearch = clean(fieldToSearch.toUpperCase());
    coverage = clean(coverage.toUpperCase());

    // define some internal parameters
    if ((fieldToSearch == "EMAIL") || (fieldToSearch == "ALL")) {lookInEmail = true;}
    if ((fieldToSearch == "NAME") || (fieldToSearch == "ALL")) {lookInName = true;}
    
    if ((coverage == "CONTACTS") || (coverage == "ALL")) {lookInContacts = true;}
    if ((coverage == "DIRECTORY") || (coverage == "ALL")) {lookInDirectory = true;}
  
    // //debug:
    // retFunc = "";
    // retFunc += "fieldToSearch: " + fieldToSearch + " , lookInEmail = " + lookInEmail + ", lookInName = " + lookInName;
    // retFunc += " | ";
    // retFunc += "coverage: " + coverage + " , lookInContacts = " + lookInContacts + ", lookInDirectory = " + lookInDirectory;
    // return retFunc;


    // returns with error if the params are incorrect
    if ((lookInContacts == false) && (lookInDirectory == false))
    {
        retFunc = "-1|Incorrect param: You must search in at least one source (CONTACTS or DIRECTORY or ALL)";
        return retFunc;
    }
    
    if ((lookInEmail == false) && (lookInName == false))
    {
        retFunc = "-1|Incorrect param: You must search in at least one field (EMAIL or NAME or ALL)";
        return retFunc;
    }
    

    //Debug:
    //lookInContacts = true;
    //lookInDirectory = false;
    
    

    // CONTACTS SEARCH
    if (lookInContacts == true)
    {
        
        // first, get all of the profile photos from the personal contatos. Unfortunately, this photos arent part of the ContactsApp return.. so .. we have to get it from other Google API, called People
        // bellow, after this next try/catch block, we have the actual code witch gets the contacts from the ContactsApp
        if (param_SearchProfilePhotoInPeopleAPI == true)
        {
            try
            {

                // code just to get the contacts profile photos, witch reside in the People API:
                var aPeopleContactPhotos = [];
                var contaPeople = 0;

                // create the array with all personal contacts profile photos
                var people = People.People.Connections.list('people/me', {
                    personFields: 'names,photos'
                });
                            
                var json1 = JSON.parse(people);
                    
                //Logger.log("============================");
            
                
                for (var item in json1)
                {
                    if (item == "totalItems")
                    {
                        var totalItensFound = json1[item]
                    }
                    
                    if (item == "connections")
                    {        
                        //Logger.log("ITEM: " + item + " = " + json1[item]);
                        
                        for (var connection in json1[item])
                        {
                            //Logger.log("== CONNECTION: " + connection + " = " + json1[item][connection]);
                            
                            var contact_id = "";
                            var contact_name = "";
                            var contact_photo = "";
                            var contact_resourceName = "";
                            var contact_etag = "";
                        
                            
                            for (var attributes in json1[item][connection])
                            {
                                //Logger.log("== ATTR: " + attributes + " = " + json1[item][connection][attributes]);
            
                                // get resourceName
                                if (attributes == "resourceName")
                                {
                                    var contact_resourceName = json1[item][connection][attributes];
                                }
                                
                                // get etag
                                if (attributes == "etag")
                                {
                                    var contact_etag = json1[item][connection][attributes];
                                }
                                    
                                // get the contact ID
                                if (attributes == "names")
                                {
                                    for (var names in json1[item][connection][attributes])
                                    {
                                        for (var name_detail in json1[item][connection][attributes][names])
                                        {
                                            //Logger.log("== NAME_DETAIL: " + name_detail + " = " + json1[item][connection][attributes][names][name_detail]);
                                            
                                            if (name_detail == "displayName")
                                            {
                                                var contact_name = json1[item][connection][attributes][names][name_detail];
                                            }
                                            
                                            if (name_detail == "metadata")
                                            {
                                                for (var metadata in json1[item][connection][attributes][names][name_detail])
                                                {                                    
                                                    //Logger.log("== NAME_DETAIL_METADATA: " + metadata + " = " + json1[item][connection][attributes][names][name_detail][metadata]);
                                                    
                                                    if (metadata == "source")
                                                    {
                                                        for (var source in json1[item][connection][attributes][names][name_detail][metadata])
                                                        {                                            
                                                            //Logger.log("== NAME_DETAIL_METADATA_SOURCE: " + source + " = " + json1[item][connection][attributes][names][name_detail][metadata][source]);
                                                            
                                                            if (source == "id")
                                                            {                                                
                                                                var contact_id = json1[item][connection][attributes][names][name_detail][metadata][source]
                                                            }
                                                            
                                                        }
            
                                                    }
                                                
                                                }                                
                                            
                                            }
            
                                        }
                                    
                                    }
                                    
                                }
                                
                                // get the photos
                                if (attributes == "photos")
                                {
                                    for (var photos in json1[item][connection][attributes])
                                    {
                                        //Logger.log("== PHOTOS: " + photos + " = " + json1[item][connection][attributes][photos]);
                                        
                                        for (var photo_detail in json1[item][connection][attributes][photos])
                                        {
                                            //Logger.log("== PHO_DETAIL: " + photo_detail + " = " + json1[item][connection][attributes][photos][photo_detail]);
                                            
                                            if (photos == "0")
                                            {
                                                //Logger.log("== PHO_DETAIL: " + photo_detail + " = " + json1[item][connection][attributes][photos][photo_detail]);
                                                
                                                if (photo_detail == "url")
                                                {
                                                    var contact_photo = json1[item][connection][attributes][photos][photo_detail];
                                                }
                                            
                                            }
                                            
                                        }
                                    
                                    }                        
            
                                }                                
                                
                            }
                            
                            // Logger.log("FINAL: contact_id = " + contact_id);
                            // Logger.log("FINAL: contact_name = " + contact_name);
                            // Logger.log("FINAL: contact_photo = " + contact_photo);
                            // Logger.log("FINAL: contact_resourceName = " + contact_resourceName);
                            // Logger.log("FINAL: contact_etag = " + contact_etag);
                            // Logger.log("============================");   
                            

                            var retJSON = "";
                            retJSON += "{";
                            retJSON += "    'index': " + contaPeople.toString() + ",";
                            retJSON += "    'source': 'PEOPLE_API',";
                            retJSON += "    'id': '" + contact_id + "',";
                            retJSON += "    'etag': '" + contact_etag + "',";
                            retJSON += "    'resourceName': '" + contact_resourceName + "',";
                            retJSON += "    'name': '" + contact_name + "',";
                            retJSON += "    'photoProfile': '" + contact_photo + "'";
                            retJSON += "}";     

                            // change the single quote to double quote
                            retJSON = replaceALL(retJSON, "'", "\"");

                            aPeopleContactPhotos.push(retJSON);


                            contaPeople++;
            


                        }
                    }
                }
                
                // Logger.log("FINAL: totalItensFound = " + totalItensFound);
            

                    
                // console.log("-- aPeopleContactPhotos - PHOTOS FROM CONTACTS --");
                // console.log("aPeopleContactPhotos.length: " + aPeopleContactPhotos.length.toString()); 
                // for (var countContact = 0 ; countContact < aPeopleContactPhotos.length ; countContact++)
                // {
                //     console.log("aPeopleContactPhotos[" + countContact.toString() + "] = " + aPeopleContactPhotos[countContact]);    
                // }
                // console.log("-- END aPeopleContactPhotos - PHOTOS FROM CONTACTS --");            


                // this array will be used below, where finishing the results
    

            }
            catch(error)
            {
                retFunc = "-1|PeopleContacts: " + error.stack;
                return retFunc;
            }        

        }



        // now, the code that gets the contacts. Later, in this next try/catch block, the photo url will be replaced by the one found in the People API
        try
        {
            // if searching for name and email, it takes 2 rounds of search. DEfault is 1 round only
            var rounds = 1;

            // if search string is empty, then, we need only 1 round becase we will get all contacts using the method .getContacts()
            if (searchText != "")
            {
                if ((lookInEmail == true) && (lookInName == true))
                {
                    rounds = 2;
                }                
            }




            for (var countRound = 1 ; countRound <= rounds ; countRound++)
            {

                // if search string is empty, so bring ALL contacts
                if (searchText == "")
                {
                    var contacts = ContactsApp.getContacts();
                }
                else
                {

                    if ((lookInEmail == true) && (lookInName == true))
                    {
                        if (countRound == 1)
                        {
                            var contacts = ContactsApp.getContactsByEmailAddress(searchText);
                        }
                        else if (countRound == 2)
                        {
                            var contacts = ContactsApp.getContactsByName(searchText);
                        }
                        
                    }
                    else if ((lookInEmail == false) && (lookInName == true))
                    {
                        var contacts = ContactsApp.getContactsByName(searchText);
                    }
                    else if ((lookInEmail == true) && (lookInName == false))
                    {
                        var contacts = ContactsApp.getContactsByEmailAddress(searchText);
                    }

                }


                


                for (var c in contacts)
                {
                    var isNewResult = true;

                    var outThumbnailPhotoUrl = "https://ssl.gstatic.com/s2/profiles/images/silhouette200.png";
                    
                    var outID = replaceALL(contacts[c].getId(), "http://www.google.com/m8/feeds/contacts/dev-marcelorocha%40quiteoften.co/base/", "");

                    var retJSON = "";
                    retJSON += "{";
                    retJSON += "    'index': " + countResult.toString() + ",";
                    retJSON += "    'id': '" + outID + "',";
                    retJSON += "    'source': 'CONTACTS',";
                    retJSON += "    'name': '" + contacts[c].getFullName() + "',";

                    if (contacts[c].getEmails().length > 0)
                    {
                        retJSON += "    'primaryEmail': '" + contacts[c].getEmails()[0].getAddress() + "',";
                    }
                    else
                    {
                        retJSON += "    'primaryEmail': '',";
                    }
                    


                    if (param_SearchProfilePhotoInPeopleAPI == true)
                    {
                        // search the array with contact photos, looking for the register with the same id     
                        for (var x = 0 ; x < aPeopleContactPhotos.length ; x++)
                        {      
                            var person = JSON.parse(aPeopleContactPhotos[x]);

                            // Logger.log("aPeopleContactPhotos[" + x.toString() + "] = " + aPeopleContactPhotos[x]);
                            // Logger.log("person.id = " + person.id);
                            // Logger.log("outID = " + outID);

                            if (person.id == outID)
                            {
                                outThumbnailPhotoUrl = person.photoProfile;
                                break;
                            }
                        }  
                    }

                  



                    retJSON += "    'thumbnailPhotoUrl': '" + outThumbnailPhotoUrl + "'";
                    retJSON += "}";
                    
                    //retJSON = countResult.toString() + "*" + contacts[c].getFullName() + "*" + contacts[c].getEmails()[0].getAddress() + "*" + contacts[c].getId();
                    
                    // change the single quote to double quote
                    retJSON = replaceALL(retJSON, "'", "\"");

                    // add to the results array
                    aRetResults_temp.push(retJSON);
    
                    countResult++;
        

                }

            }
            

        }
        catch(error)
        {
            retFunc = "-1|" + error.stack;
            return retFunc;
        }



        
        // console.log("-- aRetResults_temp - CONTATOS --");
        // console.log("aRetResults_temp.length: " + aRetResults_temp.length.toString()); 
        // for (var countContact = 0 ; countContact < aRetResults_temp.length ; countContact++)
        // {
        //     console.log("aRetResults_temp[" + countContact.toString() + "] = " + aRetResults_temp[countContact]);    
        // }
        // console.log("-- END aRetResults_temp - CONTATOS --");




    }
    


    
    // DIRECTORY SEARCH
    if (lookInDirectory == true)
    {
        
        try
        {
            
            var options = {
                maxResults: 300,
                customer: 'my_customer',
                projection: 'basic',
                viewType: 'domain_public',                
                sortOrder: 'ASCENDING',
            };
          

            if (orderBy == "NAME")
            {
                options.orderBy = "givenname"
            }
            else
            {
                options.orderBy = "email"
            }


            if ((lookInEmail == true) && (lookInName == true))
            {
                options.query = "'" + searchText + "'"
            }
            else if ((lookInEmail == false) && (lookInName == true))
            {
                options.query = "name:'" + searchText + "*'"
            } 
            else if ((lookInEmail == true) && (lookInName == false))
            {
                options.query = "email:'" + searchText + "*'"
            }
            
            
            do 
            {                
                var response = AdminDirectory.Users.list(options);

                //console.log("response = " + response.users);
                
                if (typeof(response.users) !== "undefined")
                {
                    response.users.forEach(function(user) {

                        var retJSON = "";
                        retJSON += "{";
                        retJSON += "    'index': " + countResult.toString() + ",";
                        retJSON += "    'id': '" + user.id + "',";
                        retJSON += "    'source': 'DIRECTORY',";
                        retJSON += "    'name': '" + user.name.fullName + "',";

                        if (user.primaryEmail != "")
                        {
                            retJSON += "    'primaryEmail': '" + user.primaryEmail + "',";
                        }
                        else
                        {
                            retJSON += "    'primaryEmail': '',";
                        }


                        if (typeof(user.thumbnailPhotoUrl) === "undefined")  
                        {
                            retJSON += "    'thumbnailPhotoUrl': 'https://ssl.gstatic.com/s2/profiles/images/silhouette200.png'";
                        }   
                        else
                        {
                            retJSON += "    'thumbnailPhotoUrl': '" + user.thumbnailPhotoUrl + "'";
                        }   

                        retJSON += "}";
          
                        // change the single quote to double quote
                        retJSON = replaceALL(retJSON, "'", "\"");
    
                        // add to the results array
                        aRetResults_temp.push(retJSON);
        
                        countResult++;                                                
                        
                    });
                }

                // For domains with many users, the results are paged
                if (response.nextPageToken) 
                {
                    options.pageToken = response.nextPageToken;
                }

            } while (response.nextPageToken);
   
        }
        catch(error)
        {
            retFunc = "-1|" + error;
            return retFunc;
        }

        // console.log("-- aRetResults_temp - DIRECTORY --");
        // console.log("aRetResults_temp.length: " + aRetResults_temp.length.toString()); 
        // for (var countContact = 0 ; countContact < aRetResults_temp.length ; countContact++)
        // {
        //     console.log("aRetResults_temp[" + countContact.toString() + "] = " + aRetResults_temp[countContact]);    
        // }
        // console.log("-- END aRetResults_temp - DIRECTORY --");

    }
    


    
    


    if (aRetResults_temp.length == 0)
    {
        retFunc = "0|No results found for searched text";      
    }
    else
    {

        // clean results removing duplicate, only if searched for email AND name
        if ((lookInEmail == true) && (lookInName == true))
        {
            for (var countContact = 0 ; countContact < aRetResults_temp.length ; countContact++)
            {
                //console.log("aRetResults_temp[" + countContact.toString() + "] = " + aRetResults_temp[countContact]);  

                var temp_contact = JSON.parse(aRetResults_temp[countContact]);

                //console.log("aRetResults_temp[" + countContact.toString() + "].id = " + temp_contact.id);    

                var allowInsert = true;


                for (var x = 0 ; x < aRetResults_NoDuplicated.length ; x++)
                {
                    if (trim(aRetResults_NoDuplicated[x]) != "")
                    {
                        var temp_contact2 = JSON.parse(aRetResults_NoDuplicated[x]);

                        if (temp_contact.id == temp_contact2.id)
                        {
                            allowInsert = false;
                            break;
                        }
                    }
                }

                if (allowInsert == true)
                {
                    aRetResults_NoDuplicated.push(aRetResults_temp[countContact]);                    
                }

            }

        }
        else
        {

            for (var countContact = 0 ; countContact < aRetResults_temp.length ; countContact++)
            {
                // console.log("aRetResults_temp[" + countContact.toString() + "] = " + aRetResults_temp[countContact]);    

                aRetResults_NoDuplicated.push(aRetResults_temp[countContact]);
            }

        }


        // ordering results

        if (unifyOrderBy == true)
        {

            for (var countContact = 0 ; countContact < aRetResults_NoDuplicated.length ; countContact++)
            {
                //console.log("aRetResults_NoDuplicated[" + countContact.toString() + "] = " + aRetResults_NoDuplicated[countContact]);    
    
                var temp_contact2 = JSON.parse(aRetResults_NoDuplicated[countContact]);
    
                if (orderBy == "EMAIL")
                {
                    aTemp_Name.push(temp_contact2.primaryEmail + "|" + countContact.toString());
                }
                else
                {
                    aTemp_Name.push(temp_contact2.name + "|" + countContact.toString());
                }
                
            }
    
            aTemp_Name.sort();
    
            // create the final array that will be returned
            for (var countContact = 0 ; countContact < aTemp_Name.length ; countContact++)
            {
                //console.log("aRetResults_NoDuplicated[" + countContact.toString() + "] = " + aRetResults_NoDuplicated[countContact]);    
    
                var indexArrOriginal = aTemp_Name[countContact].split("|")[1];
    
                aRetResults_final.push(aRetResults_NoDuplicated[indexArrOriginal]);
            }


        }
        else
        {
            // not unified: separate results in CONTACTS and DIRECTORY
            // 1st pass: contacts
            for (var countContact = 0 ; countContact < aRetResults_NoDuplicated.length ; countContact++)
            {
                //console.log("aRetResults_NoDuplicated[" + countContact.toString() + "] = " + aRetResults_NoDuplicated[countContact]);    

                var temp_contact2 = JSON.parse(aRetResults_NoDuplicated[countContact]);

                if (temp_contact2.source == "CONTACTS")
                {
                    if (orderBy == "EMAIL")
                    {
                        aTemp_Name.push(temp_contact2.primaryEmail + "|" + countContact.toString());
                    }
                    else
                    {
                        aTemp_Name.push(temp_contact2.name + "|" + countContact.toString());
                    }
                }
                
            }

            aTemp_Name.sort();


            // create the final array that will be returned
            for (var countContact = 0 ; countContact < aTemp_Name.length ; countContact++)
            {
                //console.log("aRetResults_NoDuplicated[" + countContact.toString() + "] = " + aRetResults_NoDuplicated[countContact]);    

                var indexArrOriginal = aTemp_Name[countContact].split("|")[1];

                aRetResults_final.push(aRetResults_NoDuplicated[indexArrOriginal]);
            }
            
            
            // 2nd pass: DIRECTORY

            aTemp_Name = []
            
            for (var countContact = 0 ; countContact < aRetResults_NoDuplicated.length ; countContact++)
            {
                //console.log("aRetResults_NoDuplicated[" + countContact.toString() + "] = " + aRetResults_NoDuplicated[countContact]);    

                var temp_contact2 = JSON.parse(aRetResults_NoDuplicated[countContact]);

                if (temp_contact2.source == "DIRECTORY")
                {
                    if (orderBy == "EMAIL")
                    {
                        aTemp_Name.push(temp_contact2.primaryEmail + "|" + countContact.toString());
                    }
                    else
                    {
                        aTemp_Name.push(temp_contact2.name + "|" + countContact.toString());
                    }
                }
                
            }


            aTemp_Name.sort();


            // update the final array that will be returned
            for (var countContact = 0 ; countContact < aTemp_Name.length ; countContact++)
            {
                //console.log("aTemp_Name[" + countContact.toString() + "] = " + aTemp_Name[countContact]);    

                var indexArrOriginal = aTemp_Name[countContact].split("|")[1];

                aRetResults_final.push(aRetResults_NoDuplicated[indexArrOriginal]);
            }


        }


        var aRetResults_return = [];

        // finally, fix the index and return the array
        for (var countContact = 0 ; countContact < aRetResults_final.length ; countContact++)
        {
            //console.log("aRetResults_final[" + countContact.toString() + "] = " + aRetResults_final[countContact]);    

            var temp_contact2 = JSON.parse(aRetResults_final[countContact]);

            temp_contact2.index = countContact.toString();
            
            aRetResults_return.push(JSON.stringify(temp_contact2));
        }


        // console.log("-- FINAL --");
        // console.log("aRetResults_return.length: " + aRetResults_return.length.toString()); 
        // for (var countContact = 0 ; countContact < aRetResults_return.length ; countContact++)
        // {
        //     console.log("aRetResults_return[" + countContact.toString() + "] = " + aRetResults_return[countContact]);    
        // }
        // console.log("-- END FINAL --");


        retFunc = aRetResults_return.length.toString() + "|";

        retFunc += "[";
        retFunc += aRetResults_return.join(",");
        retFunc += "]";
        
        
        
        //console.log(retFunc);
       
    }   


    return retFunc;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// function addUserToDirectory() {
//     var user = {
//       primaryEmail: 'testeteste@teste.com',
//       name: {
//         givenName: 'Joao',
//         familyName: 'Teste'
//       },
//       // Generate a random password string.
//       password: Math.random().toString(36)
//     };
//     user = AdminDirectory.Users.insert(user);
//     Logger.log('User %s created with ID %s.', user.primaryEmail, user.id);
//   }




// function sortByProperty(property){  
//     return function(a,b){  
//        if(a[property] > b[property])  
//           return 1;  
//        else if(a[property] < b[property])  
//           return -1;  
   
//        return 0;  
//     }  
//  }

  