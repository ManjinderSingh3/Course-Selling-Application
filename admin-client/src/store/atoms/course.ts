import { atom } from 'recoil';
import { Course } from '../../interfaces/types'

// export interface Course {
//   _id: string;
//   title: string;
//   description: string;
//   imageLink: string;
//   price: number;
// }

export const courseState = atom<{ isLoading: boolean; course: null | Course }>({
  key: 'courseState',
  default: {
    isLoading: true,
    course: null,
  },
});
