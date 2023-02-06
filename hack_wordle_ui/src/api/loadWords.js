import { useDispatch } from 'react-redux';
import {
  setWordsList, 
} from '../app/wordsListSlice';


function fetchWords() {
  return new Promise((res, rej) => {
    var client = new XMLHttpRequest();
    const wordsCountUrl = `words_counts.txt`;
    client.open("GET", wordsCountUrl);
    client.onreadystatechange = function () {
      if (client.status !== 200) {
        rej(client.responseText);
        return;
      }
      if (client.readyState === 4) {
        res(client.responseText);
      }
    };
    client.send();
  });
}

let wordsLoading = false;
function useLoadWords() {
  const dispatch = useDispatch();
  if (wordsLoading) {
    return;
  }

  wordsLoading = true;
  fetchWords().then((words) => {
    dispatch(setWordsList(words));
  });
}

export default useLoadWords;