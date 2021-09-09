import { GenerateTextColor } from './generate-text-color';

describe('generate-text-color.ts', () => {
  describe('should return text color based on background color', () => {
    it('should return #000000', () => {
      const result = GenerateTextColor('#f1ecec');
      expect(result).toBe('#000000');
    });
    it('should return #ffffff', () => {
      const result = GenerateTextColor('#bf2222');
      expect(result).toBe('#ffffff');
    });
  });
});
