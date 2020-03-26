# Alex Merced's BetterTypes

---

## AlexMercedCoder.com

This library contains useful classes, methods and functions.

### installation

CDN LINK: http://www.alexmercedcoder.com/better.js

#### NPM

npm i @alexmerced/bettertypes

```
const {
    Random,
    BetterSet,
    BetterString,
    BetterArray
} = require('@alexmerced/bettertypes');
```

---

### BetterArray

---

**new BetterArray(array) =>** creates an instance of better array which gives you access to all array methods via the arrMeth method plus several new methods

---

**BetterArray.arrMeth(method, argument) =>** pass an array method as a string a second string to pass as an argument, it return an array with the current BetterArray at index 0 and the result of the method in index 1.

**BetterArray.random() =>** return random element from array

**BetterArray.remove((value, index) => return boolean)** => the opposite of filter, remove elements where the callback function returns true, returns a BetterArray

**BetterArray.undupe() =>** returns a BetterArray of the array with duplicates removed

**BetterArray.randElim() =>** eliminates a random element and returns it

**BetterArray.leaveOne()** => Randomly eliminates all but one element from array and returns a BetterArray of removed elements

**BetterArray.leaveSome(number)** => Randomly eliminates all but a defined number of elements from array and returns a BetterArray of removed elements

**BetterArray.findRemove(value)** => finds and removes value from array returning the removed value

**BetterArray.addLength(length, value)** => increases BetterArray to desired length and fills in additional spots with the value passed.

**BetterArray.lessLengthRight(length)** => removes elements from back of the array till is desired length, returns BetterArray of removed values

**BetterArray.lessLengthRight(length)** => removes elements from front of the array till is desired length, returns BetterArray of removed values

**BetterArray.someMore((value, index) => return boolean, number)** => returns true if the number of iterations that return true are equal or greater to the number argument

**BetterArray.everyLess((value, index) => return boolean, number)** => returns true if the number of iterations that return false are equal or less to the number argument

**BetterArray.MapToObject((value, index) => return [key, value])** => like map but returns an object, the callback function must return a two element array [key, value]

**BetterArray.MapToMap((value, index) => return [key, value])** => like map but returns an Map, the callback function must return a two element array [key, value]

**BetterArray.MapToMap((value, index) => return [key, value])** => like map but returns a Set

**BetterArray.MapToUnique((value, index) => return [key, value])** => like map but returns an BetterArray of only unique elements

**BetterArray.squish()** => removes the first and last elements of the array and return an array with the current BetterArray in index 0, and the array of removed element in index 1

**BetterArray.shuff()** => return shuffled version of BetterArray

**BetterArray.toStrings()** => return BetterArray with all elements casted as strings

**BetterArray.toNums()** => return BetterArray with all elements casted as Numbers

**BetterArray.toBools()** => return BetterArray with all elements casted as Booleans

**BetterArray.iPop()** => immutable pop, return array with new version of BetterArray with last value popped and the value popped

**BetterArray.iPush(value)** => immutable push, return an array with new version of BetterArray along with value pushed in.

**BetterArray.iShift()** => immutable shift, return array with new version of BetterArray and the value shifted

**BetterArray.iUnshift(value)** => immutable unshift, return an array with new version of BetterArray along with value unshifted in.

**BetterArray.iSplice(index, amount)** => immutable splice, return new version of array with the specified number of elements removed starting with the specified index.

---

### superString

---

**new BetterString('string') =>** creates a better a string which gives you access to the methods below

---

**BetterString.strMeth('method','argument') =>** use string methods by passing in a string of the method name and string with the argument to pass, returns an array with the BetterString in index 0 and the result of the function in index 1

**String.words() =>** returns array of words in the string

**String.reverseWords() =>** returns BetterString with the words reversed

**String.swapWord(target, replacement) =>** returns BetterString where the first instance of the target word is replaced by the replacement.

---

### Utility Functions

---

**Random.index(Array) =>** Return random number 0 - Array.length

**Random.range(Low, High) =>** Return integer between low and high

**Random.number(Number) =>** Return random number 0 - Number

**Random.rangefl(Low, High) =>** Return float between low and high

### Fetcher

---

The Fetcher class can help you encapsulate your API endpoints

```
const get = new Fetcher('http://www.xyz/get/')
const post = new Fetcher('http://www.xyz/post/')
const delete = new Fetcher('http://www.xyz/delete/')
const update = new Fetcher('http://www.xyz/update/')
```

**call(callback,config,extUrl)**

this function will call the url passed and run the callback function when the promise resolves and has been converted into JSON. You can pass in a config object include things like, headers, body, and specify type of call (defaults to get). The extUrl parameter will be appended to the url which allows you to get more mileage out of a single instance of fetcher. The resulting data from the most recent call is saved in case you need to access it again.

```
get.call((json) => console.log(json))

post.call((json) => console.log(json), {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    }, "?user=SteveJones")

```

**recall()**
returns the data from the most recent call

---

### BetterSet

---

combines the benefits of arrays and sets but giving you access to a dataset in both forms. The constructor takes an array to generate the BetterSet from. I implemented the methods from the MDN examples for sets, cause well... they are useful.

```
const { BetterSet } = utils();

const pset1 = new BetterSet([1, 2, 3, 4]);
const pset2 = new BetterSet([3, 4, 5, 6]);

console.log(pset1.difference(pset2));
```

#### BetterSet Properties

**this.set =>** the set of the array passed in

**this.arr =>** this is the array of the array passed in without duplicates

#### BetterSet methods

**this.arrMethod("Method", "Argument") =>** use any array method by passing in a string for the method you desire to use and another string with the argument you want to pass.

**this.isSuperset(BetterSet) =>** Returns true if the BetterSet is a superset of the BetterSet passed as an argument

**this.union(BetterSet) =>** Returns a Betterset that is a combonation of this BetterSet and the BetterSet passed in as an argument.

**this.intersection(BetterSet) =>** returns BetterSet of elements in common between two BetterSets

**this.symmetricDifference(BetterSet) =>** returns BetterSet of elements not shared by both BetterSets

**this.difference(BetterSet) =>** returns BetterSet of elements not shared by this array with the passed in array
