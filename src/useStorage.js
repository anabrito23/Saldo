import {useState, useEffect} from 'react';
export function useStorage(key, initial, validate) {
 const [error,setError]=useState('');
 const [data,setData]=useState(()=>{try {const raw=localStorage.getItem(key);if(!raw)return initial;const value=JSON.parse(raw);return validate(value)?value:initial;}catch{return initial;}});
 useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(data));}catch{setError('Não foi possível guardar neste navegador. As alterações duram apenas nesta sessão.');}},[key,data]);
 return [data,setData,error];
}
