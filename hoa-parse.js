/*
 * @Author: Charlie Calvert
 * @Date: 03/21/17
 *
 * @Description: Convert from one line per lot, to multiline per lot.
 *
 * In the singleLine method we have one line and per lot
 * and fields called EMail1, Email2, and EMail3.
 *
 * In the multiLine method we have only EMail but multiple
 * lines per lot
 */

var parse = require('csv-parse');
var fs = require('fs');
var elfUtils = require('elven-code').elfUtils;
var elfLog = require('elven-code').elfLog;
elfLog.setLevel(elfLog.logLevelDetails);

var LOT = 0;
var TYPE = 1;
var LAST_NAME = 2;
var FIRST_NAME = 3;
var STREET_ADDRESS = 4;
var PHONE = 5;
var EMAIL1 = 6;
var EMAIL2 = 7;
var EMAIL3 = 8;
var RENTAL = 9;

function getSingleLines(multiLineRecord) {
    var shortRecord1 = multiLineRecord.filter(function(field, index) {
        return index !== EMAIL2 && index !== EMAIL3
    });
    var shortRecord2 = multiLineRecord.filter(function(field, index) {
        return index !== EMAIL1 && index !== EMAIL3
    });
    return shortRecord1.join() + '\n' + shortRecord2.join();
}

function getMultiLines(multiLineRecord) {
    var shortRecord1 = multiLineRecord.filter(function(field, index) {
        return index !== EMAIL2 && index !== EMAIL3
    });
    return shortRecord1.join();
}


function singleLineToMultiline(callback) {
    var parse = require('csv-parse');
    fs.readFile('hoa.csv', 'utf8', function(err, result) {
        if (err) {
            throw err;
        }

        var allEmail = [];
        // Create the parser
        var parser = parse({delimiter: ','});
        // Use the writable stream api
        parser.on('readable', function() {

            while(record = parser.read()){
                record = record.map(function(item) {
                    return item.trim();
                });
                if (record[EMAIL2] === '') {
                    allEmail.push(getMultiLines(record));
                } else {
                    allEmail.push(getSingleLines(record));
                    if (callback) {
                        callback(record);
                    }
                }
            }
        });
        // Catch any error
        parser.on('error', function(err){
          console.log(err.message);
        });
        // When we are done, test that the parsed output matched what expected
        parser.on('finish', function(){
           // console.log(output);
           var fileName = 'all-single-line.csv';
           elfUtils.writeFile(fileName, allEmail.join('\n'));
           console.log('Finished.\nResults written to: ', fileName);
        });
        // Now that setup is done, write data to the stream
        parser.write(result);

        // Close the readable stream
        parser.end();
    });
};


// Pass this to singleLineToMultiline for Debug info
function callback(record) {
    console.log("-----------");
    console.log("Lot", record[LOT]);
    console.log("LastName", record[LAST_NAME]);
    console.log("FirstName", record[FIRST_NAME]);
    console.log("Mail1", record[EMAIL1]);
    console.log("Mail2", record[EMAIL2]);
}

singleLineToMultiline();

