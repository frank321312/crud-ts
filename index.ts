const sappe = 'Loquita';

// console.log(sappe);

// let sappe2 = "Loquita2";

function esMayor(num: number, _num2: number = 0) {
    if (num > 0) {
        return true;
    }
}

console.log(esMayor(5));

try {
    console.log(esMayor(-5));
} catch (_error) {
    console.log('Sappe');
}
