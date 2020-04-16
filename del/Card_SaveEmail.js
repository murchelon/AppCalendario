

function onClick_EmailMessage(event) 
{
    logStack("onClick_EmailMessage");

    // Get data from the msg
    let accessToken = event.gmail.accessToken;
    let messageId = event.gmail.messageId;
    GmailApp.setCurrentMessageAccessToken(accessToken);
    let mailMessage = GmailApp.getMessageById(messageId);
    let from = mailMessage.getFrom();

    return render_SaveEmailPage(event);
}





function onClick_btnSaveEmail(event) 
{
    logStack("onClick_btnSaveEmail");

    

    let fields = event["formInput"];

    outTimeStamp = trim(fields["txtTimeStamp"]);
    outFrom = trim(fields["txtFrom"]);
    outTo = trim(fields["txtTo"]);
    outSubject = trim(fields["txtSubject"]);
    outBody_Original = trim(fields["txtBody"]);

    if (outTimeStamp == "" || outFrom == "" || outTo == "" || outSubject == "" || outBody_Original == "")
    {
        return showPopMsg("E-MAIL NOT SAVED ! Please fill all the fields to save the e-mail");
    }

    // let formFields = ["txtTimeStamp", "txtFrom", "txtTo", "txtSubject", "txtBody"];
    // let res = e["formInput"];
    // formFields.forEach(
    //     function(fieldName)
    //     {
    //         Log(trim(res[fieldName]));

    //         if (trim(res[fieldName]) != "")
    //         {
    //             return showPopMsg("Please fill all the fields to save the e-mail. The e-mail has NOT been saved!");
    //         }
    //         // if (trim(res[fieldName]) != "") 
    //         // {
    //         //     
    //         // }
    //     }
    // );
    
    //return showPopMsg("E-MAIL NOT SAVED ! Please fill all the fields to save the e-mail");
    //Log(formFields.slice(0, FIELDNAMES.length));

    
    DB_OpenConnection();


    let SQL = ""
    SQL += "INSERT INTO tb_1to1_SavedEmails"
    SQL += "("
    SQL += "	Email_From,"
    SQL += "	Email_To,"
    SQL += "	Email_Subject,"
    SQL += "	Email_Body,"
    SQL += "	Email_TimeStamp,"
    SQL += "	Email_HasAttach"
    SQL += ")"
    SQL += "VALUES (?, ?, ?, ?, ?, ?)"

  
    let stmt = gDB_objConn.prepareStatement(SQL);
    
    stmt.setString(1, outFrom);
    stmt.setString(2, outTo);
    stmt.setString(3, outSubject);
    stmt.setString(4, outBody_Original);
    stmt.setString(5, outTimeStamp);
    stmt.setInt(6, 0);
  
    stmt.execute();

    stmt.close()


    DB_CloseConnection();

    
    //return render_HomePage();

    return render_Alert("E-Mail saved with success!", "render_HomePage")
            

    
    //return showPopMsg("E-Mail saved with success!");
}




function render_SaveEmailPage(event) 
{

    logStack("render_SaveEmailPage");

    // RENDER THE SAVE EMAIL PAGE

    // HEADER: Row with the title of the page and an icon representing it 
    let cardHeader = CardService.newCardHeader()
        .setTitle("SAVE E-MAIL")
        //.setSubtitle("3")
        .setImageStyle(CardService.ImageStyle.CIRCLE)
        .setImageUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQA-TEM1Me1zW49_OuRuH-oiibHQJgOc_-_jmuegg0tX3BK_tIv");


    // GET MSG CONTENT:
    let objMessage = getCurrentMessage(event);    
    let msg_from = clean(objMessage.getFrom());
    let msg_to = clean(objMessage.getTo());
    let msg_subject = clean(objMessage.getSubject());
    let msg_timestamp = isoDate(objMessage.getDate());
    let msg_Body_Original = clean(objMessage.getBody());
    let msg_Body_Plain = clean(objMessage.getPlainBody());
    let msg_Raw = clean(objMessage.getRawContent());


    // Save Button    
    // let buttonSet_ContextualPage = CardService.newButtonSet()
    //     .addButton(addBtnToBtnSet(1, "SAVE E-MAIL", "onClick_btnSaveEmail", true) );



    // EMAIL FIELDS: 
    let wtxtTimeStamp = CardService.newTextInput()
        .setFieldName("txtTimeStamp")
        .setTitle("Date:")
        .setValue(msg_timestamp)
        .setHint("Date that the message was sent");
        

    let wtxtFrom = CardService.newTextInput()
        .setFieldName("txtFrom")
        .setTitle("From:")
        .setValue(msg_from)
        .setHint("Remetent from the message");

    let wtxtTo = CardService.newTextInput()
        .setFieldName("txtTo")
        .setTitle("To:")
        .setValue(msg_to)
        .setHint("Recipient from the message");
        

    let wtxtSubject = CardService.newTextInput()
        .setFieldName("txtSubject")
        .setTitle("Subject:")
        .setValue(msg_subject)
        .setHint("Subject from the message");


        // let msg_Body_Original = objMessage.getBody();
        // let msg_Body_Plain = objMessage.getPlainBody();
        // let msg_Raw = objMessage.getRawContent();


    let wtxtBody = CardService.newTextInput()
        .setFieldName("txtBody")
        .setTitle("E-Mail text:")
        .setMultiline(true)
        .setValue(msg_Body_Plain)
        .setHint("Text from the message");




    // let fixedFooter = CardService.newFixedFooter().setPrimaryButton()
    //     .setPrimaryButton(
    //         addBtnToBtnSet(1, "Cancel", "onClickFunction") 
    //     )
    //     .setPrimaryButton(
    //         addBtnToBtnSet(2, "Save", "onClickFunction") 
    //     );

            
    let action = CardService.newAction()
        .setFunctionName("onClick_btnSaveEmail");

    let fixedFooter =
    CardService
        .newFixedFooter()
        .setPrimaryButton(
            CardService
                .newTextButton()
                .setText("SAVE E-MAIL")
                .setOnClickAction(action)
                
                );




    // Render the page, adding all widgets
    let card = CardService.newCardBuilder()
        .setHeader(cardHeader)
        
        .addSection(CardService.newCardSection()

            //.addWidget(CardService.newTextParagraph().setText("The email is from: " + from))
            //.addWidget(openDocButton)

            //.addWidget(buttonSet_ContextualPage)
            .addWidget(wtxtTimeStamp)
            .addWidget(wtxtFrom)
            .addWidget(wtxtTo)
            .addWidget(wtxtSubject)
            .addWidget(CardService.newTextParagraph().setText("has attachments: YES"))
            .addWidget(wtxtBody)
            
            
            )

        .setFixedFooter(fixedFooter)
        .build();

    return [card];
}




