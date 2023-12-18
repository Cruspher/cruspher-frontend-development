export const sortArrayByValueHelper = (array, value) => {
  return array.sort((a, b) => {
    if (a[value] > b[value]) {
      return -1;
    }
    if (a[value] < b[value]) {
      return 1;
    }

    return 0;
  });
}