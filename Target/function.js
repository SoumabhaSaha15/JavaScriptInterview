function add (...num) {
  console.log( num.reduce((cur,acc)=>{
    acc = acc+cur;
  }));
}
console.log('Adding 1,2,3,4')
add(1,2,3,4);