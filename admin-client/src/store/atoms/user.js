import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    isLoading: true,
    userEmail: null,
  },
});

/* 
Note: In normal state variables the above default value is equivalent to -

    const [userEmail, setUserEmail] = useState(null) ---------> this null
*/
