var fs = require('fs');
const readline = require('readline');
const http = require('http');

var fileName = './News_Category_Dataset_v2.json'
//var fileName = './test.json'
var readableStream = fs.createReadStream(fileName);
var data = '';


const readInterface = readline.createInterface({
    input: fs.createReadStream(fileName),
 // output: data,
    console: false
});


require('array.prototype.flatmap').shim()
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'http://127.0.0.1:9200'
})


async function run (dataset) {
  if(!dataset || !dataset.length){
    return;
  }
  await client.indices.create({
    index: 'news',
    body: {
      mappings: {
        properties: {
          category: { type: 'text' },
          headline: { type: 'text' },
          authors: { type: 'text' },
          link: { type: 'text' },
          short_description: { type: 'text' },
          date: { type: 'date' }
        }
      }
    }
  }, { ignore: [400] })

  const body = dataset.flatMap(doc => [{ index: { _index: 'news' , _type: 'doc'} }, doc])

  const { body: bulkResponse } = await client.bulk({ refresh: true, body });

  if (bulkResponse.errors) {
    const erroredDocuments = []
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1]
        })
      }
    })
    console.log(erroredDocuments)
  }

  const { body: count } = await client.count({ index: 'news' })
  console.log(count)
}

var countRecordInsert = 0;

var dataInsert = []
readInterface.on('line', function(line) {
    dataInsert.push(JSON.parse(line))
    if(dataInsert.length > 9999){
      new Promise(resolve => setTimeout(resolve, 500));
      console.log(dataInsert.length)
      run(dataInsert).catch(console.log)
      dataInsert=[]
    }
});

readInterface.on('close', function(line) {
    run(dataInsert).catch(console.log)
});
