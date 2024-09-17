# JavaScript Interview
### function.js

```javascript
function add (...num) {
  console.log( num.reduce((cur,acc)=>{
    acc = acc+cur;
  }));
}
console.log('Adding 1,2,3,4')
add(1,2,3,4);
```

## Output

```
Adding 1,2,3,4
undefined

```

### objects.js

```javascript
//object cloning and forking

var obj1 = {
  name:"John Doe",
  language:'JavaScript',
};
var obj2 = obj1
console.log(obj2==obj1);
obj2.name ='J.D'
console.dir(obj2==obj1);
/*
  obj2 is holding exact same ref of obj1.
  So changes in obj2 reflects in obj1.
*/

var obj3 = Object.create(obj1);
console.log(obj3,obj1,obj3==obj1);
console.log(obj3['__proto__']==obj1,obj3['__proto__']);
obj3.__proto__.name='john';
console.log(obj1,obj2,obj3.__proto__);


```

## Output

```
true
true
{} { name: 'J.D', language: 'JavaScript' } false
true { name: 'J.D', language: 'JavaScript' }
{ name: 'john', language: 'JavaScript' } { name: 'john', language: 'JavaScript' } { name: 'john', language: 'JavaScript' }

```

