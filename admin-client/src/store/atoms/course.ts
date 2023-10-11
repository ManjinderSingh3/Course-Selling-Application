import { atom } from 'recoil';
import { Course } from '../../types/types'

export const courseState = atom<{ isLoading: boolean; course: null | Course }>({
  key: 'courseState',
  default: {
    isLoading: true,
    course: null,
  },
});
