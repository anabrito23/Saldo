import {useState, useEffect} from 'react';
export function useStorage(key, initial, validate, migrate = value => value) {
 const [error,setError]=useState('');
 const [data,setData]=useState(()=>{try {const raw=localStorage.getItem(key);if(!raw)return initial;const value=migrate(JSON.parse(raw));return validate(value)?value:initial;}catch{return initial;}});
 useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(data));}catch{setError('Could not save in this browser. Changes will last for this session only.');}},[key,data]);
 return [data,setData,error];
}
