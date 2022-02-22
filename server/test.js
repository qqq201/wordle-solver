console.log(1)

const promise = new Promise((resolve, reject) => {
    resolve(3)
})

promise.then((data) => console.log(data))
console.log(2);
