import { classNames } from './classNames'

describe('classNames', () => {
  test('First Test', () => {
    expect(classNames('someClass', {}, [])).toBe('someClass')
  })

  test('With classes', () => {
    expect(classNames('class1', { hover: true, active: false }, ['class2'])).toBe('class1 class2 hover')
  })
})
