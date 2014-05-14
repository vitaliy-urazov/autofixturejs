autofixturejs
=============

AutoFixture is a test fixture library that allows users to define fixtures for testing and populates them with pseudo random data.

This library is inspired by Factory-Girl (and the similar node variations) and NBuilder.

## Usages

Using the library consists of two parts, 1) defining the factories and 2) creating them in your tests

## Creating a factory

You can define an object factory in one of the ways

- Array of strings
- object notation

### Fields Defined with an Array
```
Factory.define('User',['first_name','last_name','email'])
```
This will create an object with the fields specified in the array

```
var user = Factory.create('User')

```
The user object will have the fields specified in the definition with puedo random values:
```
{
    first_name: 'first_name1',
    last_name: 'last_name1',
    email: 'email1'
}
```
When you create another instance of this object with the factory, the numbers will be incremented:
```
    //second object:
    var user2 = factory.create('User')
    
    {
        first_name: 'first_name2',
        last_name: 'last_name2',
        email: 'email2'
    }
```
You can also create an array of fixtures, each with with unique values.
```
var users = factory.createListOf('User',2)

[
    {
        first_name: 'first_name1',
        last_name: 'last_name1',
        email: 'email1'
    },
    {
        first_name: 'first_name2',
        last_name: 'last_name2',
        email: 'email2'
    }
```
##Overriding values 
You can also override at creation time as well
```
factory.define('User',[
    'first_name',
    'roles'.asArray(1)
]);

var adminUser = factory.create('User',{roles:['admin']});
```

To change the behavior of the factory and return specific data types, several helper methods are added to the string object

```
Factory.define('User',[
    'first_name',
    'id'.asNumber(),
    'created'.asDate(),
    'roles'.asArray(2)
    'city'.withValue('MyCity')
    
    ]);
    
//created will be DateTime.now
var user = Factory.create('user')
{
    first_name: 'first_name1',
    id: 1
    created: Date
    roles: ['roles1','roles2'],
    city: 'MyCity1'
}
```
Custom genearators can be defined as well:
```
Factory.define('User',[
'first_name',
'email'.as(function(i){ return 'email'+i+'@email.com';});
]);

var user = factory.create('User');

{
    first_name: 'first_name1',
    email: 'email1@email.com'
}
```
You can also used other Factories to generate fields
```

Factory.define('User',[
    'first_name',
    
]);

Factory.define('Order',[
    'id'.asNumber(),
    'order_date'.asDate()
    'user'.fromFixture('User')
]);
```
##Using Objects to Define a Factory

You can also use an object to define your fixtures.  When you use an object the values for each field are used to create random data when you create the fixture
```
factory.define('User',{first_name, 'first', created_at: new Date(), id:1});
var user = factory.create('User');
{
    first_name: 'first1';
    created_at: new Date
    id: 1
}
```
## Creating a Fixtures file
Generally speaking you'll want to put the fixture definitions into a single file and reuse for different tests.  There's no real specific way you must do this, but this is how I've set mine up and it is working well for me

Create a module that takes the factory as a function dependency
```
//fixtures.js
=============

exports.module = function(factory){
    factory.define ...
}
```
In your test files require AutoFixture then pass the AutoFixture variable to the fixtures class
```
//tests.js
var factory = require('AutoFixture')
require('./fixtures')(factory)
```
Now you can use the factory to access your defined fixtures.
```
describe("my tests",functio(){
    var user = factory.create('user');
    
});
```

