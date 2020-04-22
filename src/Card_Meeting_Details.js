
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the page with all meeting details like the date, time, etc of a meeting
 * @constructor
 * @param {string} action - Defines how the page behave. it can be NEW or EDIT
 * @param {string} person - The selected person who the meeting will be paired
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function render_Meeting_Details(action, person)
{
    logStack("render_Meeting_Details");

    var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    var rep = ['1', '2', '3', '4'];
    var weekMonth = ['Week', 'Month'];    
 
    var outEmail = "";
    var outName = "";


    Log("person.primaryEmail = " + clean(person.primaryEmail));

    if (clean(person.primaryEmail) == "")
    {
        outEmail = "[e-mail in blank]";
    }
    else
    {
        outEmail = person.primaryEmail;
    }

    if (clean(person.name) == "")
    {
        outName = "[name in blank]";
    }
    else
    {
        outName = person.name;
    }

    // create the header
    var card_Header = CardService.newCardHeader()
        .setTitle(outName)
        .setSubtitle(outEmail)        
        .setImageStyle(CardService.ImageStyle.CIRCLE)
        .setImageUrl(person.thumbnailPhotoUrl);



    var card_section1 = CardService.newCardSection().setHeader('Select a starting date and time:');

    // DATE PICKER:
    //card_section1.addWidget(CardService.newTextParagraph().setText("Select a starting date and time:"));

    var input_dateTimePicker = CardService.newDateTimePicker()
        .setTitle("Date and Time:")
        .setFieldName("txt_dateTimePicker")
        // Set default value as Jan 1, 2018, 3:00 AM UTC. Either a number or string is acceptable.
        .setValueInMsSinceEpoch(new Date().getTime())
        // EDT time is 5 hours behind UTC.
        .setTimeZoneOffsetInMins(-3 * 60);

        // .setOnChangeAction(CardService.newAction()
        //     .setFunctionName("handleDateTimeChange"));
        
    card_section1.addWidget(input_dateTimePicker);        
        
    
    var card_section2 = CardService.newCardSection().setHeader('Meet every:');

    // RADIO WEEK DAYS:
    //card_section2.addWidget(CardService.newTextParagraph().setText("The meeting should be in the following week day:"));

    var input_radio_WeekDays = CardService.newSelectionInput()
        .setType(CardService.SelectionInputType.RADIO_BUTTON)
        .setFieldName('radio_WeekDays');

    for (var day in weekdays)
    {
        input_radio_WeekDays.addItem(weekdays[day], day, false);
    }
            
    card_section2.addWidget(input_radio_WeekDays);




    // REPEAT SELECTION - TIMES:   
    var card_section3 = CardService.newCardSection().setHeader('Repeat for:');

    //card_section3.addWidget(CardService.newTextParagraph().setText("Repeat every:"));
    
    var input_cboRepeatTimes = CardService.newSelectionInput() //.setTitle('Repeat every')
        .setType(CardService.SelectionInputType.DROPDOWN)
        .setFieldName('cbo_RepeatTimes');

    for (var r in rep) 
    {
        input_cboRepeatTimes.addItem(rep[r], rep[r], false);
    }
    
    card_section3.addWidget(input_cboRepeatTimes);

  
    // REPEAT SELECTION - WEEKMONTH:  

    var input_cboWeekMonth = CardService.newSelectionInput()
        .setType(CardService.SelectionInputType.DROPDOWN)
        .setFieldName('cbo_WeekMonth');
        
    for (var w in weekMonth) 
    {
        input_cboWeekMonth.addItem(weekMonth[w], weekMonth[w], false);
    }
            
    card_section3.addWidget(input_cboWeekMonth);


    // EXISTING MEETINGS:
    var card_section4 = CardService.newCardSection().setHeader('Meetings already scheduled:');
    
    card_section4.addWidget(CardService.newTextParagraph().setText("No meetings scheduled."));


    // create button that saves the meeting --  FOOTER
    var actionSaveMeeting = CardService.newAction()
        .setFunctionName("onClick_btnSaveMeeting")        
        .setParameters({
            index: person.index,
            id: person.id,
            source: person.source,
            name: outName,
            primaryEmail: outEmail,
            thumbnailPhotoUrl: person.thumbnailPhotoUrl
            });
            

    var fixedFooter = CardService.newFixedFooter()
        .setPrimaryButton(CardService.newTextButton()
            .setText("SAVE")
            .setOnClickAction(actionSaveMeeting));




    // mount and return the card
    var card = CardService.newCardBuilder();    
    card.setHeader(card_Header);
    card.addSection(card_section1);
    card.addSection(card_section2);
    card.addSection(card_section3);
    card.addSection(card_section4);
    card.setFixedFooter(fixedFooter);
    
    return [card.build()];
}


function onClick_btnSaveMeeting(event)
{
    var dateTimeInput = event.formInputs["txt_dateTimePicker"];
    var msSinceEpoch = dateTimeInput[0].msSinceEpoch;
    var hasDate = dateTimeInput[0].hasDate;
    var hasTime = dateTimeInput[0].hadTime;

    // The following requires you to configure the add-on to read user locale
    // and timezone.
    // See https://developers.google.com/gsuite/add-ons/how-tos/access-user-locale
    var userTimezoneId = event.userTimezone.id;

    // Format and log the date-time selected using the user's timezone.
    var formattedDateTime;

    if (hasDate && hasTime) 
    {
        formattedDateTime = Utilities.formatDate(new Date(msSinceEpoch), userTimezoneId, "yyy/MM/dd hh:mm:ss");
    } 
    else if (hasDate) 
    {
        formattedDateTime = Utilities.formatDate(new Date(msSinceEpoch), userTimezoneId, "yyy/MM/dd") + ", Time unspecified";
    }
    else if (hasTime) 
    {
        formattedDateTime = "Date unspecified, " + Utilities.formatDate(new Date(msSinceEpoch), userTimezoneId, "hh:mm a");
    }

    if (formattedDateTime) 
    {
        console.log(formattedDateTime);
    }

    formattedDateTime = Utilities.formatDate(new Date(msSinceEpoch), userTimezoneId, "yyy/MM/dd hh:mm:ss");


    //var formattedDateTime = JSON.stringify(dateTimeInput);

    // var objLogSheet = InitLogSheet();
    // LogSheet(formattedDateTime, objLogSheet);

    var nowServer = new Date();
    //var date = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy")


    return showPopMsg("onClick_btnSaveMeeting: " + formattedDateTime + " | " + nowServer);
}