
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

    let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    let rep = ['1', '2', '3', '4'];
    let weekMonth = ['Week', 'Month'];    
 
    let outEmail = "";


    Logger.log("person.primaryEmail = " + clean(person.primaryEmail));

    if (clean(person.primaryEmail) == "")
    {
        outEmail = "[e-mail in blank]";
    }
    else
    {
        outEmail = person.primaryEmail;
    }

    // create the header
    let card_Header = CardService.newCardHeader()
        .setTitle(person.name)
        .setSubtitle(outEmail)        
        .setImageStyle(CardService.ImageStyle.CIRCLE)
        .setImageUrl(person.thumbnailPhotoUrl);



    let card_section1 = CardService.newCardSection().setHeader('Select a starting date and time:');

    // DATE PICKER:
    //card_section1.addWidget(CardService.newTextParagraph().setText("Select a starting date and time:"));

    let input_dateTimePicker = CardService.newDateTimePicker()
        .setTitle("Date and Time:")
        .setFieldName("txt_dateTimePicker")
        // Set default value as Jan 1, 2018, 3:00 AM UTC. Either a number or string is acceptable.
        .setValueInMsSinceEpoch(new Date().getTime())
        // EDT time is 5 hours behind UTC.
        .setTimeZoneOffsetInMins(-3 * 60);

        // .setOnChangeAction(CardService.newAction()
        //     .setFunctionName("handleDateTimeChange"));
        
    card_section1.addWidget(input_dateTimePicker);        
        
    
    let card_section2 = CardService.newCardSection().setHeader('Meet every:');

    // RADIO WEEK DAYS:
    //card_section2.addWidget(CardService.newTextParagraph().setText("The meeting should be in the following week day:"));

    let input_radio_WeekDays = CardService.newSelectionInput()
        .setType(CardService.SelectionInputType.RADIO_BUTTON)
        .setFieldName('radio_WeekDays');

    for (let day in weekdays)
    {
        input_radio_WeekDays.addItem(weekdays[day], day, false);
    }
            
    card_section2.addWidget(input_radio_WeekDays);




    // REPEAT SELECTION - TIMES:   
    let card_section3 = CardService.newCardSection().setHeader('Repeat for:');

    //card_section3.addWidget(CardService.newTextParagraph().setText("Repeat every:"));
    
    let input_cboRepeatTimes = CardService.newSelectionInput() //.setTitle('Repeat every')
        .setType(CardService.SelectionInputType.DROPDOWN)
        .setFieldName('cbo_RepeatTimes');

    for (let r in rep) 
    {
        input_cboRepeatTimes.addItem(rep[r], rep[r], false);
    }
    
    card_section3.addWidget(input_cboRepeatTimes);

  
    // REPEAT SELECTION - WEEKMONTH:  

    let input_cboWeekMonth = CardService.newSelectionInput()
        .setType(CardService.SelectionInputType.DROPDOWN)
        .setFieldName('cbo_WeekMonth');
        
    for (let w in weekMonth) 
    {
        input_cboWeekMonth.addItem(weekMonth[w], weekMonth[w], false);
    }
            
    card_section3.addWidget(input_cboWeekMonth);


    // EXISTING MEETINGS:
    let card_section4 = CardService.newCardSection().setHeader('Meetings already scheduled:');
    
    card_section4.addWidget(CardService.newTextParagraph().setText("No meetings scheduled."));


    // create button that saves the meeting --  FOOTER
    let actionSaveMeeting = CardService.newAction()
        .setFunctionName("onClick_btnSaveMeeting")        
        .setParameters({
            index: person.index,
            id: person.id,
            source: person.source,
            name: person.name,
            primaryEmail: outEmail,
            thumbnailPhotoUrl: person.thumbnailPhotoUrl
            });
            

    let fixedFooter = CardService.newFixedFooter()
        .setPrimaryButton(CardService.newTextButton()
            .setText("SAVE")
            .setOnClickAction(actionSaveMeeting));




    // mount and return the card
    let card = CardService.newCardBuilder();    
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


    return showPopMsg("onClick_btnSaveMeeting");
}