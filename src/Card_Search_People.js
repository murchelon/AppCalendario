
    
function render_Card_SearchPeople(optError) 
{
    logStack("render_Card_SearchPeople");

    // Render the page, adding all widgets


    // create the header
    let card_Header = CardService.newCardHeader()
        .setTitle("SEARCH PEOPLE:")
        //.setSubtitle("3")
        .setImageStyle(CardService.ImageStyle.CIRCLE)
        .setImageUrl("https://icons.iconarchive.com/icons/icons8/windows-8/512/Very-Basic-Search-icon.png");


    // create the search field
    let searchField = CardService.newTextInput()
        .setFieldName('txtSearch')
        .setHint('Name or email address')
        .setTitle('Search for people:');
                

    // create button that executes search
    let buttonSet_DoSearch = CardService.newButtonSet();
    buttonSet_DoSearch.addButton(addBtnToBtnSet(1, "Search", "onClick_btnDoSearch"));

    // create a section that will hold the search input box and button
    let card_section1 = CardService.newCardSection()
        .addWidget(searchField)
        .addWidget(buttonSet_DoSearch);

 
    // Render the page, adding all widgets
    let card = CardService.newCardBuilder()
        .setHeader(card_Header)
        .addSection(card_section1)

        // .addSection(CardService.newCardSection()
        //     .addWidget(buttonSet_DoSearch)            
        //     )

        .build();

    return [card];
    
}





function render_Card_SearchPeopleResults(event, result_JSON, txtToSearch)
{
    logStack("render_Card_SearchPeopleResults");

 
    let TotalFound = result_JSON.split("|")[0];
    let objResults = JSON.parse(result_JSON.split("|")[1]);

    let hasResultContact = false;
    let hasResultDirectory = false;
    
    let outTotalFoundText = TotalFound;

    if (parseInt(TotalFound) >= 2)
    {
        outTotalFoundText += " people found";
    }
    else
    {
        outTotalFoundText += " person found";
    }

    // console.log("objResults = " + objResults);

    
    if (txtToSearch == "") {txtToSearch = "[everyone]";}

    // create the header
    let card_Header = CardService.newCardHeader()
        .setTitle("Searched for: " + txtToSearch)
        .setSubtitle(outTotalFoundText)        
        .setImageStyle(CardService.ImageStyle.CIRCLE)
        .setImageUrl("https://icons.iconarchive.com/icons/icons8/windows-8/512/Very-Basic-Search-icon.png");


    // create a section 
    let card_section_contacts = CardService.newCardSection()
                                .setHeader('Contacts:');

    let card_section_directory = CardService.newCardSection()
                                .setHeader('Directory:');


    
    objResults.forEach(function(contact) {

        //console.log("contact.name = " + contact.name);

        // create the action called when clicking in the contact widget
        let clickAction = CardService.newAction()
            .setFunctionName('onClick_widgetContact')
            .setLoadIndicator(CardService.LoadIndicator.SPINNER)
            .setParameters({
                            index: contact.index,
                            id: contact.id,
                            source: contact.source,
                            name: contact.name,
                            primaryEmail: contact.primaryEmail,
                            thumbnailPhotoUrl: contact.thumbnailPhotoUrl
                            });
    
        let outEmail = trim(contact.primaryEmail);

        if (outEmail == "")
        {
            outEmail = "[e-mail in blank]";
        }

        // create the widget representing the contacts
        let widgetContact = CardService.newKeyValue()
            .setContent(contact.name)
            //.setIconUrl("https://www.google.com/s2/photos/private/AIbEiAIAAABDCIO7nJHQho2MZSILdmNhcmRfcGhvdG8qKDAxYjViOGI4YTY0NGMxYmJlZTdhOGMyNTg2YzVkNDRlNmY1YTNmYjcwActmRXhrsvDBsBLzvmHzsmK68jIb")            
            .setIconUrl(contact.thumbnailPhotoUrl)            
            .setBottomLabel(outEmail)
            .setOnClickAction(clickAction);
          
        
        
        if (contact.source == "DIRECTORY")
        {
            hasResultDirectory = true;
            card_section_directory.addWidget(widgetContact);
        }
        else
        {
            hasResultContact = true;
            card_section_contacts.addWidget(widgetContact);
        }
            

    });


    
    // // mount and return the card
    let card = CardService.newCardBuilder();    
    card.setHeader(card_Header);
      
    if (hasResultContact == true)
    {
        card.addSection(card_section_contacts);
    }

    if (hasResultDirectory == true)
    {
        card.addSection(card_section_directory);
    }    
    
    return [card.build()];

}

function onClick_btnDoSearch(event)
{
    logStack("onClick_btnDoSearch");

    let txtToSearch = "";

    try
    {
        if (typeof(event.formInputs.txtSearch[0]) === "undefined")
        {
            txtToSearch = "";
        }
        else
        {
            txtToSearch = trim(event.formInputs.txtSearch[0]);
        }
    }
    catch(error)
    {
        txtToSearch = "";
    }



    //console.log("txtToSearch = " + txtToSearch);

    // getPeople(searchText, fieldToSearch, coverage, OrderBy, UnifyOrderBy)

    //let retFunc = getPeople("Marcelo", "NAME", "ALL");
    //let retFunc = getPeople("marcelo", "ALL", "ALL");
    //let retFunc = getPeople("marcelo", "", "", "", false);

    let retFunc = getPeople(txtToSearch, "ALL", "ALL", "NAME", true);

    if (left(retFunc, 2) == "-1")
    {
        return showPopMsg("AppCalendario: An error has occurred: " + retFunc.split("|")[1]);
    } 
    else if (left(retFunc, 1) == "0")
    {
        return showPopMsg("There were no contacts found, when searching for: " + txtToSearch);
    }
    else
    {
        //console.log("retFunc: " + retFunc);
        return render_Card_SearchPeopleResults(event, retFunc, txtToSearch);
    }

    

        
    //return showPopMsg("onClick_btnDoSearch | retFunc: " + retFunc);
}

function onClick_widgetContact(event)
{
    logStack("onClick_widgetContact");

    let person = event.parameters;
    let acao = "NEW";

    //Logger.log("person1 = " + person.primaryEmail);

    if (clean(person.primaryEmail) == "")
    {
        return showPopMsg("The e-mail from this person is in blank. Please choose someone with a registered e-mail");
    }
    else
    {
        return render_Meeting_Details(acao, person);
    }
    
}




