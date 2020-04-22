
function Main(event) 
{

    
    logStack("Main");

    // var objLogSheet = InitLogSheet();
    // LogSheet("testeeeee", objLogSheet);


    var retFunc = isLoggedUserFromDirectory();

    saveUserProperty("isLoggedUserFromDirectory", retFunc)

    // var objLogSheet = InitLogSheet();    
    // LogSheet("isLoggerUserFromDirectory: " + retFunc, objLogSheet);

    //Log("isLoggerUserFromDirectory: " + retFunc);


    // var optionalArgs = {
    //     customer: 'my_customer',
    //     maxResults: 10,
    //     orderBy: 'email'
    //   };
    //   var response = AdminDirectory.Users.list(optionalArgs);
    //   var users = response.users;
    //   if (users && users.length > 0) {
    //     Log('Users:');
    //     for (i = 0; i < users.length; i++) {
    //       var user = users[i];
    //       Log('%s (%s)', user.primaryEmail, user.name.fullName);
    //     }
    //   } else {
    //     Log('No users found.');
    //   }
     
      
    // return;

    // logStack("Main");
    // var retFunc = isLoggerUserFromDirectory();
    // Log("retFunc: " + retFunc);

    // return writeDebugTxtInScreen(retFunc);

    

    return render_Card_SearchPeople(event);
}
