
function render_OptSettings(event) 
{
    logStack("render_OptSettings");
    // HEADER: Row with the title of the page and an icon representing it 
    let cardHeader = CardService.newCardHeader()
        .setTitle("SETTINGS")
        //.setSubtitle("3")
        .setImageStyle(CardService.ImageStyle.CIRCLE)
        .setImageUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQA-TEM1Me1zW49_OuRuH-oiibHQJgOc_-_jmuegg0tX3BK_tIv");


    // let imageButton = CardService.newImageButton()
    //     .setAltText("An image button with an airplane icon.")
    //     .setIcon(CardService.Icon.AIRPLANE)
    //     .setOpenLink(CardService.newOpenLink()
    //         .setUrl("https://airplane.com"));


    let btnSalvar = CardService.newTextButton()
        .setText("Salvar")
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
        .setBackgroundColor("#315c7a")
        .setOpenLink(CardService.newOpenLink()            
        .setUrl("https://www.google.com"));
    
    let buttonSet = CardService.newButtonSet()
        .addButton(btnSalvar);
        
            
    // Render the page, adding all widgets
    let card = CardService.newCardBuilder()
        .setHeader(cardHeader)
        .addSection(CardService.newCardSection()

            .addWidget(CardService.newTextParagraph().setText("teste"))
            .addWidget(buttonSet)
                
            )

        .build();

    return [card];
}

