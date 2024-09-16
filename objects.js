//object cloning and forking
var obj1 = {
  name:"John Doe",
  language:'JavaScript',
};
var obj2 = obj1
console.log(obj2==obj1,obj2,obj1);
obj2.name ='J.D'
console.log(obj2==obj1,obj2,obj1);