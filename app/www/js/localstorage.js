define([
    ], function() {
        //Check if browser supports WebSQL
        if (typeof window.openDatabase !== 'function') {
            console.log('WebSQL not available');
            return;
        }
        var db = window.openDatabase("AppData", "1.0", "App Data DB", 5 * 1024 * 1024);
        var userdata,
            queryCallback;

        var loadDB = function() {
            db.transaction(openDB, onError, onConnectionSuccess);
        };

        var openDB = function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS userdata (id INTEGER PRIMARY KEY AUTOINCREMENT, deviceid TEXT, username TEXT)", [], onQuerySuccess, onError);
            tx.executeSql("SELECT * FROM userdata", [], onQuerySuccess, onError);
        };

        var onConnectionSuccess = function() {
            //console.log("_______ Success! _______");
        };

        var onQuerySuccess = function(tx, results) {
            var len = results.rows.length;
            if (len === 1) {
                userdata = {
                    'id': results.rows.item(0).id,
                    'username': results.rows.item(0).username,
                    'deviceid': results.rows.item(0).deviceid
                };
            }
            if (typeof queryCallback === 'function') {
                queryCallback(userdata);
            }
        }
        var saveUserData = function(deviceid, username) {
            userdata = {
                'deviceid': deviceid,
                'username': username
            };
            db.transaction(saveToDB, onError, onConnectionSuccess);
        };

        var getUserData = function(callback) {
            queryCallback = undefined;
            db.transaction(loadFromDB, onError, onConnectionSuccess);
            if (typeof callback === 'function') {
                queryCallback = callback;
            }
        };

        var loadFromDB = function(tx) {
            tx.executeSql('SELECT * FROM userdata', [], onQuerySuccess, onError);
        };

        var saveToDB = function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS userdata');
            tx.executeSql('CREATE TABLE IF NOT EXISTS userdata (id INTEGER PRIMARY KEY AUTOINCREMENT, deviceid TEXT, username TEXT)');
            tx.executeSql('INSERT INTO userdata (deviceid, username) VALUES (?, ?)', [userdata.deviceid, userdata.username], onQuerySuccess, onError);
        };

        var onError = function(err) {
            if (err.code == "0") {
                console.log("0 - UNKNOWN_ERR: The transaction failed for reasons unrelated to the database itself and not covered by any other error code.");
            }
            if (err.code == "1") {
                console.log("1 - DATABASE_ERR: The statement failed for database reasons not covered by any other error code.");
            }
            if (err.code == "2") {
                console.log("2 - VERSION_ERR: The operation failed because the actual database version was not what it should be. For example, a statement found that the actual database version no longer matched the expected version of the Database or DatabaseSync object, or the Database.changeVersion() or DatabaseSync.changeVersion() methods were passed a version that doesn't match the actual database version.");
            }
            if (err.code == "3") {
                console.log("3 - TOO_LARGE_ERR: The statement failed because the data returned from the database was too large. The SQL 'LIMIT' modifier might be useful to reduce the size of the result set.");
            }
            if (err.code == "4") {
                console.log("4 - QUOTA_ERR: The statement failed because there was not enough remaining storage space, or the storage quota was reached and the user declined to give more space to the database.");
            }
            if (err.code == "5") {
                console.log("5 - SYNTAX_ERR: The statement failed because of a syntax error, or the number of arguments did not match the number of ? placeholders in the statement, or the statement tried to use a statement that is not allowed, such as BEGIN, COMMIT, or ROLLBACK, or the statement tried to use a verb that could modify the database but the transaction was read-only.");
            }
            if (err.code == "6") {
                console.log("6 - CONSTRAINT_ERR: An INSERT, UPDATE, or REPLACE statement failed due to a constraint failure. For example, because a row was being inserted and the value given for the primary key column duplicated the value of an existing row.");
            }
            if (err.code == "7") {
                console.log("7 - TIMEOUT_ERR: A lock for the transaction could not be obtained in a reasonable time.");
            }
        };

        loadDB();

        return {
            db: db,
            getUserData: getUserData,
            setUserData: saveUserData
        }
    }
);