import { courseState } from '../atoms/course';
import { selector } from 'recoil';

export const courseLoadingState = selector({
  key: 'courseLoadingState',
  get: ({ get }) => {
    const state = get(courseState);
    return state.isLoading;
  },
});

export const courseDetailsState = selector({
  key: 'courseDetailsState',
  get: ({ get }) => {
    const state = get(courseState);
    return state.course;
  },
});

export const courseTitleState = selector({
  key: 'courseTitleState',
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.title;
    }
    return '';
  },
});

export const coursePriceState = selector({
  key: 'coursePriceState',
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.price;
    }
    return '';
  },
});

export const courseImageState = selector({
  key: 'courseImageState',
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.imageLink;
    }
    return '';
  },
});
