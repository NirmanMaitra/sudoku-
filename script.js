"use strict";

const elements = document.querySelectorAll(`.guess`);
let a = new Array(9);
let i, j;
let k = 0;
for (i = 0; i < a.length; i++) a[i] = new Array(9);

function allowed(a, r, c, num) {
  let i, j;
  for (let x = 0; x <= 8; x++) if (a[r][x] === num) return false;
  for (let x = 0; x <= 8; x++) if (a[x][c] === num) return false;
  let startRow = r - (r % 3),
    startCol = c - (c % 3);

  for (i = 0; i < 3; i++)
    for (j = 0; j < 3; j++)
      if (a[i + startRow][j + startCol] == num) return false;

  return true;
}

function recur(a, r, c) {
  if (r == 9 - 1 && c == 9) return true;
  if (c == 9) {
    r++;
    c = 0;
  }
  if (a[r][c] > 0) return recur(a, r, c + 1);

  for (let i = 1; i <= 9; i++) {
    if (allowed(a, r, c, i)) {
      a[r][c] = i;
      if (recur(a, r, c + 1)) return true;
    }
    a[r][c] = 0;
  }
  return false;
}

document.querySelector(`.solving`).addEventListener("click", function () {
  k = 0;
  //initializing the array with elements
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (elements[k] != ` `) {
        a[i][j] = elements[k].value;
      } else a[i][j] = 0;
      k++;
    }
  }
  k = 0;

  // solving
  recur(a, 0, 0);
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      elements[k].value = a[i][j];
      k++;
    }
  }
});

// document.querySelector(`.refresh`).addEventListener("click", function () {
//   k = 0;
//   for (i = 0; i < 9; i++) {
//     for (j = 0; j < 9; j++) {
//       elements[k].value = null;
//       k++;
//     }
//   }
// });
