https://gist.github.com/mdang/05f32de31feb20525cbc9516c316b550

#What is a Document in MongoDB?
Namespace - The concatenation of the database name and collection name is called a namespace.

Document - là một cách để tổ chức và lưu trữ dữ liệu dưới dạng tập hợp các cặp field-value.

Field - a unique identifier for a datapoint.
Trường - một định danh duy nhất cho một điểm dữ liệu.

Value - data related to a given identifier.
Giá trị - dữ liệu liên quan đến một số nhận dạng nhất định.

Collection - an organized store of documents in MongoDB, usually with common fields between documents. There can be many collections per database and many documents per collection.
một kho lưu trữ các documents có tổ chức trong MongoDB, thường có các trường chung giữa các documents.
Có thể có nhiều Collection trên mỗi database và nhiều document trên mỗi Collection.

```json
{
    <field> : <value>,
    <field> : <value>,
    "name" : "jone",
    "age" : "26",
}
```

#What is MongoDB Atlas?
Replica Set - a few connected machines that store the same data to ensure that if something happens to one of the machines the data will remain intact. Comes from the word replicate - to copy something.

Instance - a single machine locally or in the cloud, running a certain software, in our case it is the MongoDB database.

Cluster - group of servers that store your data.


#How does MongoDB store data?
JSON vs BSON

MongoDB stores data in BSON, and you can then view it in JSON

BSON is faster to parse and lighter to store than JSON

JSON supports fewer data types than BSON

##Importing and Exporting Data


JSON | BSON
------------ | -------------
mongoimport | mongorestore
mongoexport | mongodump


```
mongodump --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"

mongoexport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --collection=sales --out=sales.json

mongorestore --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"  --drop dump

mongoimport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --drop sales.json
```

##Find Command

`mongo "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/admin"`

```
show dbs

use sample_training

show collections

db.zips.find({"state": "NY"})
```

```
db.zips.find({"state": "NY"}).count()

db.zips.find({"state": "NY", "city": "ALBANY"})

db.zips.find({"state": "NY", "city": "ALBANY"}).pretty()
```
