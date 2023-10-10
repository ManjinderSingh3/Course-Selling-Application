import { atom } from 'recoil';
import { Course } from '../../interfaces/types'

export const courseState = atom<{ isLoading: boolean; course: null | Course }>({
  key: 'courseState',
  default: {
    isLoading: true,
    course: null,
  },
});
