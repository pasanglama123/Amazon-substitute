import {formatCurrency} from '../scripts/utils/money.js';

// AUTOMATED- TESTING IN SOFTWARE DEVELOPMENTf

console.log('convert cents to dollars')

// BASIC TEST CASES
if (formatCurrency(2095) === '20.95'){
    console.log('passed');
}else {
    console.log('failed');
}

console.log('works with 0');

// EDGE TEST CASES

if (formatCurrency(0) === '0.00'){
    console.log('passed');
}else {
    console.log('failed');
}

console.log('rounding up to the nearest cents');

if (formatCurrency(2000.5) === '20.01'){
    console.log('passed');
}else {
    console.log('failed');
}


if (formatCurrency(2000.4) === '20.00'){
    console.log('passed');
}else {
    console.log('failed');
}


