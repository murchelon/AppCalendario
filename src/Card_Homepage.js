

    
    
    
    
function render_HomePage(event) 
{
    logStack("render_HomePage");

    // Render the page, adding all widgets
    var cardHeader = CardService.newCardHeader()
        .setTitle("HOMEPAGE")
        //.setSubtitle("3")
        .setImageStyle(CardService.ImageStyle.CIRCLE)
        .setImageUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQA-TEM1Me1zW49_OuRuH-oiibHQJgOc_-_jmuegg0tX3BK_tIv");



    var buttonSet_HomePage = CardService.newButtonSet();
    buttonSet_HomePage.addButton(addBtnToBtnSet(1, "Manage Meetings", "onClick_btnManageMeetings"));
    buttonSet_HomePage.addButton(addBtnToBtnSet(2, "Manage Teams", "onClick_btnManageTeams"));


    // Render the page, adding all widgets
    var card = CardService.newCardBuilder()
        .setHeader(cardHeader)
        .addSection(CardService.newCardSection()

            .addWidget(buttonSet_HomePage)
            
            )

        .build();

    return [card];
    
}

function onClick_btnManageMeetings(event)
{
    logStack("onClick_btnManageMeetings");
    return render_ManageMeetings(event);
}


function onClick_btnManageTeams(event)
{
    logStack("onClick_btnManageTeams");
    return showPopMsg("onClick_btnManageTeams");
}

