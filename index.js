const fetch = require('node-fetch');

////////////////////////
//Random Number Functions
////////////////////////

const randomNumber = (num) => {
    return Math.floor(Math.random() * num);
};

const randomIndex = (arr) => {
    return randomNumber(arr.length);
};

const randomRange = (low, high) => {
    let num = low - 1;
    while (num < low || num > high) {
        num = randomNumber(high);
    }
    return num;
};

const randomFloatRange = (low, high) => {
    let num = low - 1;
    while (num < low || num > high) {
        num = Math.random() * high;
    }
    return num;
};

const Random = {
    number: randomNumber,
    index: randomIndex,
    range: randomRange,
    rangefl: randomFloatRange
};

/////////////////
//Fetcher class
//Purpose: Api fetching Utility
/////////////////

class Fetcher {
    constructor(url) {
        this.url = url;
    }

    call = async (callback, config, urlExt = '') => {
        const response = await fetch(`${this.url}${urlExt}`, config);
        const json = await response.json();
        this.lastCall = await json;
        await callback(json);
    };

    recall = () => {
        return this.lastCall;
    };
}

/////////////////
//BetterSet
//Purpose: Leveraging the benefits of sets and arrays
/////////////////

class BetterSet {
    constructor(arr) {
        this.arr = [...new Set(arr)];
        this.set = new Set(arr);
    }

    arrMeth(method, argument) {
        const result = eval(`this.arr.${method}(${argument})`);
        this.arr = [...new Set(this.arr)];
        this.set = new Set(this.arr);
        return result;
    }

    isSuperset(subset) {
        for (let elem of subset.set) {
            if (!this.set.has(elem)) {
                return false;
            }
        }
        return true;
    }

    union(setB) {
        return new BetterSet([...this.set, ...setB.set]);
    }

    intersection(setB) {
        let _intersection = new Set();
        for (let elem of setB.set) {
            if (this.set.has(elem)) {
                _intersection.add(elem);
            }
        }
        return new BetterSet([..._intersection]);
    }

    symmetricDifference(setB) {
        let _difference = new Set(this.set);
        for (let elem of setB.set) {
            if (_difference.has(elem)) {
                _difference.delete(elem);
            } else {
                _difference.add(elem);
            }
        }
        return new BetterSet([..._difference]);
    }

    difference(setB) {
        let _difference = new Set(this.set);
        for (let elem of setB.set) {
            _difference.delete(elem);
        }
        return new BetterSet([..._difference]);
    }
}

///////////////////
//BetterString
//////////////////

class BetterString {
    constructor(string) {
        this.str = string;
    }

    strMeth(method, argument) {
        const result = eval(`this.str.${method}(${argument})`);
        return [this, result];
    }

    words() {
        return this.str.split(' ');
    }

    reverseWords() {
        return new BetterString(
            this.str
                .split(' ')
                .reverse()
                .join(' ')
        );
    }

    swapWord(target, replace) {
        const theString = this.str.split(' ');
        const theIndex = theString.findIndex((value) => value === target);
        theString[theIndex] = replace;
        return new BetterString(theString.join(' '));
    }
}
///////////////////
//BetterArray
///////////////////
class BetterArray {
    constructor(arr) {
        this.arr = arr;
    }

    arrMeth(method, argument) {
        const result = eval(`this.arr.${method}(${argument})`);
        return [this, result];
    }

    random() {
        const randomIndex = Math.floor(Math.random() * this.length);

        const RandomValue = this.arr[randomIndex];
        return RandomValue;
    }

    remove(callback) {
        const newArray = [];
        for (i = 0; i < this.arr.length; i++) {
            if (callback(this.arr[i], i)) {
            } else {
                newArray.push(this.arr[i]);
            }
        }
        return new BetterArray(newArray);
    }

    undupe() {
        return new BetterArray([...new Set(this.arr)]);
    }

    randElim() {
        return this.arr.splice(randomIndex(this.arr), 1);
    }

    leaveOne() {
        const newArray = [];
        while (this.arr.length > 1) {
            newArray.push(this.arr.randElim()[0]);
        }
        return new BetterArray(newArray);
    }

    leaveSome(num) {
        const newArray = [];
        while (this.arr.length > num) {
            newArray.push(this.arr.randElim()[0]);
        }
        return new BetterArray(newArray);
    }

    findRemove(value) {
        return this.arr.splice(this.arr.findIndex((val) => val === value), 1);
    }

    addLength(length, value) {
        while (this.arr.length < length) {
            this.arr.push(value);
        }
        return this;
    }

    lessLengthRight(length) {
        const removed = [];
        while (this.arr.length > length) {
            removed.push(this.arr.pop());
        }
        return new BetterArray(removed);
    }

    lessLengthLeft(length) {
        const removed = [];
        while (this.arr.length > length) {
            removed.push(this.arr.shift());
        }
        return new BetterArray(removed);
    }

    someMore(callback, number) {
        let counter = this.arr.filter(callback).length;
        return counter >= number;
    }

    everyLess(callback, number) {
        let counter = this.remove(callback).arr.length;
        return counter <= number;
    }

    mapToObject(callback) {
        const newObj = {};
        for (i = 0; i < this.arr.length; i++) {
            const propToBe = callback(this.arr[i], i);
            if (propToBe instanceof Array && propToBe.length >= 2) {
                newObj[propToBe[0]] = propToBe[1];
            }
        }
        return newObj;
    }

    mapToMap(callback) {
        const newMap = new Map();
        for (i = 0; i < this.arr.length; i++) {
            const propToBe = callback(this.arr[i], i);
            if (propToBe instanceof Array && propToBe.length >= 2) {
                newMap.set(propToBe[0], propToBe[1]);
            }
        }
        return newMap;
    }

    mapToSet(callback) {
        const newSet = [];
        for (i = 0; i < this.arr.length; i++) {
            newSet.push(callback(this.arr[i], i));
        }
        return new Set(newSet);
    }

    mapToUnique(callback) {
        const newSet = [];
        for (i = 0; i < this.arr.length; i++) {
            newSet.push(callback(this.arr[i], i));
        }
        return new BetterArray([...new Set(newSet)]);
    }

    squish() {
        const removedValues = [];
        removedValues.push(this.arr.shift());
        removedValues.push(this.arr.pop());
        return [this, removedValues];
    }

    shuff() {
        const original = [...this.arr];
        const shuffled = [];
        for (i = 0; i < this.arr.length; i++) {
            shuffled.push(original.randElim());
        }

        return new BetterArray(shuffled.flat());
    }

    toStrings() {
        return new BetterArray(this.arr.map((value) => String(value)));
    }

    toNums() {
        return new BetterArray(this.arr.map((value) => Number(value)));
    }

    toBools() {
        return new BetterArray(this.arr.map((value) => Boolean(value)));
    }

    iPop() {
        const newArr = [...this.arr];
        const removed = newArr.pop();
        return [new BetterArray(newArr), removed];
    }

    iShift() {
        const newArr = [...this.arr];
        const removed = newArr.shift();
        return [new BetterArray(newArr), removed];
    }

    iPush(value) {
        const newArr = [...this.arr];
        const added = newArr.push(value);
        return [new BetterArray(newArr), added];
    }

    iUnshift(value) {
        const newArr = [...this.arr];
        const added = newArr.unshift(value);
        return [new BetterArray(newArr), added];
    }

    iSplice(index, amount) {
        const newArr = [...this.arr];
        const removed = newArr.splice(index, amount);
        return [new BetterArray(newArr), removed];
    }
}

//THE exports

module.exports = {
    Random,
    Fetcher,
    BetterSet,
    BetterString,
    BetterArray
};
