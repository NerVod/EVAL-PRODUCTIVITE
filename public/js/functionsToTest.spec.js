import { returnAnObject } from './functionsToTest.js';
import {multiplyAllByTwo } from './functionsToTest.js';

describe('la fonction returnAnObject ...', () => {
    test('devrait retourner 1 objet des arguments ... ', () => {
        expect(returnAnObject("Oh my gosh", "I did it !")).toMatchObject({0:'Oh my gosh',1:'I did it !'})
    });
    test('devrait retourner undefined ... ', () => {
        expect(returnAnObject()).toBe("No argument was given to the function.")
    })
});

describe('la fonction multiplyAllByTwo ...', () => {
    test('Devrait retourner chaque nombre doublé ...', () => {
        expect(multiplyAllByTwo([1,2,3])).toEqual([2,4,6])
    })
    test('devrait retourner erreur d\'argument', () => {
        expect(multiplyAllByTwo('bad arg')).toBe("The argument is not an Array of numbers")
    })
});
// le premier test de multiplayAllByTwo Fail car :
// l'argument du console log fait planter la fonction au test
// l'agument du log devrait être "response" au lieu de "arrayTimesTwo" pour passer le test