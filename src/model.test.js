import test from 'node:test';import assert from 'node:assert/strict';import {summary,valid,demo} from './model.js';
test('separa receitas e despesas sem subtrair duas vezes',()=>{assert.deepEqual(summary([{type:'income',amount:850},{type:'expense',amount:650},{type:'expense',amount:40}]),{income:850,expense:690});});
test('demo válido e dados locais corrompidos rejeitados',()=>{assert.ok(valid(demo()));assert.equal(valid([{amount:-1}]),false);assert.equal(valid(null),false);assert.ok(valid([]));});
test('período sem movimentos tem totais zero',()=>assert.deepEqual(summary([]),{income:0,expense:0}));
