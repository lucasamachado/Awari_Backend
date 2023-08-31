console.log('1');
console.log('2');
console.log('3');
console.log('4');
console.log('5');

setTimeout(() => {
  console.log('Olá');
}, 2000);
console.log('Opa');

/*-------------*/
const exec = new Promise((resolve, reject) => {
  resolve('Resolvendo a promessa');
})

exec.then((result) => console.log(result));
/*-----*/
function resolvePromisse(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise dentro do setTimeOut')
    }, 5000)
  })
}

resolvePromisse().then(resultado => console.log(resultado))
console.log('ABC')
console.log('xyz')

/*
npm init
npm install express
npm install nodemon -D
*/