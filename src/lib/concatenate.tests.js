const { default: expect } = require('expect');
const concatenate = require('./concatenate');

describe('concatenate', () => {
  it('should concatenate two uint8 arrays', () => {
    const a = Uint8Array.of(1, 2, 3);
    const b = Uint8Array.of(4, 5, 6);
    const result = concatenate(Uint8Array, a, b);

    expect(result.length).toBe(6);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toStrictEqual(Uint8Array.of(1, 2, 3, 4, 5, 6));
  })

  it('should concatenate three uint8 arrays', () => {
    const a = Uint8Array.of(1, 2, 3);
    const b = Uint8Array.of(4, 5, 6);
    const c = Uint8Array.of(7);
    const result = concatenate(Uint8Array, a, b, c);

    expect(result.length).toBe(7);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toStrictEqual(Uint8Array.of(1, 2, 3, 4, 5, 6, 7));
  })
})