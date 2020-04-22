

function gGlobalVars()
{
    const variables = 
    {
        DB_Base: "MYSQL",  
        //DB_Address: "quiteoften-nodejs-api:us-central1:quiteoften-mysql-57-db",    
        DB_Address: "146.148.99.109",    
        DB_User: "quiteoften_api_engine",    
        DB_Password: "Ujk95Ehu6A302",    
        DB_Name: "quiteoften_db1",
        
        APP_ModoDebug: true,
        APP_ID_LogSheet: "1Dq5qDD3f5gbqRIW6-2UlelIAQ16FgtDPTgLwIcZ48Sc"
        
        
        
        //DB_Base: "MYSQL",    
        //DB_Address: "to1-271017:southamerica-east1:onetoone2",    
        //DB_User: "onetoone_user",    
        //DB_Password: "vidakk!",    
        //DB_Name: "onetoone1"

      
    }

    return variables;
}


function DB_OpenConnection()
{
  
    logStack("DB_OpenConnection");
  
    var instanceUrl = "jdbc:mysql://" + gGlobalVars().DB_Address;
    var dbUrl = instanceUrl + "/" + gGlobalVars().DB_Name;

    gDB_objConn = Jdbc.getConnection(dbUrl, gGlobalVars().DB_User, gGlobalVars().DB_Password);

    
    //var instanceUrl = 'jdbc:google:mysql://' + gGlobalVars()().DB_Address;
    //var dbUrl = instanceUrl + '/' + gGlobalVars()().DB_Name;
  
    //gDB_objConn = Jdbc.getCloudSqlConnection(dbUrl, gGlobalVars()().DB_User, gGlobalVars()().DB_Password);
  
    //Log(dbUrl + " --- " + gGlobalVars()().DB_User + " --- " + gGlobalVars()().DB_Password);
                   
}




function DB_CloseConnection()
{
    logStack("DB_CloseConnection");
    gDB_objConn.close();

}

