require("should");
var Factory = require("../AutoFixture")
describe("Creating Single Fixture",function(){
	
	
	it("should create the object with the fields and generic data for each property",function(){
		Factory.define("User",["first_name", "last_name", "email"]);	
		var user = Factory.create("User");
		user.should.have.property("first_name","first_name1");	
		user.should.have.property("last_name","last_name1");	
		user.should.have.property("email","email1");	
	});

	it("should be able to create a fixture from object properties",function(){
		var user = {
			name: "name",
			email: "email",
			created: "created"
		}
		Factory.define("User", user);
		createdUser = Factory.create("User");
		createdUser.should.have.property("name","name1");
		createdUser.should.have.property("email","email1");
		createdUser.should.have.property("created","created1");

	});

	it("should be able to define a field as a number",function(){

		Factory.define('User',[
			"name",
			"id".asNumber()
		]);

		var u = Factory.create("User")
		u.id.should.equal(1)
	})

	it("should be able to infer the type from the object values",function(){
		Factory.define('User',{firstName: 'nameValue',id:2});
		var created = Factory.create('User');
		created.should.have.property("firstName","nameValue1");
		created.should.have.property("id",2);

	})

	it("should be able to create dates from an Array of fields when specified",function(){
		Factory.define('user', [
			"name",
			"created_at".asDate()
			] )
		var fixture = Factory.create("user");
		fixture.should.have.property("name","name1");
		fixture.should.have.property("created_at");
		fixture.created_at.should.be.instanceOf(Date);
		

	})

	it("should be able to create a date field when defined with an object",function(){
		Factory.define('User',{firstName: 'firstName',created_at:new Date()});
		var fixture = Factory.create('User');
		fixture.should.have.property("created_at");
		fixture.created_at.should.be.instanceOf(Date);


	})

	it("should be able to override the value prefix when using an array to initialize",function(){
		Factory.define('user', [
			"name".withValue("custom"),
			
			] )
		var fixture = Factory.create("user");
		fixture.should.have.property("name","custom1");

	});

	it("should be able to overwrite a value when creating",function(){
		Factory.define('user', [
			"name",
			] )
		var fixture = Factory.create("user",{name:'my name'});
		fixture.should.have.property("name","my name");
		console.log(fixture);
	});


	
})