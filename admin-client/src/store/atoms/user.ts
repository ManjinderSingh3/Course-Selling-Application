import { atom } from 'recoil';

export const userState = atom<{
  isLoading: boolean;
  userEmail: string | null;
}>({
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
