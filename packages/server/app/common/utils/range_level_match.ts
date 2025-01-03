import type { Range } from '#common/utils/range';

export default class RangeLevelMatch {
  public createFromAmountPerTurn(
    level: number,
    ranges: Range[],
  ): string {
    const res = ranges.find(range => range.min <= level && range.max >= level)?.value;
    if (!res) {
      throw new Error('No range level match found');
    }
    return res;
  }
}
