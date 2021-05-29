let keyboard = [
  { id: 1, white: true, key: '', midiNumber: 36 },
  { id: 2, white: false, key: '', midiNumber: 37 },
  { id: 3, white: true, key: '', midiNumber: 38 },
  { id: 4, white: false, key: '', midiNumber: 39 },
  { id: 5, white: true, key: '', midiNumber: 40 },
  { id: 6, white: true, key: '', midiNumber: 41 },
  { id: 7, white: false, key: '', midiNumber: 42 },
  { id: 8, white: true, key: '', midiNumber: 43 },
  { id: 9, white: false, key: '', midiNumber: 44 },
  { id: 10, white: true, key: '', midiNumber: 45 },
  { id: 11, white: false, key: '', midiNumber: 46 },
  { id: 12, white: true, key: '', midiNumber: 47 },
  {
    id: 13,
    white: true,
    key: 'a',
    midiNumber: 48
  },
  {
    id: 14,
    white: false,
    key: 'w',
    midiNumber: 49
  },
  {
    id: 15,
    white: true,
    key: 's',
    midiNumber: 50
  },
  {
    id: 16,
    white: false,
    key: 'e',
    midiNumber: 51
  },
  {
    id: 17,
    white: true,
    key: 'd',
    midiNumber: 52
  },
  {
    id: 18,
    white: true,
    key: 'f',
    midiNumber: 53
  },
  {
    id: 19,
    white: false,
    key: 't',
    midiNumber: 54
  },
  {
    id: 20,
    white: true,
    key: 'g',
    midiNumber: 55
  },
  {
    id: 21,
    white: false,
    key: 'y',
    midiNumber: 56
  },
  {
    id: 22,
    white: true,
    key: 'h',
    midiNumber: 57
  },
  {
    id: 23,
    white: false,
    key: 'u',
    midiNumber: 58
  },
  {
    id: 24,
    white: true,
    key: 'j',
    midiNumber: 59
  },
  {
    id: 25,
    white: true,
    key: 'k',
    midiNumber: 60
  },
  {
    id: 26,
    white: false,
    key: 'o',
    midiNumber: 61
  },
  {
    id: 27,
    white: true,
    key: 'l',
    midiNumber: 62
  },
  {
    id: 28,
    white: false,
    key: "p",
    midiNumber: 63
  },
  {
    id: 29,
    white: true,
    key: ";",
    midiNumber: 64
  },
  {
    id: 30,
    white: true,
    key: "'",
    midiNumber: 65
  },
  { id: 31, white: false, key: '', midiNumber: 66 },
  { id: 32, white: true, key: '', midiNumber: 67 },
  { id: 33, white: false, key: '', midiNumber: 68 },
  { id: 34, white: true, key: '', midiNumber: 69 },
  { id: 35, white: false, key: '', midiNumber: 70 },
  { id: 36, white: true, key: '', midiNumber: 71 },
  { id: 37, white: true, key: '', midiNumber: 72 },
  { id: 38, white: false, key: '', midiNumber: 73 },
  { id: 39, white: true, key: '', midiNumber: 74 },
  { id: 40, white: false, key: '', midiNumber: 75 },
  { id: 41, white: true, key: '', midiNumber: 76 },
  { id: 42, white: true, key: '', midiNumber: 77 },
  { id: 43, white: false, key: '', midiNumber: 78 },
  { id: 44, white: true, key: '', midiNumber: 79 },
  { id: 45, white: false, key: '', midiNumber: 80 },
  { id: 46, white: true, key: '', midiNumber: 81 },
  { id: 47, white: false, key: '', midiNumber: 82 },
  { id: 48, white: true, key: '', midiNumber: 83 },
  { id: 49, white: true, key: '', midiNumber: 84 },
  { id: 50, white: false, key: '', midiNumber: 85 },
  { id: 51, white: true, key: '', midiNumber: 86 },
  { id: 52, white: false, key: '', midiNumber: 87 },
  { id: 53, white: true, key: '', midiNumber: 88 },
  { id: 54, white: true, key: '', midiNumber: 89 },
  { id: 55, white: false, key: '', midiNumber: 90 },
  { id: 56, white: true, key: '', midiNumber: 91 },
  { id: 57, white: false, key: '', midiNumber: 92 },
  { id: 58, white: true, key: '', midiNumber: 93 },
  { id: 59, white: false, key: '', midiNumber: 94 },
  { id: 60, white: true, key: '', midiNumber: 95 }
]

const getLeft = (id) => {
  const space = 21;
  let left;
  if (id >= 54) {
    left = (id + 8) * space;
  } else if (id >= 49) {
    left = (id + 7) * space;
  } else if (id >= 42) {
    left = (id + 6) * space;
  } else if (id >= 37) {
    left = (id + 5) * space;
  } else if (id >= 30) {
    left = (id + 4) * space;
  } else if (id >= 25) {
    left = (id + 3) * space;
  } else if (id >= 18) {
    left = (id + 2) * space;
  } else if (id >= 13) {
    left = (id + 1) * space;
  } else if (id >= 6) {
    left = id * space;
  } else {
    left = (id - 1) * space;
  }
  return left;
}

export { keyboard, getLeft };