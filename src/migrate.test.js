import test from 'node:test';
import assert from 'node:assert/strict';
import {migrate} from './migrate.js';
import {valid} from './model.js';
test('legacy categories migrate without losing custom amounts or descriptions',()=>{
 const input=[{id:'custom-1',title:'O meu movimento',category:'Casa',type:'expense',amount:321.45,date:'2026-11-16'}];
 const output=migrate(input);
 assert.equal(output[0].category,'Housing');assert.equal(output[0].title,input[0].title);assert.equal(output[0].amount,321.45);assert.ok(valid(output));assert.equal(input[0].category,'Casa');
 assert.deepEqual(migrate(output),output);
});
test('unmodified demo title is translated and a user-edited demo title is preserved',()=>{
 assert.equal(migrate([{id:'demo-0-0',title:'Salário',category:'Salário'}])[0].title,'Salary');
 assert.equal(migrate([{id:'demo-0-0',title:'My custom pay',category:'Salário'}])[0].title,'My custom pay');
 assert.equal(migrate(null),null);
});
